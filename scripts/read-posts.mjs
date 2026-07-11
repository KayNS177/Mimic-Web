// Node-side blog reader used by the prerender script. Mirrors src/content/posts.js
// (same frontmatter parsing + author resolution) but reads the .md files directly
// so it can run in plain Node without Vite's import.meta.glob.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveAuthor } from '../src/content/authors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.resolve(__dirname, '../src/content/blog');

export function readAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8');
      const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
      if (!m) return null;
      const meta = {};
      m[1].split('\n').forEach((line) => {
        const i = line.indexOf(':');
        if (i === -1) return;
        meta[line.slice(0, i).trim()] = line
          .slice(i + 1)
          .trim()
          .replace(/^["']|["']$/g, '');
      });
      if (meta.draft === 'true' || !meta.slug) return null;
      return {
        title: meta.title || 'Untitled',
        slug: meta.slug,
        excerpt: meta.excerpt || '',
        category: meta.category || 'General',
        author: resolveAuthor(meta.author),
        date: meta.date || '',
        updated: meta.updated || '',
        readTime: meta.readTime || '',
        body: m[2],
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
