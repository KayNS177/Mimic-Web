import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';

const FAQS = [
  {
    q: 'What do you need from me to get started?',
    a: 'Just your goals and any brand assets you already have. We start with a free discovery call to understand your vision, then handle design, development, and launch end to end.',
  },
  {
    q: 'Do you build custom software, or just websites?',
    a: 'Both. We build custom websites and tailored software or tools — booking systems, dashboards, internal tools — designed around how your business actually works.',
  },
  {
    q: 'Will my website be mobile-friendly?',
    a: 'Yes, every website is fully responsive and optimized for all devices with mobile-first design.',
  },
  {
    q: 'Do you provide SEO services?',
    a: 'Yes, SEO optimization is integrated into every project including technical SEO, on-page optimization, and schema markup.',
  },
  {
    q: 'Can I update the website myself?',
    a: 'Yes, we can integrate CMS solutions and provide training. Technical updates are available through support packages.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes, we provide maintenance, security updates, performance monitoring, and content updates through monthly support packages.',
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative w-full h-full px-6 py-16 md:py-20 flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            FAQ
          </span>
          <BlurText
            as="h2"
            text="Questions, answered."
            animateBy="words"
            delay={100}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {FAQS.map((faq, i) => (
            <motion.article
              key={faq.q}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="liquid-glass rounded-2xl p-6 flex flex-col gap-3"
            >
              <h3 className="text-lg md:text-xl font-heading italic text-white leading-tight">
                {faq.q}
              </h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                {faq.a}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
