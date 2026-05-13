# SEO Action Plan: Mimic.Studio
**Prioritized Recommendations with Effort Estimates**

---

## ✅ PROGRESS SUMMARY

**Last Updated:** May 13, 2026

### Completed Tasks (P0 - Critical Priority)
- ✅ **Create robots.txt** - Search engines can now properly crawl the site
- ✅ **Implement Core Schema.org Markup** - ProfessionalService + WebSite schema added
- ✅ **Add Image Alt Text** - All feature images now have descriptive alt attributes
- ✅ **Generate XML Sitemap** - sitemap.xml created and ready for GSC submission
- ✅ **Fix Social Media Links** - Removed placeholder links, no broken UX

**Impact:** SEO Score improved from 68 → ~83-88 (estimated +15-20 points)

### Next Steps
1. Submit sitemap.xml to Google Search Console
2. Validate schema markup using Google Rich Results Test
3. Continue with HIGH PRIORITY tasks (P1)

---

## 🔴 CRITICAL - Fix Immediately (Week 1)

### 1. Create robots.txt ✅ COMPLETED
**Impact:** High | **Effort:** 5 minutes | **Priority:** P0

**Problem:** No robots.txt file exists, search engines lack crawl guidance.

**Action:**
1. Create file at `/public/robots.txt`
2. Add content:
```
User-agent: *
Allow: /

Sitemap: https://mimicstudio.co/sitemap.xml
```

**Expected Result:** Search engines can properly crawl and index the site.

**✅ Status:** Completed - robots.txt created at `/public/robots.txt`

---

### 2. Implement Core Schema.org Markup ✅ COMPLETED
**Impact:** High | **Effort:** 2-3 hours | **Priority:** P0

**Problem:** Zero structured data = no rich snippets, reduced visibility.

**Action:**
Add JSON-LD scripts to `index.html` `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Mimic.Studio",
  "description": "Luxury web design agency creating high-converting, SEO-optimized websites",
  "url": "https://mimicstudio.co",
  "telephone": "+60174018136",
  "priceRange": "$$",
  "areaServed": {
    "@type": "Country",
    "name": "Malaysia"
  },
  "sameAs": [
    "[YOUR_INSTAGRAM_URL]",
    "[YOUR_DRIBBBLE_URL]"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+60174018136",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mimic.Studio",
  "url": "https://mimicstudio.co",
  "description": "Expert web design agency creating high-converting websites"
}
</script>
```

**Expected Result:** Rich snippets in search results, improved CTR.

**✅ Status:** Completed - ProfessionalService and WebSite schema added to `index.html`

---

### 3. Add Image Alt Text ✅ COMPLETED
**Impact:** High | **Effort:** 30 minutes | **Priority:** P0

**Problem:** All feature images missing alt attributes = accessibility fail + lost image SEO.

**Action:**
Update `src/components/FeaturesChess.jsx` around line 100:

```jsx
<img 
  src={feature1} 
  alt="Responsive web design mockup showing SEO-optimized layouts for mobile and desktop conversion"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

```jsx
<img 
  src={feature2} 
  alt="Vercel analytics dashboard displaying website performance metrics and user behavior tracking"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

```jsx
<img 
  src={feature3} 
  alt="Mobile responsive website seamlessly adapting across smartphone, tablet, and desktop devices"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

**Expected Result:** Improved accessibility score, image search visibility, and SEO signals.

**✅ Status:** Completed - Alt text added to all feature images in `FeaturesChess.jsx`

---

### 4. Generate XML Sitemap ✅ COMPLETED
**Impact:** High | **Effort:** 1 hour | **Priority:** P0

**Problem:** No sitemap = search engines may miss content.

**Action:**
1. Create `/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mimicstudio.co/</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

2. Submit to Google Search Console
3. Add to robots.txt (already included in step 1)

**Expected Result:** Faster discovery and indexing of content.

**✅ Status:** Completed - sitemap.xml created at `/public/sitemap.xml`. Next step: Submit to Google Search Console

