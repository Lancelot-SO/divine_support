import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({
  title,
  description,
  keywords,
  path = '',
  ogType = 'website',
  ogImage = '/fav.png',
  schema
}) {
  const siteName = 'Divine Support Services';
  const siteUrl = 'https://divinesupportservicesinc.org'; // Default canonical base URL
  const canonicalUrl = `${siteUrl}${path}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'We provide more than staffing, we provide peace of mind. Divine Support Services Maryland offers residential, nursing, habilitation, and employment support.';
  const metaDescription = description || defaultDescription;
  
  // Format keywords
  let metaKeywords = '';
  if (Array.isArray(keywords)) {
    metaKeywords = keywords.join(', ');
  } else if (typeof keywords === 'string') {
    metaKeywords = keywords;
  } else {
    metaKeywords = 'divine support, support services maryland, residential care, nursing support, supported living, respite care, community support, developmental disability services';
  }

  // Handle absolute path for OG image
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Schema Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  path: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  schema: PropTypes.object
};
