/**
 * WebSite structured data (JSON-LD).
 *
 * @description Generates schema.org WebSite markup with the site name and URL.
 * A basic structured data snippet for SEO.
 *
 * @returns A JSON-LD script tag for WebSite.
 */
export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eno Bassé Diamonds",
    url: "https://enobasse.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
