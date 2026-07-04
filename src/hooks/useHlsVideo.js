import { useEffect, useRef } from 'react';

/**
 * Attach an HLS stream to a <video> element with a native-fallback.
 * Returns a ref to pass to the <video>.
 *
 * hls.js (~560 KB) is imported dynamically so it never ships in the initial
 * bundle — it loads only when a non-native-HLS browser actually needs it.
 */
export function useHlsVideo(src) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return undefined;

    let hls;
    let cancelled = false;

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    video.addEventListener('loadedmetadata', play);

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      play();
    } else {
      import('hls.js')
        .then(({ default: Hls }) => {
          if (cancelled || !ref.current) return;
          if (Hls.isSupported()) {
            hls = new Hls({
              maxBufferLength: 20,
              capLevelToPlayerSize: true,
              enableWorker: true,
            });
            hls.loadSource(src);
            hls.attachMedia(video);
          } else {
            video.src = src;
          }
          play();
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', play);
      if (hls) hls.destroy();
    };
  }, [src]);

  return ref;
}
