import React from "react";
import { Product } from "@/lib/types/products";

interface CollectionSchemaProps {
  name: string;
  description?: string;
  products: Product[];
  url: string;
}

export const CollectionSchema = ({
  name,
  description,
  products,
  url,
}: CollectionSchemaProps) => {
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
        url: `https://enobasse.com/product/${product.slug}`,
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
