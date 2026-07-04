import { Helmet } from 'react-helmet-async';

/**
 * Renders a meta object from lib/seo-meta.js into Helmet tags. The same meta
 * object is serialized to static HTML by the prerender script, so client and
 * crawler <head>s stay identical.
 */
export default function Seo({ meta }) {
  if (!meta) return null;
  return (
    <Helmet>
      {meta.title ? <title>{meta.title}</title> : null}
      {meta.description ? <meta name="description" content={meta.description} /> : null}
      {meta.canonical ? <link rel="canonical" href={meta.canonical} /> : null}
      {meta.colorScheme ? <meta name="color-scheme" content={meta.colorScheme} /> : null}

      {meta.og?.type ? <meta property="og:type" content={meta.og.type} /> : null}
      {meta.og?.title ? <meta property="og:title" content={meta.og.title} /> : null}
      {meta.og?.description ? (
        <meta property="og:description" content={meta.og.description} />
      ) : null}
      {meta.og?.url ? <meta property="og:url" content={meta.og.url} /> : null}
      {meta.og?.image ? <meta property="og:image" content={meta.og.image} /> : null}
      {meta.og?.imageWidth ? (
        <meta property="og:image:width" content={String(meta.og.imageWidth)} />
      ) : null}
      {meta.og?.imageHeight ? (
        <meta property="og:image:height" content={String(meta.og.imageHeight)} />
      ) : null}

      {meta.twitter?.title ? <meta name="twitter:title" content={meta.twitter.title} /> : null}
      {meta.twitter?.description ? (
        <meta name="twitter:description" content={meta.twitter.description} />
      ) : null}
      {meta.twitter?.image ? <meta name="twitter:image" content={meta.twitter.image} /> : null}

      {meta.jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(meta.jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
