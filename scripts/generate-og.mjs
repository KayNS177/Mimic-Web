// Generate a branded 1200x630 OG/social image per blog post.
//
// Run locally with `npm run og` (NOT in the Vercel build — it needs a browser).
// Commit the resulting public/og/<slug>.png files. Each post's articleMeta() points
// og:image at /og/<slug>.png.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { readAllPosts } from './read-posts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/og');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function cardHtml(post) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@500;600;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0a0a0f;color:#fff;font-family:'Inter',sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;width:1000px;height:1000px;border-radius:50%;top:-320px;right:-260px;
        background:radial-gradient(circle,rgba(44,67,232,0.55),rgba(20,20,48,0) 60%)}
  .ring{position:absolute;border:1px solid rgba(255,255,255,0.06);border-radius:50%}
  .r1{width:520px;height:520px;top:-90px;right:-60px}
  .r2{width:760px;height:760px;top:-210px;right:-180px}
  .r3{width:1000px;height:1000px;top:-330px;right:-300px}
  .wrap{position:absolute;inset:0;padding:80px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{font-weight:800;font-size:34px;letter-spacing:-0.02em}
  .brand span{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400}
  .cat{text-transform:uppercase;letter-spacing:0.22em;font-size:20px;color:#93a4ff;font-weight:600;margin-bottom:22px}
  .title{font-size:66px;font-weight:800;line-height:1.04;letter-spacing:-0.03em;max-width:1010px}
  .foot{font-size:22px;color:rgba(255,255,255,0.55);font-weight:500}
</style></head>
<body>
  <div class="glow"></div>
  <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
  <div class="wrap">
    <div class="brand">Mimic<span>.</span>Studio</div>
    <div>
      <div class="cat">${esc(post.category)}</div>
      <div class="title">${esc(post.title)}</div>
    </div>
    <div class="foot">mimicstudio.co${post.readTime ? ' · ' + esc(post.readTime) : ''}</div>
  </div>
</body></html>`;
}

const posts = readAllPosts();
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
});

for (const post of posts) {
  await page.setContent(cardHtml(post), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const file = path.join(OUT_DIR, `${post.slug}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`  og: ${post.slug}.png`);
}

await browser.close();
console.log(`Generated ${posts.length} OG image(s) in public/og/`);
