# Full SEO Audit Report: Mimic.Studio

**URL:** https://mimicstudio.co/
**Business Type:** Web Design Agency (B2B/B2C professional services, online — not local brick-and-mortar)
**Audit Date:** June 12, 2026
**Pages Crawled:** 1 of 1 (single-page React SPA, anchor navigation only)
**Overall SEO Health Score:** 42/100

> **Important context:** the live deploy is from May 29, 2026. The local repo contains uncommitted improvements (B2B & B2C repositioning of title/meta/schema/hero/footer, plus `public/llms.txt`) that are **not live yet**. Several findings below are fixed simply by deploying.

---

## Executive Summary

### Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 54 | 11.9 |
| Content Quality | 23% | 38 | 8.7 |
| On-Page SEO | 20% | 52 | 10.4 |
| Schema / Structured Data | 10% | 38 | 3.8 |
| Performance (CWV) | 10% | 30 | 3.0 |
| AI Search Readiness | 10% | 31 | 3.1 |
| Images / Media | 5% | 25 | 1.3 |
| **Total** | | | **42/100** |

### Top 5 Critical Issues
1. **Client-side rendering hides ~95% of content** — the served HTML body is an empty `<div id="root">`. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and many bots see zero page copy. Google renders JS but with delay and risk.
2. **52 MB of media payload** — 33.5 MB hero video + 18.5 MB of animated GIFs, all served with `Cache-Control: max-age=0`. Estimated Lighthouse mobile score: 25–40.
3. **Dead legal/CTA links** — `#privacy`, `#terms`, and `#pricing` anchors point to nothing. Privacy/Terms absence is a compliance and trust failure for a site collecting lead data.
4. **No canonical tag + www redirect is 307 (temporary)** — signal consolidation to `https://mimicstudio.co/` is not enforced.
5. **llms.txt returns 404 live** (exists locally, undeployed) and the live schema/title still say "Luxury web design" — conflicting entity signals vs. the new B2B/B2C positioning.

### Top 5 Quick Wins
1. **Deploy the pending local changes** — instantly fixes the title/meta/schema positioning and puts llms.txt live.
2. **Add `vercel.json` with cache + security headers** — immutable caching for `/assets/` and `/frames/`, plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
3. **Add canonical tag + Open Graph/Twitter Card tags + favicon** to `index.html` — small edits, immediate effect on indexing signals and social/WhatsApp link previews.
4. **Convert the three feature GIFs to lazy-loaded `<video>`** — 18.5 MB → ~2 MB with no visual change.
5. **Surface llms.txt content on-page** — process steps, pricing range, and FAQs already written; publishing them adds ~300 indexable words and fixes the broken `#pricing` CTA.

---

## 1. Technical SEO (54/100)

### Critical
- **No `<link rel="canonical">`** in either live or local `index.html`. Add `<link rel="canonical" href="https://mimicstudio.co/" />`.
- **`www.mimicstudio.co` redirects with HTTP 307** (temporary). Configure a permanent (308) redirect in Vercel domain settings or `vercel.json`.
- **Empty-body SPA**: all content requires JS execution. Recommended fix: prerender the React app at build time (e.g., `vite-plugin-prerender` or an SSG pass) so the served HTML contains the full rendered markup. *Note: do NOT serve `index.legacy.html` as a prerender shell — it is an outdated design with different (GBP) pricing and old positioning.*

### High
- **No Open Graph or Twitter Card tags** — shares on WhatsApp/LinkedIn/X render blank. Add `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`, `twitter:card`.
- **No favicon** — `/favicon.ico` 404s; no `<link rel="icon">` tag. Google shows favicons in mobile SERPs.
- **Missing security headers** — only HSTS is present. Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` via `vercel.json`.
- **Stale sitemap `lastmod`** (2026-05-13 vs. deploy of 2026-05-29). Automate updating it on each deploy.

### Medium / Low
- IndexNow key file absent (optional Bing/Yandex instant indexing).
- HSTS could add `includeSubDomains; preload` and be submitted to the preload list.
- Soft-404 behavior: unknown paths return the SPA shell with 200 — configure a real 404 for non-existent routes if routes are ever added.
- robots.txt is clean and correct; sitemap structure valid (1 URL is accurate for the site).

## 2. Content Quality & E-E-A-T (38/100)

- **~380 indexable words** on the page — under the ~500-word homepage floor and far below the 1,000–2,000 words competing "web design agency" pages carry.
- **Experience signals absent**: no portfolio, no case studies, no named verifiable clients. Testimonial companies ("Finlytic", "Wealth", "Orbit Labs") are unverifiable — no logos, links, or photos.
- **Trust gaps**: Privacy/Terms links are dead anchors; contact is WhatsApp + Gmail only; no business entity, founder, or team named anywhere.
- **Unsourced stats**: "98% satisfaction, 3.2x conversions, 10–14 days" appear twice (FeaturesGrid + Stats) with no methodology. Also inconsistent with llms.txt's "2–4 weeks" timeline.
- **Keyword targeting weak**: "B2B website design" / "B2C website design" appear only in the hero badge and footer (after deploy); no stable H1/H2 contains them. The H1's rotating word is not a crawlable, stable heading.
- **Copy leans on superlatives** ("wildly reimagined", "defined by excellence") rather than specifics — pattern-matched as low-value filler by quality raters.
- **AI citation readiness: 22/100** — pricing/process/FAQ facts exist only in llms.txt, not in the rendered page.

**Top content additions by impact:** (1) 2–3 real case studies with metrics, (2) on-page numbered process section, (3) visible pricing section (fixes `#pricing`), (4) real Privacy/Terms pages, (5) About/founder section with a name, photo, and LinkedIn.

