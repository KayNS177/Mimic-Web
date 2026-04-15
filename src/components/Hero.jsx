import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useHlsVideo } from '@/hooks/useHlsVideo.js';

const ROTATING_WORDS = ['Deserves', 'Demands', 'Craves', 'Needs', 'Loves'];

const VIDEO_SRC =
  'https://stream.mux.com/rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy.m3u8';
const PIN_PX = 800;

export default function Hero() {
  const videoRef = useHlsVideo(VIDEO_SRC);

  const words = useMemo(() => ROTATING_WORDS, []);
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearTimeout(id);
  }, [wordIndex, words]);

  return (
    <section
      id="home"
      className="relative"
      style={{ height: `calc(100vh + ${PIN_PX}px)` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            disablePictureInPicture
            className="w-full h-full object-cover block"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[28%] pointer-events-none"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 85%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 85%)',
            }}
          />
        </div>

        <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

        <div
          className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
          style={{
            height: 240,
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)',
          }}
        />

        <div
          className="relative z-10 h-full flex flex-col items-center px-6"
          style={{ paddingTop: 150 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="liquid-glass rounded-full px-4 py-1 flex items-center gap-2"
          >
            <span className="text-xs md:text-sm text-white/90 font-body">
              Custom Web Design that Converts.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-center text-foreground max-w-4xl"
          >
            <span className="block whitespace-nowrap text-4xl md:text-5xl lg:text-6xl font-brand font-bold tracking-[-0.03em] leading-[1]">
              The Website Your Brand
            </span>
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-2 text-6xl md:text-7xl lg:text-[6rem] font-heading italic leading-[0.9]">
              &nbsp;
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  className="absolute font-heading italic"
                  initial={{ opacity: 0, y: -100 }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  animate={
                    wordIndex === i
                      ? { y: 0, opacity: 1 }
                      : { y: wordIndex > i ? -150 : 150, opacity: 0 }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="mt-6 max-w-md text-center text-sm md:text-base text-white font-body font-light leading-tight"
          >
            Stunning web design. Blazing fast performance. Built by experts, every pixel refined.
            This is modern web design, wildly reimagined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            className="mt-8 flex items-center justify-center"
          >
            <a
              href="#quote"
              className="liquid-glass-strong inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base md:text-lg font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              Get Started
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
