import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Link2, Check } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SmoothScroll from '../components/SmoothScroll.jsx';
import PostCard from '../components/blog/PostCard.jsx';
import Cover from '../components/blog/Cover.jsx';
import { getPostBySlug, getRelatedPosts, formatDate } from '../content/posts.js';
import { renderMarkdown, extractHeadings } from '../lib/markdown.jsx';

const SITE = 'https://mimicstudio.co';

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] || '');
  useEffect(() => {
    if (!ids.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}

function ShareRow({ url, title }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const linkClass =
    'inline-flex items-center gap-1.5 rounded-full border border-paper-border bg-paper-raised px-4 py-2 text-sm font-body font-medium text-ink-body transition-colors hover:border-brandblue hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="eyebrow-ink">Share</span>
      <a
        className={linkClass}
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className={linkClass}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <button type="button" onClick={onCopy} className={linkClass}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
}

export default function BlogArticle() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const post = getPostBySlug(slug);
  const { scrollYProgress } = useScroll();

  const headings = useMemo(() => (post ? extractHeadings(post.body) : []), [post]);
  const body = useMemo(() => (post ? renderMarkdown(post.body) : null), [post]);
  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeId = useScrollSpy(headingIds);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const url = `${SITE}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug, 3);

  const headerAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Mimic.Studio',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Mimic.Studio`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta name="color-scheme" content="dark light" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <SmoothScroll />
      <Navbar theme="light" />

      {/* Reading progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-brandblue"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="bg-paper">
        {/* Article header (soft white) */}
        <article>
          <header className="relative px-6 pt-36 pb-10 md:pt-44 md:pb-12">
            <motion.div {...headerAnim} className="mx-auto max-w-3xl text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-body text-ink-muted transition-colors hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
                The Journal
              </Link>
              <div className="mt-6">
                <span className="eyebrow-ink">{post.category}</span>
              </div>
              <h1 className="mx-auto mt-4 max-w-3xl font-brand text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-ink-strong md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm font-body text-ink-muted">
                <span className="text-ink-strong">{post.author}</span>
                <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-brandblue" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readTime ? (
                  <>
                    <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-brandblue" />
                    <span>{post.readTime}</span>
                  </>
                ) : null}
              </div>
            </motion.div>
          </header>

          {/* Article body (soft white) */}
          <div className="bg-paper">
            <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-14">
              <div className="lg:grid lg:grid-cols-[1fr_16rem] lg:gap-12">
                <div className="article-prose mx-auto w-full max-w-[68ch]">
                  {body}
                </div>

                {/* Sticky table of contents (wide screens) */}
                {headings.length > 1 ? (
                  <aside className="hidden lg:block">
                    <nav
                      aria-label="On this page"
                      className="sticky top-28"
                    >
                      <p className="eyebrow-ink mb-4">On this page</p>
                      <ul className="space-y-2.5 border-l border-paper-border">
                        {headings.map((h) => (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={`-ml-px block border-l-2 pl-4 text-sm font-body transition-colors ${
                                activeId === h.id
                                  ? 'border-brandblue text-ink-strong'
                                  : 'border-transparent text-ink-muted hover:text-ink-strong'
                              }`}
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>
                ) : null}
              </div>

              {/* Post footer: author bio + share */}
              <div className="mx-auto mt-16 max-w-[68ch]">
                <div className="flex flex-col gap-6 rounded-xl border border-paper-border bg-paper-raised p-6 sm:flex-row sm:items-center">
                  <Cover slug={post.slug} className="h-16 w-16 shrink-0 overflow-hidden rounded-full" />
                  <div className="flex-1">
                    <p className="eyebrow-ink">Written by</p>
                    <p className="mt-1 font-brand text-lg font-semibold text-ink-strong">
                      {post.author}
                    </p>
                    <p className="mt-1 font-body text-sm text-ink-muted">
                      A B2B & B2C web design studio building fast, conversion-focused
                      websites and digital solutions.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <ShareRow url={url} title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Read next (soft white) */}
        {related.length > 0 ? (
          <section className="bg-paper">
            <div className="mx-auto max-w-6xl px-6 pb-20">
              <div className="mb-8 border-t border-paper-border pt-12">
                <h2 className="text-3xl md:text-4xl text-ink-strong">
                  <span className="font-brand font-bold tracking-tight">Read</span>{' '}
                  <span className="font-heading italic">next</span>
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <PostCard key={p.slug} post={p} index={i} />
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* CTA band (soft white) — loop readers back into the funnel */}
        <section className="bg-paper px-6 py-24 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl text-ink-strong">
            <span className="font-brand font-bold tracking-[-0.03em]">
              Ready to build
            </span>{' '}
            <span className="font-heading italic">yours?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body font-light text-ink-muted">
            Let's turn your business problem into a website that solves it.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/#quote"
              className="inline-flex items-center gap-2.5 rounded-full bg-ink-strong px-8 py-4 text-base md:text-lg font-body font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              Build your Website Now
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        <Footer theme="light" />
      </main>
    </>
  );
}
