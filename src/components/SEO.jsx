import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://amaltasuniversity.in";
export const SITE_NAME = "Amaltas University";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images%20of%20university/our%20purpose/university.png`;

/**
 * Per-page <head> tags: title, meta description, canonical, Open Graph,
 * Twitter Card, and optional JSON-LD structured data. The site is a
 * client-rendered SPA (no SSR/prerendering), so these tags are set on
 * mount via react-helmet-async — sufficient for Googlebot (which renders
 * JS) but a prerender/SSR step is still recommended for other crawlers
 * and for fastest indexing (see SEO roadmap).
 */
export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
  keywords,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} · Where Healing Grows`;
  const canonical = `${SITE_URL}${path}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@AmaltasDewas" />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
