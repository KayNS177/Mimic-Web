import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import StartSection from './components/StartSection.jsx';
import FeaturesChess from './components/FeaturesChess.jsx';
import FeaturesGrid from './components/FeaturesGrid.jsx';
import GetQuote from './components/GetQuote.jsx';
import Footer from './components/Footer.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const MIN_LOADER_MS = 2170;
const SAFETY_TIMEOUT_MS = 8000;

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_LOADER_MS - (performance.now() - start));
      setTimeout(() => setLoading(false), wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    const safety = setTimeout(finish, SAFETY_TIMEOUT_MS);

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(safety);
    };
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />
      <Analytics />
      <SpeedInsights />
      <div className="bg-black min-h-screen text-white">
        <SmoothScroll />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <div className="bg-black">
            <StartSection />
            <FeaturesChess />
            <FeaturesGrid />
            <GetQuote />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
