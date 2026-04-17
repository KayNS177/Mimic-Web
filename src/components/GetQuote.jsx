import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import BlurText from './BlurText.jsx';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function GetQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          'from-name': form.name,
          'company-name': form.company,
          'customer-email': form.email,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY },
      );
      setSubmitted(true);
    } catch {
      setError(
        'Something went wrong sending your message. Please try again or email us directly.',
      );
    } finally {
      setSending(false);
    }
  };

  const fieldBase =
    'w-full rounded-xl bg-white/5 px-4 py-3 text-sm font-body text-white placeholder:text-white/40 outline-none transition-colors focus:bg-white/10';

  return (
    <section
      id="quote"
      className="relative w-full h-full px-6 py-12 md:py-16 flex items-center"
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="text-center flex flex-col items-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Get a Quote
          </span>
          <BlurText
            as="h2"
            text="Your new website starts here."
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
            Tell us about your project. We&apos;ll reply within one business day with
            a tailored quote and a 30-minute call. No commitment, no pressure.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="liquid-glass mt-14 rounded-3xl p-6 md:p-10"
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center py-12">
              <CheckCircle2 className="h-10 w-10 text-white mb-4" />
              <h3 className="text-2xl md:text-3xl font-heading italic text-white">
                Request received.
              </h3>
              <p className="mt-3 max-w-md text-white/60 font-body font-light text-sm md:text-base">
                Thanks, {form.name || 'friend'}. We&apos;ll be in touch at{' '}
                <span className="text-white/80">{form.email}</span> within one
                business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <label className="flex flex-col gap-2 md:col-span-1">
                <span className="text-xs font-body text-white/60">Your name</span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  className={fieldBase}
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-1">
                <span className="text-xs font-body text-white/60">Work email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@company.com"
                  className={fieldBase}
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-xs font-body text-white/60">Company</span>
                <input
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Company, Inc."
                  className={fieldBase}
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-xs font-body text-white/60">
                  Tell us about your project
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Goals, timeline, inspiration, current site..."
                  className={`${fieldBase} resize-none`}
                />
              </label>

              {error && (
                <div className="md:col-span-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-body text-red-200">
                  {error}
                </div>
              )}

              <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
                <span className="text-xs font-body text-white/40">
                  We reply within one business day. Your info stays with us.
                </span>
                <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                  <a
                    href="https://wa.me/60174018136"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03] md:min-w-[220px]"
                  >
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    type="submit"
                    disabled={sending}
                    className="liquid-glass-strong inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 md:min-w-[220px]"
                  >
                    {sending ? 'Sending...' : 'Book Free Strategy Call'}
                    {!sending && <ArrowUpRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
