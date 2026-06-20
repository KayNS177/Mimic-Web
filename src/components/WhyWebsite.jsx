import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from './BlurText.jsx';

const REASONS = [
  {
    num: '1',
    title: 'Proven Increase',
    body: [
      <>
        Businesses with a website experience a{' '}
        <strong className="font-semibold text-white">70% increase</strong> in
        customer engagement and a{' '}
        <strong className="font-semibold text-white">60% boost</strong> in sales
        compared to those without one.
      </>,
      <>
        That comes from opening up more avenues for potential customers to find
        you when they search for what you offer, then to effortlessly learn more
        and reach out.
      </>,
      <>
        It makes a website a no-brainer investment. Even a modest lift in new
        customers pays for itself many times over.
      </>,
    ],
  },
  {
    num: '2',
    title: 'Backend',
    body: [
      <>
        Most business owners still underestimate it, believing a website is only
        an online brochure and that they already have enough customers.
      </>,
      <>
        Yet they&rsquo;re still spending countless hours each week on manual tasks
        that can be easily automated &mdash; time that could go toward growth.
      </>,
      <>
        Things like{' '}
        <strong className="font-semibold text-white">
          automated invoicing and payments
        </strong>
        ,{' '}
        <strong className="font-semibold text-white">real-time reporting</strong>{' '}
        on your performance, and{' '}
        <strong className="font-semibold text-white">
          online booking and enquiries
        </strong>{' '}
        handled for you.
      </>,
      <>
        These tools come built into your site, so everything you need lives in one
        place.
      </>,
    ],
  },
  {
    num: '3',
    title: 'Credibility',
    body: [
      <>
        By letting customers learn about your business, see your work, and read
        real testimonials, your website shows that you&rsquo;re a{' '}
        <strong className="font-semibold text-white">
          legitimate and established business
        </strong>{' '}
        &mdash; making it easy for them to feel confident choosing you.
      </>,
    ],
  },
];

export default function WhyWebsite() {
  return (
    <section
      id="why-a-website"
      className="relative w-full h-full px-6 py-16 md:py-20 flex items-center"
    >
      <div className="mx-auto max-w-5xl w-full">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Why a Website
          </span>
          <BlurText
            as="h2"
            text="Why your business needs one."
            animateBy="words"
            delay={100}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-3xl"
          />
        </div>

        <div className="mt-12 flex flex-col gap-5">
          {REASONS.map((reason, i) => (
            <motion.article
              key={reason.num}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="liquid-glass rounded-3xl p-7 md:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl md:text-4xl font-heading italic text-white leading-none">
                  <span className="text-white/40">{reason.num} &mdash;</span>{' '}
                  {reason.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 shrink-0 text-white/50" />
              </div>

              <div className="mt-5 h-px w-full bg-white/10" />

              <div className="mt-6 flex flex-col gap-4 max-w-3xl">
                {reason.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
