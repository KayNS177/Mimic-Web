import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LOGO = 'Mimic.Studio';
const LETTERS = Array.from(LOGO);
const N = LETTERS.length;
const TOTAL_PHASES = N * 2;
const STEP_MS = 110;
const HOLD_MS = 750;
const START_HOLD_MS = 450;

export default function LoadingScreen({ show }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!show) return undefined;
    let delay = STEP_MS;
    if (phase === 0) delay = START_HOLD_MS;
    else if (phase === N) delay = HOLD_MS;
    const id = setTimeout(() => {
      setPhase((p) => (p + 1) % TOTAL_PHASES);
    }, delay);
    return () => clearTimeout(id);
  }, [show, phase]);

  useEffect(() => {
    if (!show) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          aria-label="Loading"
          role="status"
        >
          <span className="sr-only">Loading Mimic.Studio</span>
          <span
            aria-hidden="true"
            className="inline-flex text-3xl md:text-5xl font-brand font-bold tracking-tight text-white"
          >
            {LETTERS.map((ch, i) => {
              const visible = phase > i && phase < TOTAL_PHASES - i;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: visible ? 1 : 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
