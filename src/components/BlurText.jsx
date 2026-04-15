import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';

/**
 * Word/letter-by-letter entrance animation.
 * Splits text, staggers each token, dissolves from a gaussian blur.
 *
 * Props:
 *   text            string to animate
 *   as              'h1' | 'h2' | 'p' | ...  (wrapper tag, default 'span')
 *   animateBy       'words' | 'letters'
 *   direction       'bottom' | 'top'
 *   delay           ms between tokens (default 200)
 *   duration        keyframe step duration (default 0.35)
 *   className       classes on outer wrapper
 *   threshold       IO threshold (default 0.15)
 *   rootMargin      IO rootMargin
 *   triggerOnce     bool (default true)
 *   onAnimationComplete  fires after the whole thing is done
 */
export default function BlurText({
  text = '',
  as: Tag = 'span',
  animateBy = 'words',
  direction = 'bottom',
  delay = 200,
  duration = 0.35,
  className = '',
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  triggerOnce = true,
  onAnimationComplete,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) io.disconnect();
          } else if (!triggerOnce) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  const tokens = useMemo(() => {
    if (animateBy === 'letters') return Array.from(text);
    return text.split(' ');
  }, [text, animateBy]);

  const from =
    direction === 'bottom'
      ? { filter: 'blur(12px)', opacity: 0, y: 24 }
      : { filter: 'blur(12px)', opacity: 0, y: -24 };

  const to = { filter: 'blur(0px)', opacity: 1, y: 0 };

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ display: 'inline' }}>
        {tokens.map((token, i) => {
          const isLast = i === tokens.length - 1;
          return (
            <motion.span
              key={`${token}-${i}`}
              style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
              initial={from}
              animate={inView ? to : from}
              transition={{
                duration: duration * 2,
                ease: [0.22, 1, 0.36, 1],
                delay: (i * delay) / 1000,
              }}
              onAnimationComplete={isLast ? onAnimationComplete : undefined}
            >
              {animateBy === 'letters' ? (token === ' ' ? '\u00A0' : token) : token}
              {animateBy === 'words' && !isLast ? '\u00A0' : null}
            </motion.span>
          );
        })}
      </span>
    </Tag>
  );
}
