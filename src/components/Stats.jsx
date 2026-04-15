import { motion } from 'motion/react';
import VideoBackdrop from './VideoBackdrop.jsx';

const HLS = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

const STATS = [
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '10–14 days', label: 'Average delivery' },
];

export default function Stats() {
  return (
    <section id="stats" className="relative w-full overflow-hidden py-28 md:py-36">
      <VideoBackdrop src={HLS} desaturate fadeHeight={200} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-3xl p-12 md:p-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center place-items-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-none">
                  {stat.value}
                </span>
                <span className="mt-3 text-white/60 font-body font-light text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
