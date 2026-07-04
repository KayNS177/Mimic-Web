import { ArrowUpRight, Briefcase, Check, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';

const AUDIENCES = [
  {
    icon: Briefcase,
    title: 'B2B Website Design',
    body: 'Websites built for longer sales cycles. Clear positioning, credibility from the first scroll, and lead-generation flows that turn decision-makers into booked calls.',
    points: ['Lead capture & demo booking', 'Authority-building content structure', 'CRM & analytics ready'],
  },
  {
    icon: ShoppingBag,
    title: 'B2C Website Design',
    body: 'Websites built for instant decisions. Mobile-first experiences that hold attention, build brand trust, and convert visitors into customers on the spot.',
    points: ['Conversion-focused journeys', 'Mobile-first experience', 'Brand-driven visual design'],
  },
];

const INCLUDED = [
  'Custom design tailored to your brand — no templates',
  'Custom software and integrations built around how you work',
  'SEO optimization with technical SEO and schema markup',
  'Analytics, hosting, launch, and ongoing support handled for you',
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative w-full h-full px-6 py-16 md:py-20 flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Who We Build For
          </span>
          <BlurText
            as="h2"
            text="Built for B2B and B2C."
            animateBy="words"
            delay={100}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-white/60 font-body font-light text-sm md:text-base"
          >
            Selling to businesses or straight to consumers — your website has a
            different job to do. We design for the way your customers actually buy.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {AUDIENCES.map((aud, i) => {
            const Icon = aud.icon;
            return (
              <motion.article
                key={aud.title}
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="liquid-glass rounded-3xl p-7 md:p-9 flex flex-col gap-4"
              >
                <span className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-2xl md:text-3xl font-heading italic text-white leading-tight">
                  {aud.title}
                </h3>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                  {aud.body}
                </p>
                <ul className="mt-1 flex flex-col gap-2.5">
                  {aud.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-white/70 font-body font-light leading-relaxed"
                    >
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="liquid-glass mt-5 rounded-3xl p-7 md:p-9"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:w-1/2">
              <span className="text-xs font-body uppercase tracking-[0.15em] text-white/40">
                Every project includes
              </span>
              <ul className="mt-4 flex flex-col gap-2.5">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-white/70 font-body font-light leading-relaxed"
                  >
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex flex-col items-start md:items-center gap-4">
              <p className="text-white/60 font-body font-light text-sm leading-relaxed md:text-center max-w-sm">
                Every project is scoped to your goals with a clear quote before
                we start. No hidden fees, no surprises.
              </p>
              <a
                href="#quote"
                className="liquid-glass-strong inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
              >
                Get a free quote
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
