/**
 * Framework-agnostic Markdown core: a block/inline tokenizer plus an HTML-string
 * serializer. Pure JS (no JSX), so it runs both in the browser bundle and in the
 * Node prerender script. The React renderer (markdown.jsx) consumes the same
 * tokenizer, so client and prerendered output can never drift.
 *
 * Supported: h2/h3, paragraphs, bold/italic/inline-code/links, blockquotes,
 * ordered/unordered lists, fenced code blocks, standalone images (+caption), hr.
 */

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[`*_[\]()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Pull the h2 headings out of raw markdown for a table of contents. */
export function extractHeadings(md) {
  const headings = [];
  String(md)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .forEach((line) => {
      const m = line.match(/^##\s+(.*)$/);
      if (m) {
        const text = m[1].replace(/[`*_]/g, '').trim();
        headings.push({ id: slugify(m[1]), text });
      }
    });
  return headings;
}

const BLOCK_START = /^(#{2,3}\s|```|>\s?|[-*]\s|\d+\.\s|---+\s*$|!\[)/;

/** Inline tokens: {type:'text'|'code'|'strong'|'em'|'link', value, href?, external?} */
export function tokenizeInline(text) {
  const tokens = [];
  const regex =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*|_[^_]+_)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) tokens.push({ type: 'text', value: text.slice(last, m.index) });
    const tok = m[0];
    if (m[1]) {
      tokens.push({ type: 'code', value: tok.slice(1, -1) });
    } else if (m[2]) {
      tokens.push({ type: 'strong', value: tok.slice(2, -2) });
    } else if (m[3]) {
      tokens.push({ type: 'em', value: tok.slice(1, -1) });
    } else if (m[4]) {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      tokens.push({
        type: 'link',
        value: lm[1],
        href: lm[2],
        external: /^https?:/.test(lm[2]),
      });
    }
    last = regex.lastIndex;
  }
  if (last < text.length) tokens.push({ type: 'text', value: text.slice(last) });
  return tokens;
}

/** Block tokens: {type, ...}. See serializers for the shape of each. */
export function tokenizeBlocks(md) {
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }

    if (/^```/.test(line)) {
      i++;
      const buf = [];
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: 'code', content: buf.join('\n') });
      continue;
    }

    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      blocks.push({ type: 'heading', level: h[1].length, text: h[2] });
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    const img = line
      .trim()
      .match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img) {
      blocks.push({ type: 'image', alt: img[1], src: img[2], caption: img[3] || '' });
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: buf.join(' ') });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !BLOCK_START.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'p', text: buf.join(' ') });
  }

  return blocks;
}

/* ---- HTML-string serializer (for the Node prerender) ---- */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

export function inlineToHtml(text) {
  return tokenizeInline(text)
    .map((t) => {
      switch (t.type) {
        case 'code':
          return `<code>${escapeHtml(t.value)}</code>`;
        case 'strong':
          return `<strong>${escapeHtml(t.value)}</strong>`;
        case 'em':
          return `<em>${escapeHtml(t.value)}</em>`;
        case 'link': {
          const rel = t.external ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${escapeAttr(t.href)}"${rel}>${escapeHtml(t.value)}</a>`;
        }
        default:
          return escapeHtml(t.value);
      }
    })
    .join('');
}

export function blocksToHtml(md) {
  return tokenizeBlocks(md)
    .map((b) => {
      switch (b.type) {
        case 'code':
          return `<pre><code>${escapeHtml(b.content)}</code></pre>`;
        case 'heading':
          return b.level === 2
            ? `<h2 id="${escapeAttr(slugify(b.text))}">${inlineToHtml(b.text)}</h2>`
            : `<h3>${inlineToHtml(b.text)}</h3>`;
        case 'hr':
          return '<hr/>';
        case 'image': {
          const cap = b.caption ? `<figcaption>${escapeHtml(b.caption)}</figcaption>` : '';
          return `<figure><img src="${escapeAttr(b.src)}" alt="${escapeAttr(b.alt)}" loading="lazy"/>${cap}</figure>`;
        }
        case 'quote':
          return `<blockquote>${inlineToHtml(b.text)}</blockquote>`;
        case 'ul':
          return `<ul>${b.items.map((it) => `<li>${inlineToHtml(it)}</li>`).join('')}</ul>`;
        case 'ol':
          return `<ol>${b.items.map((it) => `<li>${inlineToHtml(it)}</li>`).join('')}</ol>`;
        default:
          return `<p>${inlineToHtml(b.text)}</p>`;
      }
    })
    .join('');
}