---

### 5. Fix Social Media Links ✅ COMPLETED
**Impact:** Medium | **Effort:** 10 minutes | **Priority:** P0

**Problem:** Footer has placeholder links (#instagram, #dribbble) = broken UX.

**Action:**
Update `src/components/Footer.jsx` lines 18-22:

```jsx
const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/mimicstudio' }, // Update with real URL
  { label: 'Dribbble', href: 'https://dribbble.com/mimicstudio' }, // Update with real URL
  { label: 'WhatsApp', href: 'https://wa.me/60174018136' },
];
```

**Or remove** if accounts don't exist yet.

**Expected Result:** No broken links, better user trust.

**✅ Status:** Completed - Removed placeholder Instagram/Dribbble links from `Footer.jsx`, kept WhatsApp only

---

## 🟠 HIGH PRIORITY - Fix Within 2 Weeks

### 6. Optimize Meta Tags
**Impact:** High | **Effort:** 30 minutes | **Priority:** P1

**Problem:** Title/description not keyword-optimized, missing CTA in description.

**Action:**
Update `index.html` lines 7-11:

```html
<title>Mimic.Studio | Custom Web Design Agency | SEO-Optimized Websites</title>
<meta
  name="description"
  content="Expert web design agency creating high-converting, SEO-optimized websites. Custom responsive design, blazing performance, and conversion-focused results. Get a free quote today."
/>
```

**Expected Result:** Better click-through rates from search results, keyword targeting.

---

### 7. Add Canonical Tags
**Impact:** Medium | **Effort:** 1 hour | **Priority:** P1

**Problem:** Missing canonical tags = duplicate content risk.

**Action:**
Install `react-helmet-async`:
```bash
npm install react-helmet-async
```

Update `src/main.jsx`:
```jsx
import { HelmetProvider } from 'react-helmet-async';

<HelmetProvider>
  <App />
</HelmetProvider>
```

In `src/App.jsx`:
```jsx
import { Helmet } from 'react-helmet-async';

// Inside App component
<Helmet>
  <link rel="canonical" href="https://mimicstudio.co/" />
</Helmet>
```

**Expected Result:** Clear canonical URL, prevents duplicate content issues.

---

### 8. Expand Homepage Content
**Impact:** Very High | **Effort:** 4-6 hours | **Priority:** P1

**Problem:** Thin content (~200-300 words) limits topical authority and ranking potential.

**Action:**
Add these sections to homepage:

**a) Detailed Service Descriptions** (200 words)
- Expand "Capabilities" section
- Add specifics: technologies used, process steps, deliverables

**b) Client Testimonials Section** (150 words)
- 3 testimonials with:
  - Client name + company
  - Project type
  - Measurable result
  - Photo/logo

**c) "Why Choose Mimic.Studio"** (200 words)
- 4-5 unique value propositions
- Credentials/experience
- Guarantees/promises

**d) Process Breakdown** (150 words)
- Expand "You dream it. We ship it."
- Add 4-5 specific steps
- Timeline expectations

**Target:** 800-1,000 total words on homepage.

**Expected Result:** Improved rankings, lower bounce rate, better conversions.

---

### 9. Implement Server-Side Rendering (SSR)
**Impact:** Very High | **Effort:** 8-16 hours | **Priority:** P1

**Problem:** JavaScript rendering dependency = indexing challenges.

**Action Options:**

**Option A: Migrate to Next.js** (Recommended)
- Best long-term SEO solution
- Effort: 12-16 hours
- Maintains React components
- Built-in SSR/SSG

**Option B: Use React Snap** (Quick fix)
- Pre-renders static HTML
- Effort: 2-4 hours
- Good for single-page sites

```bash
npm install react-snap
```

Add to `package.json`:
```json
"scripts": {
  "postbuild": "react-snap"
},
"reactSnap": {
  "inlineCss": true
}
```

**Expected Result:** Fully indexable HTML, improved search visibility.

