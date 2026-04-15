import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

/**
 * Attach an HLS stream to a <video> element with a native-fallback.
 * Returns a ref to pass to the <video>.
 */
export function useHlsVideo(src) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return undefined;

    let hls;

    const canPlayNatively = video.canPlayType('application/vnd.apple.mpegurl');

    if (canPlayNatively) {
      video.src = src;
    } else if (Hls.isSupported()) {
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

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    video.addEventListener('loadedmetadata', play);
    play();

    return () => {
      video.removeEventListener('loadedmetadata', play);
      if (hls) hls.destroy();
    };
  }, [src]);

  return ref;
}
