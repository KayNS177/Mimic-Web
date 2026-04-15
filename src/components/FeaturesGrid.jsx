import { BarChart3, Palette, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';

const CARDS = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    body: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy.",
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    body: 'Every detail considered. Every element refined. Design so precise, it feels inevitable.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    body: 'Layouts informed by data. Decisions backed by performance. Results you can measure.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    body: 'Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.',
  },
];

const STATS = [
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '10–14 days', label: 'Average delivery' },
];

export default function FeaturesGrid() {
  return (
    <section
      id="why-us"
      className="relative w-full h-full px-6 py-16 md:py-20 flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Why Us
          </span>
          <BlurText
            as="h2"
            text="The difference is everything."
            animateBy="words"
            delay={100}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="liquid-glass rounded-2xl p-5 flex flex-col gap-3"
              >
                <span className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg md:text-xl font-heading italic text-white leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                  {card.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8 }}
          className="liquid-glass mt-8 rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 text-center place-items-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-heading italic text-white leading-none">
                  {stat.value}
                </span>
                <span className="mt-2 text-white/60 font-body font-light text-xs md:text-sm">
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