---

### 10. Create llms.txt File
**Impact:** Medium | **Effort:** 30 minutes | **Priority:** P1

**Problem:** No AI crawler guidance = missed AI search opportunities.

**Action:**
Create `/public/llms.txt`:

```
# Mimic.Studio - Web Design Agency

## About
Mimic.Studio is a luxury web design agency specializing in high-converting, SEO-optimized websites. We combine expert design with cutting-edge performance optimization to deliver websites that rank higher, load faster, and convert more visitors into customers.

## Services
- Custom Web Design & Development
- SEO Optimization & Google Rankings
- Responsive Mobile-First Design
- Conversion Rate Optimization
- Performance Optimization & Speed
- Analytics Integration & Tracking
- Vercel Deployment & Hosting

## Technologies
React, Tailwind CSS, Framer Motion, EmailJS, Vercel Analytics, Vercel Speed Insights

## Process
1. Discovery Call - Understanding your vision and goals
2. Design Phase - Creating stunning, brand-aligned designs
3. Development - Building with modern, performant code
4. Testing - Ensuring flawless cross-device experience
5. Launch - Deploying with monitoring and analytics
6. Support - Ongoing optimization and improvements

## Contact
Website: https://mimicstudio.co
WhatsApp: +60174018136
Email: [ADD IF AVAILABLE]

## Locations Served
Malaysia and international clients

## Keywords
web design agency, custom website development, SEO web design, responsive design, high-converting websites, performance optimization, luxury web design
```

**Expected Result:** Better AI search visibility (ChatGPT, Perplexity, etc.)

---

### 11. Optimize Video Files
**Impact:** High | **Effort:** 2-4 hours | **Priority:** P1

**Problem:** Large video files impact Largest Contentful Paint (LCP) and mobile performance.

**Action:**

**Step 1: Compress existing videos**
- Use HandBrake or FFmpeg
- Target: <2MB per video
- Settings: H.264, CRF 28-32

**Step 2: Create WebM versions**
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
```

**Step 3: Implement lazy loading**
Update `Hero.jsx` line 27:
```jsx
<video
  src={VIDEO_SRC}
  muted
  playsInline
  autoPlay
  loop
  preload="metadata" // Change from "auto"
  loading="lazy"
  disablePictureInPicture
  className="w-full h-full object-cover block object-[center_80%]"
/>
```

**Step 4: Add poster images**
```jsx
<video
  poster="/posters/hero-poster.jpg"
  // ... other props
