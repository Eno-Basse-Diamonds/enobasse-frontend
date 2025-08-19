"use client";

import { PageHeading, SectionContainer } from "@/components";
import { CollectionListLoader } from "@/components/loaders";
import { CollectionCard } from "./_components/collection-card";
import { useCollections } from "@/lib/hooks/use-collections";
import "./styles.scss";

export default function CollectionsPage() {
  const { data, isLoading } = useCollections();
  const collections = data || [];

  return (
    <main className="collections-page">
      <PageHeading title="Collections" />
      <SectionContainer
        id="collections"
        aria-labelledby="collections-heading"
        className={isLoading ? "" : "collections-page__grid"}
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