## 3. On-Page SEO (52/100)

- Title and meta description are well-formed; the pending B2B/B2C versions are stronger — deploy them.
- H1 exists but its keyword-bearing portion rotates via JS animation; H2s ("The difference is everything", etc.) carry zero query terms. Add one stable, keyword-bearing subtitle or H2.
- Internal linking N/A (single page); however three anchor CTAs (`#pricing`, `#privacy`, `#terms`) are broken — both a UX and crawl-quality issue.
- `lang="en"` and viewport set correctly. No meta robots tag (defaults to index,follow — fine; adding `max-image-preview:large` is a free snippet enhancement).

## 4. Schema / Structured Data (38/100)

- **Type misuse**: `ProfessionalService` is a `LocalBusiness` subtype that Google ties to physical premises; the address block has only `addressCountry: MY` (ineligible for LocalBusiness rich results and weak for entity resolution). Recommended: switch to `Organization` (optionally typed `["Organization","ProfessionalService"]`).
- **`priceRange: "$$"` is misleading** — use the literal `"$3,000 – $15,000"`.
- **Missing**: `email`, `logo`/`image`, `sameAs`, `@id` linkage between Organization and WebSite blocks; `areaServed` says Malaysia only while llms.txt says worldwide.
- **FAQPage schema** recommended (no Google rich result for commercial sites since Aug 2023, but valuable for AI citation) — Q&As already exist in llms.txt.
- Do **not** add self-serving Review/AggregateRating markup — spam-policy violation without a third-party source.
- Ready-to-paste replacement JSON-LD blocks are in `ACTION-PLAN.md`.

## 5. Performance / Core Web Vitals (30/100, estimated)

PSI API was rate-limited during this audit (no key); estimates derive from measured asset weights and timing. TTFB is excellent (111 ms, Vercel edge).

| Asset | Size | Problem |
|-------|------|---------|
| Hero video (`/frames/Grasslands0001-0320.mp4`) | 33.5 MB | LCP element; no poster, no preload, `max-age=0` |
| feature-1.gif | 9.4 MB | GIF format, eager-loaded, uncached |
| feature-2.gif | 7.2 MB | GIF format, eager-loaded, uncached |
| Feature_3.gif | 1.9 MB | GIF format, eager-loaded, uncached |
| index JS bundle | 877 KB (275 KB gz) | monolithic, no code-splitting, uncached |
| Google Fonts | 3 families / 13 weights | render-blocking |

**Priority order:** (1) re-encode hero video to ≤5 MB 720p + poster image with `fetchpriority="high"`, (2) convert GIFs to lazy `<video>` (≈90% savings), (3) `vercel.json` immutable cache headers, (4) trim/self-host fonts (Inter variable font replaces 7 weights), (5) code-split vendor chunk.

## 6. AI Search Readiness / GEO (31/100)

- robots.txt allows all AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) — correct posture for a brand that needs visibility.
- **Dominant problem: client-side rendering.** AI crawlers don't execute JS; they currently see only the title, meta description, and JSON-LD (~400 words machine-readable vs. what humans see). Passage-level citability is effectively zero until the site is prerendered.
- **llms.txt is good but undeployed** (404 live). Before deploying: it's solid structurally; consider folding the `## Keywords` section into prose (reads as SEO filler to an LLM). Pricing in llms.txt ($3,000–$15,000) must stay consistent with any on-page pricing you publish.
- **No external brand signals**: no Clutch/DesignRush profiles, footer social links are `href="#"` placeholders, no LinkedIn company page, no named founder/author anywhere (weak entity disambiguation).
- Platform notes: Google AI Overviews needs server-rendered HTML + consistent entity data (fix areaServed conflict); Perplexity is most likely to cite llms.txt once live; ChatGPT search needs either rendered HTML or third-party sources (Clutch profile).

## 7. Images / Media (25/100)

- `FeaturesChess` images have descriptive alt text (good); hero video correctly `aria-hidden` as decorative.
- 18.5 MB of GIFs is the bulk of the penalty (see Performance). Convert to video/AVIF, lazy-load below-the-fold media.
- No `og:image` exists — also needed for social previews (see Technical).

## 8. Search Experience (SXO) — inline assessment

For "b2b website design" / "web design agency" queries, SERPs reward agency service pages with portfolios, case studies, transparent pricing, and long-form proof. The page *type* (agency landing page) matches intent, but the page loses on depth and proof: a buyer persona evaluating a $3k–$15k purchase finds no work samples, no humans, and no prices. Expect high pogo-sticking until case studies and pricing are on-page.

---

## Audit Limitations

- PageSpeed Insights API quota was exhausted; CWV figures are lab estimates from asset analysis, not CrUX field data. Re-run with a Google API key for field data.
- No Google Search Console / GA4 / Moz / Bing / DataForSEO credentials configured — indexation status, query data, and backlink profile were not auditable.
- Screenshot/mobile-render checks skipped (Playwright not configured in this environment).
- SXO and clustering were assessed inline (no live SERP data available).

*Specialist sub-audits: technical (agent afc9693d), content (ad5a4406), schema (a1efdffb), performance (af9f9185), GEO (aff569e8).*
