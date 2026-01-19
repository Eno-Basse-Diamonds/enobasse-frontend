import React from "react";
import { Product } from "@/lib/types/products";

interface ProductSchemaProps {
  product: Product;
}

export const ProductSchema = ({ product }: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description,
    sku: typeof product.id === "string" ? product.id : undefined,
    mpn: typeof product.id === "string" ? product.id : undefined,
    brand: {
      "@type": "Brand",
      name: "Enobasse",
    },
    offers: {
      "@type": "AggregateOffer",
      url: `https://enobasse.com/product/${product.slug}`,
      priceCurrency: product.priceRange.currency,
      lowPrice: product.priceRange.min,
      highPrice: product.priceRange.max,
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
    },
    aggregateRating:
      product.reviews && product.reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: (
              product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
              product.reviews.length
            ).toFixed(1),
            reviewCount: product.reviews.length,
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
