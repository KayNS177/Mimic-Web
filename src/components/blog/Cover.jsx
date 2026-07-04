/**
 * Generated cover art for posts that don't ship a coverImage.
 *
 * Renders an inline SVG — dark brand base with an electric-blue glow and a few
 * concentric rings — so the blog never depends on missing stock photography and
 * never 404s. Composition varies deterministically per post slug.
 */

function hashSlug(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

export default function Cover({ slug = '', className = '' }) {
  const h = hashSlug(slug || 'mimic');
  const cx = 22 + (h % 56); // 22–78 (%)
  const cy = 18 + ((h >> 3) % 50); // 18–68 (%)
  const rot = h % 360;
  const id = `cov-${slug || 'x'}`;
  const rings = [70, 120, 172, 226];

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 400 250"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c0c12" />
            <stop offset="100%" stopColor="#050507" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx={`${cx}%`} cy={`${cy}%`} r="70%">
            <stop offset="0%" stopColor="#2c43e8" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#141430" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#${id}-base)`} />
        <g transform={`rotate(${rot} ${cx * 4} ${cy * 2.5})`}>
          {rings.map((r) => (
            <circle
              key={r}
              cx={cx * 4}
              cy={cy * 2.5}
              r={r}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.06"
            />
          ))}
        </g>
        <rect width="400" height="250" fill={`url(#${id}-glow)`} />
      </svg>
    </div>
  );
}