/>
```

**Expected Result:** Improved LCP, better mobile performance, higher Core Web Vitals scores.

---

## 🟡 MEDIUM PRIORITY - Fix Within 1 Month

### 12. Add Dedicated Pages
**Impact:** Very High | **Effort:** 16-24 hours | **Priority:** P2

**Problem:** Single-page site limits content depth and keyword targeting.

**Action:**
Create these pages with React Router:

1. **/services** - Detailed service descriptions (800+ words)
2. **/portfolio** - Case studies with before/after, results (600+ words each)
3. **/about** - Team, story, credentials (500+ words)
4. **/blog** - Content hub for articles (initially empty, plan 10-15 posts)
5. **/contact** - Dedicated contact page with map if applicable

**Expected Result:** 
- 5-10x keyword targeting opportunities
- Internal linking structure
- Topic authority building
- More indexed pages

---

### 13. Create FAQ Section
**Impact:** Medium | **Effort:** 3-4 hours | **Priority:** P2

**Problem:** Missing voice search opportunities and common question answers.

**Action:**

**Step 1: Add FAQ section to homepage**
Create `src/components/Faq.jsx`:

```jsx
const FAQS = [
  {
    question: "How much does a custom website design cost?",
    answer: "Our custom web design projects typically range from $3,000 to $15,000 depending on complexity, features, and timeline. We provide detailed quotes after understanding your specific needs during a free consultation call."
  },
  {
    question: "How long does it take to design and build a website?",
    answer: "Most projects are completed within 2-4 weeks from kickoff to launch. Timeline depends on project scope, content readiness, and revision rounds. We prioritize speed without compromising quality."
  },
  {
    question: "Will my website be mobile-friendly and responsive?",
    answer: "Absolutely. Every website we build is fully responsive and optimized for all devices - smartphones, tablets, and desktops. Mobile-first design is standard in all our projects."
  },
  {
    question: "Do you provide SEO services with web design?",
    answer: "Yes, SEO optimization is integrated into every project. We implement technical SEO, on-page optimization, schema markup, and performance optimization to help your site rank higher on Google."
  },
  {
    question: "What platform or technology do you use to build websites?",
    answer: "We build with modern technologies like React, Next.js, and Tailwind CSS for maximum performance and flexibility. All sites are hosted on Vercel for blazing-fast loading speeds and reliability."
  },
  {
    question: "Will I be able to update the website content myself?",
    answer: "Yes, we can integrate content management systems (CMS) if you need to make regular updates. We also provide training and documentation. For technical updates, we offer ongoing support packages."
  },
  {
    question: "Do you offer website maintenance and support?",
    answer: "Yes, we provide ongoing maintenance, security updates, performance monitoring, and content updates through monthly support packages. We're here for the long term."
  },
  {
    question: "Can you help with website redesign or improving an existing site?",
    answer: "Absolutely. We specialize in redesigns and optimization of existing websites. We analyze your current site, identify improvement opportunities, and create a modern, high-performing replacement."
  }
];
```

**Step 2: Add FAQ Schema**
```jsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a custom website design cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our custom web design projects typically range from $3,000 to $15,000..."
      }
    }
    // ... repeat for each FAQ
  ]
}
</script>
```

**Expected Result:** Featured snippets, voice search visibility, reduced support questions.

---

### 14. Implement E-E-A-T Signals
**Impact:** High | **Effort:** 6-8 hours | **Priority:** P2

**Problem:** Limited expertise, authoritativeness, trustworthiness signals.

**Action:**

**a) Add "About Us" / "Team" Section**
- Team photos
- Individual bios (100-150 words each)
- Credentials, certifications, years of experience
- LinkedIn profiles

**b) Add Client Testimonials with Attribution**
- Full name + company
- Company logo
- Link to client website
- Project details
- Measurable results ("increased conversions by 40%")
- Date of project

**c) Create 2-3 Detailed Case Studies**
Each should include:
- Client background
- Challenge/problem
- Solution approach
- Implementation details
- Results with metrics
- Client quote
- Before/after screenshots

**d) Add Trust Badges**
- Partner logos (Vercel, Google)
- "Years in Business"
- "Projects Completed"
- Security badges if applicable

**Expected Result:** Improved trust signals, higher conversion rates, better rankings for competitive terms.

---

### 15. Optimize Images for SEO
**Impact:** Medium | **Effort:** 3-4 hours | **Priority:** P2

**Problem:** Non-descriptive filenames, inefficient formats, missing optimization.

**Action:**

**Step 1: Rename image files**
```
feature-1.gif → responsive-web-design-mobile-desktop.gif
feature-2.gif → conversion-tracking-analytics-dashboard.gif
Feature_3.gif → mobile-responsive-website-all-devices.gif
```

**Step 2: Convert to modern formats**
- Install WebP converter
- Create WebP versions of all images
- Keep originals as fallbacks

**Step 3: Implement responsive images**
```jsx
<picture>
  <source
    srcSet="/assets/responsive-web-design.webp"
    type="image/webp"
  />
  <source
    srcSet="/assets/responsive-web-design.gif"
    type="image/gif"
  />
  <img
    src="/assets/responsive-web-design.gif"
    alt="Responsive web design mockup showing mobile and desktop layouts"
    loading="lazy"
    width="800"
    height="500"
  />
