"use client";

import { CollectionListLoader } from "@/components/loaders/collections";
import { PageHeading } from "@/components/page-heading";
import { SectionContainer } from "@/components/section-container";
import { CollectionCard } from "./_components/collection-card";
import { useCollections } from "@/lib/hooks/use-collections";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ItemListSchema } from "@/components/seo/ItemListSchema";

export default function CollectionsPage() {
  const { data, isLoading } = useCollections();
  const collections = data || [];

  return (
    <main className="mt-12 mb-16 md:mb-24">
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://enobasse.com" },
          { name: "Collections", item: "https://enobasse.com/collections" },
        ]}
      />
      {collections.length > 0 && (
        <ItemListSchema
          items={collections.map((collection) => ({
            name: collection.name,
            url: `https://enobasse.com/collections/${collection.slug}`,
            image: collection.image?.url,
          }))}
        />
      )}
      <PageHeading title="Collections" />
      <SectionContainer
        id="collections"
        aria-labelledby="collections-heading"
        className={
          isLoading ? "" : "grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3"
        }
      >
        <h2 id="collections-heading" className="sr-only">
          Collections
        </h2>
        {isLoading ? (
          <CollectionListLoader />
        ) : (
          collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))
        )}
      </SectionContainer>
    </main>
  );
}
