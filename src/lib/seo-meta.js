/**
 * Single source of truth for per-route SEO metadata.
 *
 * Pure JS (no JSX, no browser APIs) so it runs in both the client bundle (via the
 * <Seo> component) and the Node prerender script. Returns plain objects; the
 * consumers decide how to render them (Helmet tags vs. static HTML strings).
 *
 * jsonLd may be a single object or an array (multiple JSON-LD nodes) — both
 * consumers JSON.stringify it as-is.
 */

const SITE = 'https://mimicstudio.co';
const ORG = 'Mimic.Studio';
const DEFAULT_IMAGE = `${SITE}/og-image.jpg`;
const IMG_W = 1200;
const IMG_H = 630;

const HOME_DESC =
  'B2B & B2C custom websites and software, tailored to your business and fully managed — built to convert. We handle everything. Get a free quote today.';
const HOME_OG_DESC =
  'B2B & B2C custom websites and software, tailored to your business and fully managed. Built to convert, with the technical work handled for you.';
const HOME_TITLE = 'Mimic.Studio | B2B & B2C Websites & Custom Software';

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function image(url) {
  return { image: url, imageWidth: IMG_W, imageHeight: IMG_H };
}

export function homeMeta() {
  // No title here — index.html keeps its static <title>. These re-affirm the
  // data-rh tags so react-helmet-async doesn't strip them on the client.
  return {
    description: HOME_DESC,
    canonical: `${SITE}/`,
    og: { type: 'website', title: HOME_TITLE, description: HOME_OG_DESC, url: `${SITE}/`, ...image(DEFAULT_IMAGE) },
    twitter: {
      title: HOME_TITLE,
      description:
        'B2B & B2C custom websites and software, tailored to your business and fully managed.',
      image: DEFAULT_IMAGE,
    },
  };
}

export function blogIndexMeta(posts = []) {
  const title = 'Web Design & Software Blog | Mimic.Studio';
  const description =
    'Web design and custom software tips for B2B and B2C brands: high-converting websites, conversion, SEO, and tailored digital solutions from Mimic.Studio.';
  const url = `${SITE}/blog`;
  return {
    title,
    description,
    canonical: url,
    colorScheme: 'dark light',
    og: {
      type: 'website',
      title: 'Web Design & Software Blog | Mimic.Studio',
      description:
        'Practical tips on web design, custom software, conversion, and SEO for high-converting B2B and B2C businesses.',
      url,
      ...image(DEFAULT_IMAGE),
    },
    twitter: { title: 'Web Design Blog | Mimic.Studio', description, image: DEFAULT_IMAGE },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': url,
        name: 'Mimic.Studio Blog',
        url,
        description,
        publisher: { '@type': 'Organization', name: ORG, url: SITE },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url },
      ]),
    ],
  };
}

export function articleMeta(post) {
  const url = `${SITE}/blog/${post.slug}`;
  const ogImage = `${SITE}/og/${post.slug}.png`;
  const author = post.author || { name: ORG, url: `${SITE}/about`, role: '' };
  return {
    title: `${post.title} | ${ORG}`,
    description: post.excerpt,
    canonical: url,
    colorScheme: 'dark light',
    og: { type: 'article', title: post.title, description: post.excerpt, url, ...image(ogImage) },
    twitter: { title: post.title, description: post.excerpt, image: ogImage },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: ogImage,
        author: {
          '@type': 'Person',
          name: author.name,
          url: author.url,
          ...(author.role ? { jobTitle: author.role } : {}),
        },
        publisher: {
          '@type': 'Organization',
          name: ORG,
          logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Blog', url: `${SITE}/blog` },
        { name: post.title, url },
      ]),
    ],
  };
}

export function aboutMeta() {
  const title = `About ${ORG} | B2B & B2C Web Design Studio`;
  const description =
    'Meet Mimic.Studio — a B2B & B2C web design studio building fast, high-converting, SEO-optimized websites. Our approach, process, and the team behind the work.';
  const url = `${SITE}/about`;
  return {
    title,
    description,
    canonical: url,
    colorScheme: 'dark light',
    og: { type: 'website', title, description, url, ...image(DEFAULT_IMAGE) },
    twitter: { title, description, image: DEFAULT_IMAGE },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: title,
        url,
        mainEntity: {
          '@type': 'Organization',
          name: ORG,
          url: SITE,
          logo: `${SITE}/logo.png`,
          description:
            'B2B and B2C website design agency creating high-converting, SEO-optimized websites.',
        },
      },
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'About', url },
      ]),
    ],
  };
}
