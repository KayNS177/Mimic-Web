import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';
import feature1 from '@/assets/feature-1.gif';
import feature2 from '@/assets/feature-2.gif';

const ROWS = [
  {
    id: 'convert',
    reverse: false,
    title: 'Designed to convert. Built to perform.',
    body: 'Every pixel is intentional. Our team combines expert web design with Google SEO optimization. Crafting sites that rank higher, perform faster, and convert more visitors.',
    cta: 'Learn more',
    gif: feature1,
  },
  {
    id: 'smart',
    reverse: true,
    title: 'Track everything. Improve constantly.',
    body: 'We configure Google Analytics and conversion tracking so nothing goes unmeasured. See exactly how visitors behave and use that data to grow.',
    cta: 'See how it works',
    gif: feature2,
  },
];

export default function FeaturesChess() {
  return (
    <section
      id="services"
      className="relative w-full h-full px-6 py-10 md:py-14 flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Capabilities
          </span>
          <BlurText
            as="h2"
            text="Pro features. Zero complexity."
            animateBy="words"
            delay={100}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />
        </div>

        <div className="mt-8 md:mt-10 flex flex-col gap-8 md:gap-10">
          {ROWS.map((row) => (
            <div
              key={row.id}
              className={`flex flex-col gap-6 md:gap-10 items-center ${
                row.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="md:w-1/2 flex flex-col items-start">
                <BlurText
                  as="h3"
                  text={row.title}
                  animateBy="words"
                  delay={80}
                  className="text-2xl md:text-3xl lg:text-4xl font-heading italic text-white tracking-tight leading-[0.95] max-w-md"
                />
                <motion.p
                  initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-3 max-w-md text-white/70 font-body font-light text-sm"
                >
                  {row.body}
                </motion.p>
                <motion.a
                  href="#quote"
                  initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="mt-4 liquid-glass-strong inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
                >
                  {row.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="md:w-1/2 w-full liquid-glass rounded-2xl overflow-hidden aspect-[16/10]"
              >
                <img
                  src={row.gif}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
