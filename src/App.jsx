import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import StartSection from './components/StartSection.jsx';
import FeaturesChess from './components/FeaturesChess.jsx';
import FeaturesGrid from './components/FeaturesGrid.jsx';
import GetQuote from './components/GetQuote.jsx';
import Footer from './components/Footer.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

export default function App() {
  return (
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
  );
}
