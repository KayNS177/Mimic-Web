import { useEffect, useRef } from 'react';

/**
 * Starry sky background, ported from the StarrySkyCSS reference.
 * Three oversized planes of repeating star tiles; each tile pulses
 * opacity on its own frequency, and the planes drift with the mouse
 * at different ratios for a parallax depth effect.
 */
const IMG = {
  tl: '/images/stars/topleft.png',
  tr: '/images/stars/topright.png',
  bl: '/images/stars/bottomleft.png',
  br: '/images/stars/bottomright.png',
};

// slows every tile's pulse cycle; 1 = reference speed
const SPEED_MULTIPLIER = 1;

// tile assignments mirror the reference markup (freq = duration s, delay s)
const PLANES = [
  {
    rotate: 0,
    ratio: 0.05,
    tiles: [
      { img: IMG.tl, dur: 7, delay: 1.33 },
      { img: IMG.tr, dur: 5, delay: 2.11 },
      { img: IMG.bl, dur: 9, delay: 1.33 },
      { img: IMG.br, dur: 5, delay: 0 },
    ],
  },
  {
    rotate: 217,
    ratio: 0.025,
    tiles: [
      { img: IMG.tl, dur: 9, delay: 1.33 },
      { img: IMG.tr, dur: 5, delay: 1.33 },
      { img: IMG.bl, dur: 6.33, delay: 2.11 },
      { img: IMG.br, dur: 10.17, delay: 2.11 },
    ],
  },
  {
    rotate: 71,
    ratio: 0.0167,
    tiles: [
      { img: IMG.tl, dur: 5, delay: 0 },
      { img: IMG.tr, dur: 9, delay: 0 },
      { img: IMG.bl, dur: 7, delay: 0 },
      { img: IMG.br, dur: 10.17, delay: 0 },
    ],
  },
];

export default function Starfield({ className = '' }) {
  const planeRefs = useRef([]);

  useEffect(() => {
    let raf = null;
    const apply = (x, y) => {
      PLANES.forEach((plane, i) => {
        const el = planeRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(${x * plane.ratio}px, ${y * plane.ratio}px) rotate(${plane.rotate}deg)`;
      });
    };
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        apply(e.clientX, e.clientY);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
      }}
    >
      {PLANES.map((plane, i) => (
        <div
          key={i}
          ref={(el) => {
            planeRefs.current[i] = el;
          }}
          className="star-plane"
          style={{ transform: `rotate(${plane.rotate}deg)` }}
        >
          {plane.tiles.map((tile, j) => (
            <div
              key={j}
              className="star-tile"
              style={{
                backgroundImage: `url(${tile.img})`,
                animationDuration: `${tile.dur * SPEED_MULTIPLIER}s`,
                // negative delay starts each tile mid-cycle so the sky isn't empty on load
                animationDelay: `${-(tile.delay * SPEED_MULTIPLIER + tile.dur)}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
