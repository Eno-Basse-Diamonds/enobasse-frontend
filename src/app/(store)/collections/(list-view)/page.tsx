"use client";

import { PageHeading, SectionContainer } from "@/components";
import { CollectionListLoader } from "@/components/loaders";
import { CollectionCard } from "./_components/collection-card";
import { useCollections } from "@/lib/hooks/use-collections";

export default function CollectionsPage() {
  const { data, isLoading } = useCollections();
  const collections = data || [];

  return (
    <main className="mt-12 mb-16 md:mb-24">
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
