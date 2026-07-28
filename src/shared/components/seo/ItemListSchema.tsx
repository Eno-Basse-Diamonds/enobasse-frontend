interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
}

interface ItemListSchemaProps {
  items: ItemListEntry[];
}

/**
 * ItemList structured data (JSON-LD).
 *
 * @description Generates schema.org ItemList markup for ordered lists of
 * items with name, URL, and optional image. Each item is assigned a position.
 *
 * @param items - Array of list entries with name, URL, and optional image.
 * @returns A JSON-LD script tag for ItemList.
 */
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