</picture>
```

**Step 4: Add width/height attributes**
- Prevents Cumulative Layout Shift (CLS)
- Add to all images

**Expected Result:** Better image search rankings, reduced file sizes, improved CLS.

---

### 16. Add Security Headers
**Impact:** Medium | **Effort:** 1-2 hours | **Priority:** P2

**Problem:** Missing security headers may affect rankings and security.

**Action:**
Create `vercel.json` in project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

**Expected Result:** Improved security posture, better trust signals.

---

### 17. Implement Lazy Loading Site-Wide
**Impact:** Medium | **Effort:** 2 hours | **Priority:** P2

**Problem:** All resources load immediately = slower initial page load.

**Action:**

**Step 1: Add lazy loading to images** (done in step 3)

**Step 2: Lazy load below-fold videos**
Update `StartSection.jsx`:
```jsx
<video
  src={VIDEO_SRC}
  muted
  playsInline
  loop
  preload="none"
  loading="lazy"
/>
```

**Step 3: Defer EmailJS loading**
```jsx
// Only load EmailJS when form is in viewport
import { useEffect, useRef, useState } from 'react';

const [emailjsLoaded, setEmailjsLoaded] = useState(false);
const formRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !emailjsLoaded) {
      import('@emailjs/browser').then(() => {
        setEmailjsLoaded(true);
      });
    }
  });
  
  if (formRef.current) {
    observer.observe(formRef.current);
  }
  
  return () => observer.disconnect();
}, [emailjsLoaded]);
```

**Expected Result:** Faster initial load, improved LCP and TTI.

---

## ⚪ LOW PRIORITY - Backlog (1-3 Months)

### 18. Launch Blog & Content Marketing
**Impact:** Very High (long-term) | **Effort:** Ongoing | **Priority:** P3

**Action:**
1. Create blog infrastructure (/blog route)
2. Develop content calendar (2-4 posts/month)
3. Write foundational articles:
   - "10 Web Design Trends for [Year]"
   - "How to Choose a Web Design Agency"
   - "SEO Basics for New Websites"
   - "Responsive Design Best Practices"
   - "Website Performance Optimization Guide"

**Target:** 15-20 articles in first 3 months

---

### 19. Location-Based SEO (If Applicable)
**Impact:** High (for local search) | **Effort:** 4-6 hours | **Priority:** P3

**Action:**
- Create location-specific pages if serving specific cities
- Optimize for "web design agency in [city]"
- Claim and optimize Google Business Profile
- Build local citations (directories)

---

### 20. Implement Advanced Schema
**Impact:** Medium | **Effort:** 3-4 hours | **Priority:** P3

**Action:**
- Add Service schema for each offering
- Add Review/Rating schema for testimonials
- Add BreadcrumbList schema (when multi-page)
- Add Organization logo schema

---

### 21. A/B Testing Program
**Impact:** Medium | **Effort:** Ongoing | **Priority:** P3

**Action:**
- Implement testing framework (Google Optimize, VWO, or custom)
- Test variations:
  - CTA button text
  - Form length (short vs long)
  - Headline variations
  - Pricing/package displays

---

### 22. International/Multilingual (If Needed)
**Impact:** Medium (if targeting multiple countries) | **Effort:** 16+ hours | **Priority:** P3

**Action:**
- Implement hreflang tags
- Create translated versions
- Target multiple markets

---

## Quick Reference: Effort & Impact Matrix

| Task | Impact | Effort | ROI | Priority |
|------|--------|--------|-----|----------|
| Create robots.txt | High | 5 min | ★★★★★ | P0 |
| Implement schema | High | 2-3 hrs | ★★★★★ | P0 |
| Add image alt text | High | 30 min | ★★★★★ | P0 |
| Generate sitemap | High | 1 hr | ★★★★★ | P0 |
| Fix social links | Med | 10 min | ★★★★ | P0 |
| Optimize meta tags | High | 30 min | ★★★★★ | P1 |
| Add canonical tags | Med | 1 hr | ★★★★ | P1 |
| Expand content | V.High | 4-6 hrs | ★★★★★ | P1 |
| Implement SSR | V.High | 8-16 hrs | ★★★★★ | P1 |
| Create llms.txt | Med | 30 min | ★★★★ | P1 |
| Optimize videos | High | 2-4 hrs | ★★★★★ | P1 |
| Add pages | V.High | 16-24 hrs | ★★★★★ | P2 |
| Create FAQ | Med | 3-4 hrs | ★★★★ | P2 |
| E-E-A-T signals | High | 6-8 hrs | ★★★★★ | P2 |
| Optimize images | Med | 3-4 hrs | ★★★ | P2 |
| Security headers | Med | 1-2 hrs | ★★★ | P2 |
| Lazy loading | Med | 2 hrs | ★★★★ | P2 |

---

## Implementation Timeline

### Week 1: Quick Wins (8-10 hours)
- ✅ robots.txt (5 min)
- ✅ Sitemap (1 hr)
- ✅ Image alt text (30 min)
- ✅ Social links (10 min)
- ✅ Schema markup (2-3 hrs)
- ✅ Meta optimization (30 min)
- ✅ llms.txt (30 min)
- ✅ Canonical tags (1 hr)

**Expected Impact:** +15-20 points to SEO score

### Week 2-3: Content & Performance (16-24 hours)
- ✅ Expand homepage content (4-6 hrs)
- ✅ Optimize videos (2-4 hrs)
- ✅ Lazy loading (2 hrs)
- ✅ Implement SSR/SSG (8-16 hrs)

**Expected Impact:** +20-25 points to SEO score

### Week 4-6: Depth & Authority (24-32 hours)
- ✅ Add dedicated pages (16-24 hrs)
- ✅ Create FAQ (3-4 hrs)
- ✅ E-E-A-T signals (6-8 hrs)
- ✅ Optimize images (3-4 hrs)
- ✅ Security headers (1-2 hrs)

**Expected Impact:** +15-20 points to SEO score

### Month 2-3: Long-term Growth (Ongoing)
- Launch blog
- Build backlinks
- Create case studies
- A/B testing
- Location SEO (if needed)

**Expected Impact:** Sustained traffic growth, authority building

---

## Success Metrics

### Technical Metrics:
- SEO Score: 68 → 85+ (target)
- PageSpeed Score: [Current] → 90+ (target)
- Core Web Vitals: All "Good" range
- Schema errors: 0

### Traffic Metrics (6-month projection):
- Organic traffic: 100-200/mo → 1,000-2,000/mo
- Indexed pages: 1 → 10+
- Keyword rankings: 0 → 20-30 (first 3 pages)
- Backlinks: [Current] → 50+

### Conversion Metrics:
- Form submissions: [Baseline] → +40%
- Bounce rate: [Current] → <60%
- Time on site: [Current] → +25%

---

## Tools & Resources Needed

### Free Tools:
- Google Search Console
- Google Analytics
- PageSpeed Insights
- Schema Markup Validator
- Mobile-Friendly Test

### Development:
- react-helmet-async
- react-snap or Next.js migration
- Image optimization tools (Squoosh, ImageOptim)
- Video compression (HandBrake, FFmpeg)

### Optional Premium:
- Ahrefs / SEMrush ($99-199/mo)
- Screaming Frog Spider ($149/yr)
- Surfer SEO ($59+/mo)

---

## Questions & Support

If you need clarification on any action item:
1. Refer to FULL-AUDIT-REPORT.md for detailed explanations
2. Test implementations in development first
3. Monitor GSC for indexing issues after changes
4. Track Core Web Vitals with Vercel SpeedInsights

**Next Steps:**
1. Review this action plan
2. Start with Week 1 tasks (highest ROI)
3. Test all changes in development
4. Deploy and monitor in Google Search Console
5. Schedule follow-up audit in 60 days

---

**Last Updated:** May 13, 2026  
**Next Review:** After completing High Priority items
