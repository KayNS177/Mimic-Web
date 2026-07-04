import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const LINKS = ['Home', 'Process', 'Services', 'Solutions', 'FAQ'];

export default function Navbar({ theme = 'dark' }) {
  const light = theme === 'light';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const c = {
    scrim: light ? 'bg-[rgba(245,243,238,0.72)]' : 'bg-black/50',
    logo: light ? 'text-ink-strong' : 'text-white',
    pill: light ? 'bg-paper-raised border border-paper-border' : 'liquid-glass',
    link: light
      ? 'text-ink-body hover:text-ink-strong'
      : 'text-foreground/90 hover:text-white',
    cta: light ? 'bg-ink-strong text-white' : 'bg-white text-black',
    iconBtn: light
      ? 'bg-paper-raised border border-paper-border text-ink-strong'
      : 'liquid-glass text-white',
    panel: light ? 'bg-paper-raised border border-paper-border' : 'liquid-glass',
    mobileLink: light ? 'text-ink-body' : 'text-white/90',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-3">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 backdrop-blur-sm transition-opacity duration-700 ease-out ${c.scrim} ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="flex items-center">
          <span className={`text-xl font-brand font-bold tracking-tight ${c.logo}`}>
            Mimic.Studio
          </span>
        </a>

        <div className="hidden md:flex items-center">
          <div className={`flex items-center rounded-full px-1.5 py-1 ${c.pill}`}>
            {LINKS.map((link) => (
              <a
                key={link}
                href={`/#${link.toLowerCase()}`}
                className={`px-3 py-2 text-sm font-medium font-body transition-colors ${c.link}`}
              >
                {link}
              </a>
            ))}
            <a
              href="/blog"
              className={`px-3 py-2 text-sm font-medium font-body transition-colors ${c.link}`}
            >
              Blog
            </a>
            <a
              href="/about"
              className={`px-3 py-2 text-sm font-medium font-body transition-colors ${c.link}`}
            >
              About
            </a>
            <a
              href="/#quote"
              className={`ml-1 inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-transform duration-300 ease-out hover:scale-[1.03] ${c.cta}`}
            >
              Build your Website Now
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden rounded-full h-10 w-10 flex items-center justify-center overflow-hidden ${c.iconBtn}`}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{
              opacity: 0,
              y: -8,
              filter: 'blur(6px)',
              backdropFilter: 'blur(0px) saturate(100%)',
              WebkitBackdropFilter: 'blur(0px) saturate(100%)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            }}
            exit={{
              opacity: 0,
              y: -8,
              filter: 'blur(6px)',
              backdropFilter: 'blur(0px) saturate(100%)',
              WebkitBackdropFilter: 'blur(0px) saturate(100%)',
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`md:hidden mt-3 mx-auto max-w-7xl rounded-3xl p-4 overflow-hidden ${c.panel}`}
          >
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                hidden: { transition: { staggerChildren: 0, when: 'afterChildren' } },
              }}
            >
              {LINKS.map((link) => (
                <motion.li
                  key={link}
                  variants={{
                    hidden: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
                    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
                  }}
                >
                  <a
                    href={`/#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-3 text-sm font-body ${c.mobileLink}`}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
                  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
                }}
              >
                <a
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 text-sm font-body ${c.mobileLink}`}
                >
                  Blog
                </a>
              </motion.li>
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
                  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
                }}
              >
                <a
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 text-sm font-body ${c.mobileLink}`}
                >
                  About
                </a>
              </motion.li>
              <motion.li
                className="mt-2"
                variants={{
                  hidden: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
                  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
                }}
              >
                <a
                  href="/#quote"
                  onClick={() => setOpen(false)}
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium ${c.cta}`}
                >
                  Build your Website Now
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
