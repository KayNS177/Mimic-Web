import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SmoothScroll from '../components/SmoothScroll.jsx';
import Seo from '../components/Seo.jsx';
import Cover from '../components/blog/Cover.jsx';
import { aboutMeta } from '../lib/seo-meta.js';
import { AUTHORS } from '../content/authors.js';

const VALUES = [
  {
    title: 'Custom-built for you',
    body: 'Websites and software shaped around your business and how you actually work — never a generic template.',
  },
  {
    title: 'We handle everything',
    body: 'From strategy to launch and beyond, we manage the whole build so you can focus on running your business.',
  },
  {
    title: 'No technical hassle',
    body: 'We take the complexity off your plate — no jargon, no headaches, just a solution that quietly works.',
  },
  {
    title: 'Ongoing support',
    body: 'We keep everything running and improving after launch, so you never have to worry about it.',
  },
];

const team = Object.values(AUTHORS);

export default function About() {
  return (
    <>
      <Seo meta={aboutMeta()} />
      <SmoothScroll />
      <Navbar theme="light" />

      <main className="bg-paper">
        {/* Hero band */}
        <section className="px-6 pt-36 pb-12 md:pt-44 md:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-ink block">About</span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl text-ink-strong">
              <span className="font-brand font-bold tracking-[-0.03em]">The studio behind</span>{' '}
              <span className="font-heading italic">your next website</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-body font-light text-ink-muted text-base md:text-lg leading-relaxed">
              Mimic.Studio is a B2B &amp; B2C studio building custom websites and
              software — tailored to your business and fully managed — for
              companies in Malaysia and worldwide.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="px-6 pb-16">
          <div className="article-prose mx-auto w-full max-w-[68ch]">
            <p>
              We started Mimic.Studio on a simple belief: a website should be your
              hardest-working salesperson, not an expensive online brochure. Too many
              businesses pay for beautiful sites that never convert — so we build the
              opposite.
            </p>
            <p>
              Our work combines conversion-focused design with custom software built
              around how you operate — from booking systems to dashboards and internal
              tools. We handle the whole thing end to end, so you get a solution
              tailored to your business without the technical headaches.
            </p>
            <p>
              Whether you sell to businesses or consumers, we design for how your
              customers actually buy — and we manage everything from the first call to
              ongoing support, so your life is easier.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 pb-16 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-paper-border bg-paper-raised p-6"
              >
                <h2 className="font-brand text-lg font-semibold text-ink-strong">{v.title}</h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl md:text-4xl text-ink-strong">
              <span className="font-brand font-bold tracking-tight">The</span>{' '}
              <span className="font-heading italic">team</span>
            </h2>
            <div className="flex flex-col gap-6">
              {team.map((person) => (
                <div
                  key={person.id}
                  className="flex flex-col gap-5 rounded-xl border border-paper-border bg-paper-raised p-6 sm:flex-row sm:items-center"
                >
                  <Cover slug={person.id} className="h-16 w-16 shrink-0 overflow-hidden rounded-full" />
                  <div className="flex-1">
                    <p className="font-brand text-lg font-semibold text-ink-strong">{person.name}</p>
                    <p className="font-body text-xs text-ink-muted">{person.role}</p>
                    <p className="mt-2 font-body text-sm text-ink-muted">{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper px-6 py-24 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl text-ink-strong">
            <span className="font-brand font-bold tracking-[-0.03em]">Let's build</span>{' '}
            <span className="font-heading italic">something great</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body font-light text-ink-muted">
            Tell us about your business problem — we'll design the website that solves it.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/#quote"
              className="inline-flex items-center gap-2.5 rounded-full bg-ink-strong px-8 py-4 text-base md:text-lg font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              Get a free quote
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        <Footer theme="light" />
      </main>
    </>
  );
}
