# SEO Action Plan — Mimic.Studio

**Generated:** June 12, 2026 · from FULL-AUDIT-REPORT.md (Health Score: 42/100)
**Priorities:** Critical = fix immediately · High = within 1 week · Medium = within 1 month · Low = backlog

---

## CRITICAL

### C1. Deploy the pending local changes
The live site (deployed May 29) still says "Luxury web design" in title/schema/footer and 404s on `/llms.txt`. The local repo already fixes all of this (B2B & B2C repositioning + `public/llms.txt`).
**Action:** commit and push. Verify after deploy: `https://mimicstudio.co/llms.txt` returns 200; title shows "B2B & B2C Website Design Agency".

### C2. Prerender the page (fix the empty-body SPA)
The served HTML body is `<div id="root"></div>` — AI crawlers and many bots see no content; passage citability is ~0.
**Action:** add build-time prerendering to the Vite app (e.g., `vite-plugin-prerender` / SSG pass rendering the React tree to static HTML, hydrating on load). Interim stopgap: a `<noscript>` block summarizing services, process, pricing, contact.
**Do NOT** serve `index.legacy.html` as the shell — it is an outdated design with different (GBP) pricing.

### C3. Create real Privacy Policy & Terms pages
`#privacy` and `#terms` in the footer are dead anchors while the quote form collects personal data (GDPR / Malaysia PDPA exposure, and a Google quality-rater trust signal).
**Action:** add `/privacy` and `/terms` (real routes or static HTML pages) and point the footer links at them.

### C4. Tame the 52 MB media payload
33.5 MB hero MP4 + 18.5 MB of GIFs, all uncached. Estimated mobile Lighthouse: 25–40.
**Action:**
1. Re-encode hero video to ≤5 MB (720p H.264), add a `poster` image preloaded with `fetchpriority="high"`.
2. Convert the three feature GIFs to `<video autoplay loop muted playsinline>` (≈90% smaller) and lazy-load them (below the fold).
3. Add cache headers — see `vercel.json` snippet below.

---

## HIGH

### H1. Add canonical, OG/Twitter tags, favicon, meta robots to `index.html`
```html
<link rel="canonical" href="https://mimicstudio.co/" />
<link rel="icon" href="/favicon.ico" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://mimicstudio.co/" />
<meta property="og:title" content="Mimic.Studio | B2B & B2C Website Design Agency" />
<meta property="og:description" content="B2B & B2C website design agency creating high-converting, SEO-optimized websites. Custom responsive design, blazing performance." />
<meta property="og:image" content="https://mimicstudio.co/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://mimicstudio.co/og-image.jpg" />
```
Create a 1200×630 `og-image.jpg` and a favicon set in `public/`.

### H2. Fix www redirect (307 → permanent)
In Vercel domain settings, set `mimicstudio.co` as the primary domain so `www` 308-redirects permanently.

### H3. Add `vercel.json` — cache + security headers
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/frames/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### H4. Replace the JSON-LD blocks
`ProfessionalService` is a LocalBusiness subtype requiring a street address (we have none) — switch to `Organization`; fix `priceRange`; add email/logo/sameAs; link blocks by `@id`; add FAQPage.

