const LINK_GROUPS = [
  {
    title: 'Studio',
    links: [
      { label: 'Services', href: '/#services' },
      { label: 'Process', href: '/#process' },
      { label: 'Solutions', href: '/#solutions' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: 'https://wa.me/60174018136' },
      { label: 'Privacy', href: '/privacy.html' },
      { label: 'Terms', href: '/terms.html' },
    ],
  },
];

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/60174018136' },
];

export default function Footer({ theme = 'dark' }) {
  const light = theme === 'light';
  const c = {
    border: light ? 'border-paper-border' : 'border-white/10',
    logo: light ? 'text-ink-strong' : 'text-white',
    blurb: light ? 'text-ink-muted' : 'text-white/50',
    quote: light
      ? 'bg-paper-raised border border-paper-border text-ink-strong'
      : 'liquid-glass text-white',
    groupTitle: light ? 'text-ink-muted' : 'text-white/40',
    link: light
      ? 'text-ink-body hover:text-ink-strong'
      : 'text-white/70 hover:text-white',
    fine: light ? 'text-ink-muted' : 'text-white/40',
    fineLink: light
      ? 'text-ink-muted hover:text-ink-strong'
      : 'text-white/40 hover:text-white/80',
  };

  return (
    <footer className={`relative w-full px-6 pt-24 pb-10 border-t ${c.border}`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-8">
          <div className="flex flex-col gap-4 md:max-w-sm">
            <a href="/#home" className="inline-flex items-center">
              <span className={`text-2xl font-brand font-bold tracking-tight ${c.logo}`}>
                Mimic.Studio
              </span>
            </a>
            <p className={`max-w-sm text-sm font-body font-light leading-relaxed ${c.blurb}`}>
              B2B & B2C website design. Stunning visuals, blazing performance.
              Crafted with purpose. Defined by excellence. Optimized to convert.
            </p>
            <a
              href="/#quote"
              className={`mt-2 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-body font-medium transition-transform duration-300 ease-out hover:scale-[1.03] ${c.quote}`}
            >
              Get a quote
            </a>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-36 md:ml-auto">
            {LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <span className={`text-xs font-body uppercase tracking-[0.15em] ${c.groupTitle}`}>
                  {group.title}
                </span>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`text-sm font-body transition-colors ${c.link}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <span className={`text-xs font-body uppercase tracking-[0.15em] ${c.groupTitle}`}>
                Social
              </span>
              <ul className="flex flex-col gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className={`text-sm font-body transition-colors ${c.link}`}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`mt-16 pt-6 border-t ${c.border} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <span className={`text-xs font-body ${c.fine}`}>
            © 2026 Mimic.Studio. All rights reserved.
          </span>
          <nav className="flex items-center gap-5">
            <a href="/privacy.html" className={`text-xs font-body transition-colors ${c.fineLink}`}>
              Privacy
            </a>
            <a href="/terms.html" className={`text-xs font-body transition-colors ${c.fineLink}`}>
              Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
