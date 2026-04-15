import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';
import VideoBackdrop from './VideoBackdrop.jsx';

const HLS = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

export default function StartSection() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden"
      style={{ minHeight: 500 }}
    >
      <VideoBackdrop src={HLS} fadeHeight={200} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-64 md:pt-80 pb-40 md:pb-48">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
          How It Works
        </span>

        <BlurText
          as="h2"
          text="You dream it. We ship it."
          animateBy="words"
          delay={120}
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-white/60 font-body font-light text-sm md:text-base"
        >
          Share your vision. Our web design and development team manages everything,
          from design, code, launch. Professional websites delivered in days, not months.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8"
        >
          <a
            href="#quote"
            className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
          >
            Get Started
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
