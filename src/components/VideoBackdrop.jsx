import { useHlsVideo } from '@/hooks/useHlsVideo.js';

/**
 * Full-bleed HLS video backdrop with top/bottom black gradient fades.
 */
export default function VideoBackdrop({
  src,
  desaturate = false,
  fadeHeight = 200,
  className = '',
}) {
  const videoRef = useHlsVideo(src);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={desaturate ? { filter: 'saturate(0)' } : undefined}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{
          height: fadeHeight,
          background: 'linear-gradient(to bottom, #000, transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: fadeHeight,
          background: 'linear-gradient(to top, #000, transparent)',
        }}
      />
    </div>
  );
}
