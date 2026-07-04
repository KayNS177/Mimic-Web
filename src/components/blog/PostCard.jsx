import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Cover from './Cover.jsx';
import { formatDate } from '../../content/posts.js';

function CoverMedia({ post, className }) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt=""
        loading="lazy"
        className={`${className} object-cover`}
      />
    );
  }
  return <Cover slug={post.slug} className={className} />;
}

function Meta({ post }) {
  return (
    <div className="flex items-center gap-2 text-xs font-body text-ink-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.readTime ? (
        <>
          <span
            aria-hidden="true"
            className="inline-block h-1 w-1 rounded-full bg-brandblue"
          />
          <span>{post.readTime}</span>
        </>
      ) : null}
    </div>
  );
}

export default function PostCard({ post, index = 0, featured = false }) {
  const reduce = useReducedMotion();
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10% 0px' },
        transition: { duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] },
      };

  if (featured) {
    return (
      <motion.article {...anim}>
        <Link
          to={`/blog/${post.slug}`}
          className="group grid overflow-hidden rounded-xl border border-paper-border bg-paper-raised transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(23,22,15,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:grid-cols-2"
        >
          <CoverMedia post={post} className="h-56 w-full md:h-full" />
          <div className="flex flex-col gap-4 p-7 md:p-9">
            <div className="flex items-center gap-3">
              <span className="tag-pill">{post.category}</span>
              <span className="eyebrow-ink">Featured</span>
            </div>
            <h3 className="font-brand text-2xl font-bold leading-tight tracking-tight text-ink-strong transition-colors group-hover:text-brandblue md:text-3xl">
              {post.title}
            </h3>
            <p className="font-body text-ink-body leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <Meta post={post} />
              <span className="inline-flex items-center gap-1 text-sm font-body font-medium text-brandblue">
                Read
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.li {...anim} className="list-none">
      <Link
        to={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-paper-border bg-paper-raised transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(23,22,15,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <CoverMedia post={post} className="aspect-[4/5] w-full" />
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="tag-pill w-fit">{post.category}</span>
          <h3 className="font-brand text-lg font-semibold leading-snug tracking-tight text-ink-strong transition-colors group-hover:text-brandblue">
            {post.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-ink-muted">
            {post.excerpt}
          </p>
          <div className="mt-auto pt-2">
            <Meta post={post} />
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
