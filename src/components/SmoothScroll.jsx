import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onAnchorClick = (e) => {
      // Handle both in-page (#id) and homepage-section (/#id) links.
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      if (hash === '#') return;
      let target;
      try {
        target = document.querySelector(hash);
      } catch {
        return;
      }
      // Target not on this page (e.g. a /#section link from /blog) — let the
      // browser navigate to the homepage and scroll there natively.
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    };

    document.addEventListener('click', onAnchorClick);

    // Honor an incoming hash (e.g. arriving at /#process from the blog). The
    // browser's native jump happens before the loading screen and late media
    // settle the layout, so re-scroll once everything has loaded.
    let hashTimer;
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      let target;
      try {
        target = document.querySelector(hash);
      } catch {
        return;
      }
      if (target) lenis.scrollTo(target, { offset: -72, duration: 1.0 });
    };
    const onLoad = () => {
      hashTimer = setTimeout(scrollToHash, 350);
    };
    if (window.location.hash && window.location.hash.length > 1) {
      if (document.readyState === 'complete') {
        onLoad();
      } else {
        window.addEventListener('load', onLoad, { once: true });
      }
    }

    return () => {
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('load', onLoad);
      clearTimeout(hashTimer);
      cancelAnimationFrame(rafId);
      if (window.__lenis === lenis) delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
