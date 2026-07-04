import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'motion/react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SmoothScroll from '../components/SmoothScroll.jsx';
import PostCard from '../components/blog/PostCard.jsx';
import { getAllPosts, getAllCategories } from '../content/posts.js';

const ALL = 'All';

export default function BlogIndex() {
  const reduce = useReducedMotion();
  const posts = getAllPosts();
  const categories = [ALL, ...getAllCategories()];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? posts : posts.filter((p) => p.category === active);
  const showFeatured = active === ALL && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const grid = showFeatured ? filtered.slice(1) : filtered;

  const heroAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <>
      <Helmet>
        <title>Web Design Blog | Mimic.Studio — Conversion, SEO & Performance</title>
        <meta
          name="description"
          content="Web design tips for B2B and B2C brands: high-converting homepages, Core Web Vitals, SEO-optimized websites, and fast, professional design from Mimic.Studio."
        />
        <link rel="canonical" href="https://mimicstudio.co/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web Design Blog | Mimic.Studio" />
        <meta
          property="og:description"
          content="Practical web design tips on conversion, SEO, Core Web Vitals, and building high-converting B2B and B2C websites."
        />
        <meta property="og:url" content="https://mimicstudio.co/blog" />
        <meta name="color-scheme" content="dark light" />
      </Helmet>

      <SmoothScroll />
      <Navbar theme="light" />

      <main className="bg-paper">
        {/* Hero band (soft white) */}
        <section className="relative px-6 pt-36 pb-12 md:pt-44 md:pb-16">
          <motion.div {...heroAnim} className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-ink block">The Journal</span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl text-ink-strong">
              <span className="font-brand font-bold tracking-[-0.03em]">
                Field notes on
              </span>{' '}
              <span className="font-heading italic">building the web</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-body font-light text-ink-muted text-base md:text-lg leading-relaxed">
              Practical thinking on conversion, performance, and design — for B2B
              and B2C brands that want a website that works.
            </p>
          </motion.div>
        </section>

        {/* Content section (soft white) */}
        <section className="bg-paper">
          <div className="px-6 md:px-10 lg:px-16 pb-20 pt-4 md:pt-8">
            {/* Category filter */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = cat === active;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-4 py-1.5 text-sm font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                      isActive
                        ? 'border-transparent bg-brandblue text-white'
                        : 'border-paper-border bg-paper-raised text-ink-body hover:border-brandblue hover:text-ink-strong'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {featured ? (
              <div className="mb-12">
                <PostCard post={featured} featured />
              </div>
            ) : null}

            {grid.length > 0 ? (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {grid.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} />
                ))}
              </ul>
            ) : (
              <p className="py-16 text-center font-body text-ink-muted">
                No posts in this category yet — check back soon.
              </p>
            )}
          </div>
        </section>

        <Footer theme="light" />
      </main>
    </>
  );
}