**Block 1 — Organization (replaces ProfessionalService):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://mimicstudio.co/#organization",
  "name": "Mimic.Studio",
  "description": "B2B and B2C website design agency creating high-converting, SEO-optimized websites. Expert team delivering custom responsive web design, blazing performance, and conversion optimization.",
  "url": "https://mimicstudio.co",
  "logo": { "@type": "ImageObject", "url": "https://mimicstudio.co/logo.png" },
  "image": "https://mimicstudio.co/logo.png",
  "email": "knsidik@gmail.com",
  "telephone": "+60174018136",
  "priceRange": "$3,000 – $15,000",
  "areaServed": [
    { "@type": "Country", "name": "Malaysia" },
    { "@type": "AdministrativeArea", "name": "Worldwide" }
  ],
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+60174018136",
    "email": "knsidik@gmail.com",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "B2B Website Design", "description": "Lead-generating websites for business-to-business companies" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "B2C Website Design", "description": "Conversion-focused websites that turn consumers into customers" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design", "description": "Bespoke website design tailored to your brand" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimization", "description": "Search engine optimization for higher rankings" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Responsive Design", "description": "Mobile-first responsive website development" } }
    ]
  }
}
```
Fill `sameAs` with real profile URLs (LinkedIn etc.) and `logo.png` with an actual asset before deploying.

**Block 2 — WebSite (update):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mimicstudio.co/#website",
  "name": "Mimic.Studio",
  "url": "https://mimicstudio.co",
  "description": "B2B and B2C website design agency creating high-converting, SEO-optimized websites",
  "publisher": { "@id": "https://mimicstudio.co/#organization" }
}
```

**Block 3 — FAQPage (new, mirrors llms.txt Q&As — also publish these on-page):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Will my website be mobile-friendly?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, every website is fully responsive and optimized for all devices with mobile-first design." } },
    { "@type": "Question", "name": "Do you provide SEO services?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SEO optimization is integrated into every project including technical SEO, on-page optimization, and schema markup." } },
    { "@type": "Question", "name": "Can I update the website myself?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we can integrate CMS solutions and provide training. Technical updates are available through support packages." } },
    { "@type": "Question", "name": "Do you offer ongoing support?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide maintenance, security updates, performance monitoring, and content updates through monthly support packages." } }
  ]
}
```
Note: do **not** add self-serving Review/AggregateRating markup without a verified third-party review source.

### H5. Put a stable keyword-bearing heading on the page
The H1's keyword portion is a rotating animation; no H2 contains a target query. Add a static subtitle/H2 such as "B2B & B2C website design that converts" near the hero.

---

## MEDIUM

### M1. Expand on-page content (~380 → 800+ words)
Surface what already exists in llms.txt:
- Numbered 6-step process section (Discovery → Support).
- Visible pricing section ($3,000–$15,000 range or named tiers) — also fixes the broken `#pricing` CTA in CtaFooter.
- FAQ section matching the FAQPage schema.
- Reconcile timeline claims: "10–14 days" (Stats) vs "2–4 weeks" (llms.txt) — pick one.

### M2. Add trust & E-E-A-T elements
- Replace unverifiable testimonials with real clients (name + company + link/logo) or a third-party review widget.
- About/founder section: name, photo, LinkedIn.
- Add a one-line source note to the stats or remove the duplicated Stats section.
- Replace footer `href="#"` social placeholders with real profiles.

### M3. Build external brand signals (GEO)
1. Clutch.co profile (most-cited agency directory in ChatGPT/Perplexity answers).
2. DesignRush listing + LinkedIn company page.
3. Optional: one YouTube walkthrough video (strong correlation with AI citation).

### M4. Sitemap/llms.txt hygiene
- Automate `<lastmod>` to deploy date.
- Consider folding llms.txt `## Keywords` into the About prose.
- Optional: IndexNow key file for Bing/Yandex.

---

## LOW

- HSTS `includeSubDomains; preload` + hstspreload.org submission.
- Self-host/trim fonts (Inter variable font replaces 7 weights); code-split vendor JS chunk.
- `site.webmanifest` for PWA signals.
- Re-run this audit with a Google API key (CrUX/PSI field data) and GSC access for indexation + query data.

---

## Suggested order of work

| Week | Items |
|------|-------|
| Now | C1 (deploy), H1, H3, H4 (one PR: meta tags + vercel.json + schema) |
| Week 1 | C3 (privacy/terms), C4 (media), H2, H5 |
| Weeks 2–4 | C2 (prerendering), M1, M2 |
| Ongoing | M3 (Clutch/LinkedIn/YouTube), M4, Low items |
