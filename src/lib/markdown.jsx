/**
 * Tiny dependency-free Markdown renderer.
 *
 * Scope is intentionally limited to what the blog content actually uses:
 * h2/h3, paragraphs, bold/italic/inline-code/links, blockquotes, ordered and
 * unordered lists, fenced code blocks, standalone images (with optional caption),
 * and horizontal rules. The placeholder posts only use these features, so the
 * renderer stays small and predictable.
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

function renderInline(text) {
  const nodes = [];
  let key = 0;
  const regex =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*|_[^_]+_)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (m[1]) {
      nodes.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    } else if (m[2]) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (m[3]) {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    } else if (m[4]) {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = lm[2];
      const external = /^https?:/.test(href);
      nodes.push(
        <a
          key={key++}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {lm[1]}
        </a>,
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function renderMarkdown(md) {
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced code block
    if (/^```/.test(line)) {
      i++;
      const buf = [];
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // closing fence
      out.push(
        <pre key={key++}>
          <code>{buf.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    // Headings (h2 / h3)
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const text = h[2];
      if (h[1].length === 2) {
        out.push(
          <h2 key={key++} id={slugify(text)}>
            {renderInline(text)}
          </h2>,
        );
      } else {
        out.push(<h3 key={key++}>{renderInline(text)}</h3>);
      }
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      out.push(<hr key={key++} />);
      i++;
      continue;
    }

    // Standalone image with optional "caption"
    const img = line
      .trim()
      .match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img) {
      out.push(
        <figure key={key++}>
          <img src={img[2]} alt={img[1]} loading="lazy" />
          {img[3] ? <figcaption>{img[3]}</figcaption> : null}
        </figure>,
      );
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(<blockquote key={key++}>{renderInline(buf.join(' '))}</blockquote>);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      out.push(
        <ul key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      out.push(
        <ol key={key++}>
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Paragraph — gather soft-wrapped lines until a blank line or new block
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !BLOCK_START.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push(<p key={key++}>{renderInline(buf.join(' '))}</p>);
  }

  return out;
}
