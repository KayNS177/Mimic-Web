import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * BrowserRouter doesn't reset scroll on navigation. Jump to the top on every
 * path change — unless the URL carries a hash, in which case anchor scrolling
 * should win. Also nudges Lenis (if active) so the smooth-scroll position stays
 * in sync with the native one.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}
