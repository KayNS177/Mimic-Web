import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';
import VideoBackdrop from './VideoBackdrop.jsx';

const HLS = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

export default function CtaFooter() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ minHeight: 700 }}
    >
      <VideoBackdrop src={HLS} fadeHeight={200} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-40 md:pt-48 pb-12 flex flex-col items-center text-center">
        <BlurText
          as="h2"
          text="Your next website starts here."
          animateBy="words"
          delay={120}
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] max-w-3xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-xl text-white/70 font-body font-light text-sm md:text-base"
        >
          Book a free strategy call. See what AI-powered design can do. No
          commitment, no pressure. Just possibilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#book"
            className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
          >
            Book a Call
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-body font-medium transition-transform duration-300 ease-out hover:scale-[1.03]"
          >
            View Pricing
          </a>
        </motion.div>

        <footer className="w-full mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-xs font-body">
            © 2026 Mimic.Studio. All rights reserved.
          </span>
          <nav className="flex items-center gap-5">
            <a
              href="#privacy"
              className="text-white/40 hover:text-white/80 text-xs font-body transition-colors"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-white/40 hover:text-white/80 text-xs font-body transition-colors"
            >
              Terms
            </a>
            <a
              href="#contact"
              className="text-white/40 hover:text-white/80 text-xs font-body transition-colors"
            >
              Contact
            </a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
