# Studio — Luxury Web Design Agency Landing Page

A dark, premium, single-page landing for a web design agency.
Stack: **React + Vite + Tailwind CSS + Framer Motion (motion/react) + hls.js + lucide-react + react-router-dom**.

## Prerequisites

Node.js 18+ and npm. If you don't have it, grab the LTS from https://nodejs.org.

## Install & run

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

### Build for production

```bash
npm run build
npm run preview
```

## Assets

- `public/frames/ezgif-frame-001.jpg` … `ezgif-frame-151.jpg` — hero scroll-driven frame animation (151 frames, 1920×1080). Preloaded and drawn to a canvas that scrubs with scroll position.
- `public/images/hero_bg.jpeg` — hero poster (copied from frame 001).
- `src/assets/logo-icon.svg` — logo.
- `src/assets/feature-1.gif`, `feature-2.gif` — downloaded from motionsites.ai.
- HLS video backdrops streamed directly from Mux (no download).

## Notable design pieces

- **Liquid glass** utilities (`.liquid-glass`, `.liquid-glass-strong`) in `src/index.css` — uses a `::before` layer with `mask-composite: exclude` to paint a thin gradient border that fades in the middle. Primary surface uses `backdrop-filter: blur(4px)`, strong surfaces use `blur(50px)`.
- **Hero scroll animation** (`src/components/Hero.jsx`) — preloads 151 JPGs, renders to a canvas, maps `window.scrollY` against the hero container's bounding rect to pick a frame.
- **BlurText** (`src/components/BlurText.jsx`) — word/letter stagger with a 3-step `blur(10px) → blur(5px) → blur(0)` dissolve. Triggered via `IntersectionObserver` so animations play as each section enters the viewport.
- **HLS video** (`src/hooks/useHlsVideo.js`) — uses `hls.js` everywhere, falls back to native HLS on Safari.

## Project structure

```
index.html
vite.config.js
tailwind.config.js
postcss.config.js
src/
├─ main.jsx
├─ App.jsx
├─ index.css
├─ hooks/useHlsVideo.js
├─ lib/utils.js
├─ assets/{logo-icon.svg, feature-1.gif, feature-2.gif}
└─ components/
   ├─ Navbar.jsx
   ├─ Hero.jsx
   ├─ BlurText.jsx
   ├─ VideoBackdrop.jsx
   ├─ StartSection.jsx
   ├─ FeaturesChess.jsx
   ├─ FeaturesGrid.jsx
   ├─ Stats.jsx
   ├─ Testimonials.jsx
   └─ CtaFooter.jsx
public/
├─ images/hero_bg.jpeg
└─ frames/ezgif-frame-001.jpg … 151.jpg
```
