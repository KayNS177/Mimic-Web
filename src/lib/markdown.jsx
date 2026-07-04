/**
 * React renderer for Markdown — thin serializer over the shared tokenizer in
 * markdown-core.js. Produces the same element structure as before; the tokenizer
 * (and thus the prerendered HTML) is the single source of truth.
 */

import { tokenizeBlocks, tokenizeInline, slugify, extractHeadings } from './markdown-core.js';

export { slugify, extractHeadings };

function renderInline(text) {
  return tokenizeInline(text).map((t, key) => {
    switch (t.type) {
      case 'code':
        return <code key={key}>{t.value}</code>;
      case 'strong':
        return <strong key={key}>{t.value}</strong>;
      case 'em':
        return <em key={key}>{t.value}</em>;
      case 'link':
        return (
          <a
            key={key}
            href={t.href}
            {...(t.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {t.value}
          </a>
        );
      default:
        return t.value;
    }
  });
}

export function renderMarkdown(md) {
  return tokenizeBlocks(md).map((b, key) => {
    switch (b.type) {
      case 'code':
        return (
          <pre key={key}>
            <code>{b.content}</code>
          </pre>
        );
      case 'heading':
        return b.level === 2 ? (
          <h2 key={key} id={slugify(b.text)}>
            {renderInline(b.text)}
          </h2>
        ) : (
          <h3 key={key}>{renderInline(b.text)}</h3>
        );
      case 'hr':
        return <hr key={key} />;
      case 'image':
        return (
          <figure key={key}>
            <img src={b.src} alt={b.alt} loading="lazy" />
            {b.caption ? <figcaption>{b.caption}</figcaption> : null}
          </figure>
        );
      case 'quote':
        return <blockquote key={key}>{renderInline(b.text)}</blockquote>;
      case 'ul':
        return (
          <ul key={key}>
            {b.items.map((it, idx) => (
              <li key={idx}>{renderInline(it)}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={key}>
            {b.items.map((it, idx) => (
              <li key={idx}>{renderInline(it)}</li>
            ))}
          </ol>
        );
      default:
        return <p key={key}>{renderInline(b.text)}</p>;
    }
  });
}
