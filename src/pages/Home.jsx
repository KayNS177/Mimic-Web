import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import StartSection from '../components/StartSection.jsx';
import WhyWebsite from '../components/WhyWebsite.jsx';
import FeaturesChess from '../components/FeaturesChess.jsx';
import FeaturesGrid from '../components/FeaturesGrid.jsx';
import Solutions from '../components/Solutions.jsx';
import Faq from '../components/Faq.jsx';
import GetQuote from '../components/GetQuote.jsx';
import Footer from '../components/Footer.jsx';
import SmoothScroll from '../components/SmoothScroll.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';

const MIN_LOADER_MS = 2170;
const SAFETY_TIMEOUT_MS = 8000;

export default function Home() {
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
      <Helmet>
        <meta
          name="description"
          content="B2B & B2C website design agency creating high-converting, SEO-optimized websites. Custom responsive design, blazing performance, and conversion-focused results. Get a free quote today."
        />
        <link rel="canonical" href="https://mimicstudio.co/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mimicstudio.co/" />
        <meta property="og:title" content="Mimic.Studio | B2B & B2C Website Design Agency" />
        <meta
          property="og:description"
          content="B2B & B2C website design agency creating high-converting, SEO-optimized websites. Custom responsive design, blazing performance, and conversion-focused results."
        />
        <meta name="twitter:title" content="Mimic.Studio | B2B & B2C Website Design Agency" />
        <meta
          name="twitter:description"
          content="B2B & B2C website design agency creating high-converting, SEO-optimized websites."
        />
      </Helmet>
      <LoadingScreen show={loading} />
      <div className="bg-black min-h-screen text-white">
        <SmoothScroll />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <div className="bg-black">
            <StartSection />
            <WhyWebsite />
            <FeaturesChess />
            <FeaturesGrid />
            <Solutions />
            <Faq />
            <GetQuote />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
