/**
 * File-based blog content.
 *
 * Posts live as Markdown files with YAML-ish frontmatter in ./blog/*.md and are
 * loaded at build time via Vite's import.meta.glob. No CMS, no runtime fetch.
 *
 * Frontmatter fields: title, slug, excerpt, category, author, date, readTime,
 * coverImage, draft.
 */

import { resolveAuthor } from './authors.js';

const modules = import.meta.glob('./blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parse(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return null;

  const meta = {};
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^["']|["']$/g, '');
    meta[key] = value;
  });

  return {
    title: meta.title || 'Untitled',
    slug: meta.slug || '',
    excerpt: meta.excerpt || '',
    category: meta.category || 'General',
    author: resolveAuthor(meta.author),
    date: meta.date || '',
    readTime: meta.readTime || '',
    coverImage: meta.coverImage || '',
    draft: meta.draft === 'true',
    body: match[2],
  };
}

const posts = Object.values(modules)
  .map(parse)
  .filter(Boolean)
  .filter((p) => !p.draft && p.slug)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return posts.slice(0, limit);
  const sameCategory = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getAllCategories() {
  return Array.from(new Set(posts.map((p) => p.category)));
}

/** Format an ISO date string (YYYY-MM-DD) for display. */
export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
