import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import BlurText from './BlurText.jsx';
import Particles from './Particles.jsx';

// module-level so the reference stays stable across renders
const PARTICLE_COLORS = ['#ffffff'];

const STEPS = [
  { title: 'Discovery Call', body: 'Understanding your vision, goals, and audience.' },
  { title: 'Design Phase', body: 'Creating stunning, brand-aligned designs.' },
  { title: 'Development', body: 'Building with modern, performant code.' },
  { title: 'Testing', body: 'Ensuring a flawless cross-device experience.' },
  { title: 'Launch', body: 'Deploying with monitoring and analytics.' },
  { title: 'Support', body: 'Ongoing optimization and improvements.' },
];

const STEP_ANGLE = 32; // degrees between steps on the dial
// scroll progress window in which the wheel turns
const TURN_START = 0.12;
const TURN_END = 0.92;

export default function StartSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [radius, setRadius] = useState(430);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setRadius(w < 768 ? Math.max(300, w * 0.55) : Math.min(720, w * 0.38));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const rotate = useTransform(
    scrollYProgress,
    [TURN_START, TURN_END],
    [0, -(STEPS.length - 1) * STEP_ANGLE],
    { clamp: true },
  );
  const smoothRotate = useSpring(rotate, { stiffness: 170, damping: 26, mass: 0.5 });

  // snap the scroll position to the nearest step once scrolling pauses
  const snapTimer = useRef(null);
  useEffect(() => () => clearTimeout(snapTimer.current), []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const t = Math.min(1, Math.max(0, (v - TURN_START) / (TURN_END - TURN_START)));
    const idx = Math.min(STEPS.length - 1, Math.round(t * (STEPS.length - 1)));
    setActive(idx);

    clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      const cur = scrollYProgress.get();
      if (cur < TURN_START || cur > TURN_END) return; // entering or leaving — don't yank back
      const stepT = Math.round(((cur - TURN_START) / (TURN_END - TURN_START)) * (STEPS.length - 1));
      const target = TURN_START + (stepT / (STEPS.length - 1)) * (TURN_END - TURN_START);
      if (Math.abs(target - cur) < 0.003) return; // already in place
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = window.scrollY + el.getBoundingClientRect().top;
      const dest = sectionTop + target * (el.offsetHeight - window.innerHeight);
      if (window.__lenis) {
        window.__lenis.scrollTo(dest, {
          duration: 0.5,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        window.scrollTo({ top: dest, behavior: 'smooth' });
      }
    }, 90);
  });

  // minor ticks between step markers, extended slightly past both ends
  const ticks = [];
  for (let i = -6; i <= (STEPS.length - 1) * 4 + 6; i += 1) {
    ticks.push(i);
  }

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full mt-24 md:mt-32"
      style={{ height: `${100 + (STEPS.length - 1) * 55}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
          }}
        >
          <Particles
            particleCount={820}
            particleSpread={10}
            speed={0.2}
            particleColors={PARTICLE_COLORS}
            moveParticlesOnHover
            particleHoverFactor={0.15}
            alphaParticles={false}
            particleBaseSize={50}
            sizeRandomness={1}
            cameraDistance={21}
            disableRotation
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center text-center px-6 pt-24 md:pt-28">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            How It Works
          </span>

          <BlurText
            as="h2"
            text="You dream it. We ship it."
            animateBy="words"
            delay={120}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-xl text-white/60 font-body font-light text-sm md:text-base"
          >
            Share your vision. Our web design and software team manages everything,
            from design and code to launch — custom-built around your business, so
            your life is easier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-7"
          >
            <a
              href="#quote"
              className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Active step copy — all steps stay in the DOM, only the active one is visible */}
          <div
            className="relative mt-auto w-full max-w-xl h-36"
            style={{ marginBottom: radius * 0.35 + 70 }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : active > i ? -14 : 14,
                  filter: active === i ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-start gap-2"
                style={{ pointerEvents: active === i ? 'auto' : 'none' }}
              >
                <span className="text-sm font-body uppercase tracking-[0.25em] text-white/40">
                  Step {String(i + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
                </span>
                <h3 className="text-4xl md:text-5xl font-heading italic text-white leading-tight">
                  {step.title}
                </h3>
                <p className="text-white/60 font-body font-light text-base md:text-lg leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rotating dial — circle center sits below the viewport, top arc visible */}
        <div
          className="absolute left-1/2 z-10 pointer-events-none"
          style={{ bottom: -radius * 0.65, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        >
          {/* fixed marker at top center of the dial */}
          <div
            className="absolute left-0 top-0"
            style={{ transform: `translate(-50%, -50%) translateY(-${radius}px)` }}
          >
            <span className="block h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </div>

          <motion.div className="absolute left-0 top-0" style={{ rotate: smoothRotate }}>
            {/* dial ring */}
            <div
              className="absolute rounded-full border border-white/15"
              style={{
                width: radius * 2,
                height: radius * 2,
                left: -radius,
                top: -radius,
              }}
            />
            {/* minor ticks */}
            {ticks.map((t) => {
              const angle = (t * STEP_ANGLE) / 4;
              const isMajor = t % 4 === 0 && t >= 0 && t <= (STEPS.length - 1) * 4;
              return (
                <span
                  key={t}
                  className={`absolute left-0 top-0 block rounded-full ${
                    isMajor ? 'h-2 w-2 bg-white/80' : 'h-1 w-1 bg-white/30'
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                  }}
                />
              );
            })}
            {/* step labels along the arc */}
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="absolute left-0 top-0"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * STEP_ANGLE}deg) translateY(-${radius + 42}px)`,
                }}
              >
                <span
                  className={`block whitespace-nowrap font-heading italic transition-all duration-500 ${
                    active === i
                      ? 'text-white text-xl md:text-3xl'
                      : 'text-white/35 text-lg md:text-2xl'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
