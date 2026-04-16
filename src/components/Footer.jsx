const LINK_GROUPS = [
  {
    title: 'Studio',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: 'https://wa.me/60174018136' },
    ],
  },
];

const SOCIALS = [
  { label: 'Instagram', href: '#instagram' },
  { label: 'Dribbble', href: '#dribbble' },
  { label: 'WhatsApp', href: 'https://wa.me/60174018136' },
];

export default function Footer() {
  return (
    <footer className="relative w-full px-6 pt-24 pb-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-8">
          <div className="flex flex-col gap-4 md:max-w-sm">
            <a href="#home" className="inline-flex items-center">
              <span className="text-2xl font-brand font-bold tracking-tight text-white">
                Mimic.Studio
              </span>
            </a>
            <p className="max-w-sm text-sm text-white/50 font-body font-light leading-relaxed">
              Luxury web design. Stunning visuals, blazing performance.
              Crafted with purpose. Defined by excellence. Optimized to convert.
            </p>
            <a
              href="#quote"
              className="mt-2 inline-flex w-fit items-center gap-2 liquid-glass rounded-full px-4 py-2 text-xs font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              Get a quote
            </a>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-36 md:ml-auto">
            {LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <span className="text-xs font-body uppercase tracking-[0.15em] text-white/40">
                  {group.title}
                </span>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-body text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <span className="text-xs font-body uppercase tracking-[0.15em] text-white/40">
                Social
              </span>
              <ul className="flex flex-col gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-sm font-body text-white/70 hover:text-white transition-colors"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-body text-white/40">
            © 2026 Mimic.Studio. All rights reserved.
          </span>
          <span className="text-xs font-body text-white/40">
            Crafted with purpose. Defined by excellence. Optimized to convert.
          </span>
        </div>
      </div>
    </footer>
  );
}
