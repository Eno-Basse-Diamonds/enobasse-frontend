import React from "react";

interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
}

interface ItemListSchemaProps {
  items: ItemListEntry[];
}

export const ItemListSchema = ({ items }: ItemListSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      image: item.image,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
