interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList structured data (JSON-LD).
 *
 * @description Generates schema.org BreadcrumbList markup from an ordered array
 * of breadcrumb items with name and URL. Renders as a script tag.
 *
 * @param items - Ordered breadcrumb segments with name and item URL.
 * @returns A JSON-LD script tag for BreadcrumbList.
 */
export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
