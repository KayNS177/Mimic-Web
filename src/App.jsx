import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Home stays in the main bundle (highest-traffic page, fastest first paint).
// Blog + About are split into their own chunks so their code never ships on the homepage.
const BlogIndex = lazy(() => import('./pages/BlogIndex.jsx'));
const BlogArticle = lazy(() => import('./pages/BlogArticle.jsx'));
const About = lazy(() => import('./pages/About.jsx'));

// Minimal paper-coloured fallback so a route chunk loading doesn't flash white
// over the prerendered content.
const Fallback = <div className="min-h-screen bg-paper" />;

export default function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blog"
          element={<Suspense fallback={Fallback}><BlogIndex /></Suspense>}
        />
        <Route
          path="/blog/:slug"
          element={<Suspense fallback={Fallback}><BlogArticle /></Suspense>}
        />
        <Route
          path="/about"
          element={<Suspense fallback={Fallback}><About /></Suspense>}
        />
      </Routes>
    </>
  );
}
