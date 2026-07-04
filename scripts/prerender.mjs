// Post-build prerender: inject per-route <head> meta (+ static body content) into
// static HTML files so non-JS crawlers/social scrapers get correct titles,
// descriptions, canonicals, OG tags, and BlogPosting JSON-LD in the raw HTML.
//
// Runs after `vite build` (uses dist/index.html for the hashed asset tags).
// Emits dist/blog/index.html, dist/blog/<slug>/index.html, dist/about/index.html.
// The route meta tags carry data-rh so react-helmet-async reconciles (not
// duplicates) them once the SPA mounts.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readAllPosts } from './read-posts.mjs';
import { blogIndexMeta, articleMeta, aboutMeta } from '../src/lib/seo-meta.js';
import { blocksToHtml } from '../src/lib/markdown-core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

function headTags(meta) {
  const t = [];
  const meta_ = (attr, key, val) =>
    t.push(`<meta data-rh="true" ${attr}="${key}" content="${escAttr(val)}"/>`);
  if (meta.description) meta_('name', 'description', meta.description);
  if (meta.canonical)
    t.push(`<link data-rh="true" rel="canonical" href="${escAttr(meta.canonical)}"/>`);
  if (meta.colorScheme) meta_('name', 'color-scheme', meta.colorScheme);
  if (meta.og?.type) meta_('property', 'og:type', meta.og.type);
  if (meta.og?.title) meta_('property', 'og:title', meta.og.title);
  if (meta.og?.description) meta_('property', 'og:description', meta.og.description);
  if (meta.og?.url) meta_('property', 'og:url', meta.og.url);
  if (meta.og?.image) meta_('property', 'og:image', meta.og.image);
  if (meta.og?.imageWidth) meta_('property', 'og:image:width', String(meta.og.imageWidth));
  if (meta.og?.imageHeight) meta_('property', 'og:image:height', String(meta.og.imageHeight));
  if (meta.twitter?.title) meta_('name', 'twitter:title', meta.twitter.title);
  if (meta.twitter?.description) meta_('name', 'twitter:description', meta.twitter.description);
  if (meta.twitter?.image) meta_('name', 'twitter:image', meta.twitter.image);
  if (meta.jsonLd)
    t.push(
      `<script data-rh="true" type="application/ld+json">${JSON.stringify(
        meta.jsonLd,
      ).replace(/</g, '\\u003c')}</script>`,
    );
  return t.join('\n    ');
}

function render(meta, bodyHtml) {
  let html = template;
  if (meta.title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  // Remove the homepage's data-rh defaults, then inject route-specific ones.
  html = html.replace(/\s*<(?:meta|link)\b[^>]*\bdata-rh="true"[^>]*\/?>/g, '');
  html = html.replace('</head>', `    ${headTags(meta)}\n  </head>`);
  if (bodyHtml) html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return html;
}

function write(routePath, html) {
  const dir = path.join(DIST, routePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const wrap = (inner, maxW = '68ch') =>
  `<main class="bg-paper" style="min-height:100vh"><div style="max-width:${maxW};margin:0 auto;padding:9rem 1.5rem 5rem">${inner}</div></main>`;
const h1 = (text, size = '2rem') =>
  `<h1 class="font-brand" style="font-size:${size};font-weight:700;letter-spacing:-0.02em;color:var(--ink-strong)">${esc(text)}</h1>`;

const posts = readAllPosts();

// /blog
const list = posts
  .map(
    (p) =>
      `<li style="margin:0.75rem 0"><a href="/blog/${escAttr(p.slug)}">${esc(p.title)}</a> — ${esc(p.excerpt)}</li>`,
  )
  .join('');
write(
  'blog',
  render(
    blogIndexMeta(posts),
    wrap(
      `<p class="eyebrow-ink">The Journal</p>${h1('Field notes on building the web', '2.5rem')}<ul style="color:var(--ink-body)">${list}</ul>`,
      '72rem',
    ),
  ),
);

// /blog/<slug>
for (const post of posts) {
  const body = wrap(
    `<p class="eyebrow-ink">${esc(post.category)}</p>${h1(post.title)}` +
      `<p style="color:var(--ink-muted)">By ${esc(post.author.name)} · ${esc(post.date)} · ${esc(post.readTime)}</p>` +
      `<div class="article-prose">${blocksToHtml(post.body)}</div>`,
  );
  write(`blog/${post.slug}`, render(articleMeta(post), body));
}

// /about
write(
  'about',
  render(
    aboutMeta(),
    wrap(
      `<p class="eyebrow-ink">About</p>${h1('The studio behind your next website', '2.5rem')}` +
        `<p style="color:var(--ink-body)">Mimic.Studio is a B2B &amp; B2C web design studio building fast, high-converting, SEO-optimized websites and digital solutions for businesses in Malaysia and worldwide.</p>`,
    ),
  ),
);

console.log(`Prerendered ${posts.length} article(s) + /blog + /about`);
