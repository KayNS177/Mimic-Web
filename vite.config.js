import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE = 'https://mimicstudio.co';
const BLOG_DIR = path.resolve(__dirname, 'src/content/blog');

/** Read published blog posts (slug + date) straight from the Markdown frontmatter. */
function readPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8');
      const m = raw.match(/^---\s*\n([\s\S]*?)\n---/);
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
      return meta;
    })
    .filter((meta) => meta && meta.slug && meta.draft !== 'true')
    .map((meta) => ({ slug: meta.slug, date: meta.date || '' }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function buildSitemap() {
  const posts = readPosts();
  const latest = posts.reduce((acc, p) => (p.date > acc ? p.date : acc), '2026-06-20');
  const urls = [
    { loc: `${SITE}/`, lastmod: latest },
    { loc: `${SITE}/blog`, lastmod: latest },
    ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.date })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/** Emit sitemap.xml at build time and serve it live in dev — always in sync with the posts. */
function sitemap() {
  return {
    name: 'mimic-sitemap',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml');
          res.end(buildSitemap());
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemap()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into long-cached chunks separate from app code.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          // hls.js is dynamically imported — keep it in its own chunk so it is
          // never pulled into the eagerly-loaded vendor bundle.
          if (id.includes('hls.js')) return 'hls';
          if (id.includes('react-router') || id.includes('react-helmet')) return 'router';
          if (id.includes('motion') || id.includes('framer')) return 'motion';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/'))
            return 'react';
          return 'vendor';
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
