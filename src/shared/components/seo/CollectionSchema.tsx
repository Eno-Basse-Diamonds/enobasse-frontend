import { Product } from "@/modules/products/types";

interface CollectionSchemaProps {
  name: string;
  description?: string;
  products: Product[];
  url: string;
}

/**
 * CollectionPage structured data (JSON-LD).
 *
 * @description Generates schema.org CollectionPage markup with an embedded
 * ItemList of products, including their names, URLs, and positions.
 *
 * @param name - Name of the collection.
 * @param description - Optional collection description.
 * @param products - Array of products in the collection.
 * @param url - Canonical URL of the collection page.
 * @returns A JSON-LD script tag for CollectionPage.
 */
export const CollectionSchema = ({ name, description, products, url }: CollectionSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: name,
    description: description,
    url: url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://enobasse.com/products/${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
