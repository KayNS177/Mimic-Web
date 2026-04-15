import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';

const CARDS = [
  {
    quote:
      "They shipped a site so beautiful our investors assumed we'd raised another round. Two weeks, start to finish.",
    name: 'Maya Okafor',
    role: 'CEO, Finlytic',
  },
  {
    quote:
      'Our conversion rate nearly tripled after launch. The team treated every section like a hero section.',
    name: 'Daniel Reyes',
    role: 'Head of Growth, Wealth',
  },
  {
    quote:
      'Working with Mimic.Studio felt less like an agency engagement and more like hiring a design co-founder.',
    name: 'Priya Nair',
    role: 'Founder, Orbit Labs',
  },
];

export default function Testimonials() {
  return (
    <section id="work" className="relative w-full px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Testimonials
          </span>
          <BlurText
            as="h2"
            text="Loved by the teams we partner with."
            animateBy="words"
            delay={100}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.figure
              key={card.name}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col gap-6"
            >
              <blockquote className="text-lg md:text-xl font-heading italic text-white leading-snug">
                “{card.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="liquid-glass-strong rounded-full w-9 h-9 flex items-center justify-center text-sm font-heading italic text-white">
                  {card.name.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-body font-medium text-white">
                    {card.name}
                  </span>
                  <span className="text-xs font-body font-light text-white/60">
                    {card.role}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
