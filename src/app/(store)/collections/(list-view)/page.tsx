"use client";

import { SearchSlashIcon } from "lucide-react";

import { useCollections } from "@/modules/collections/hooks";
import { EmptyState } from "@/shared/components/EmptyState";
import { PageHeading } from "@/shared/components/PageHeading";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { CollectionListLoader } from "@/shared/components/loaders/Collections";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { ItemListSchema } from "@/shared/components/seo/ItemListSchema";

import { CollectionCard } from "./_components/CollectionCard";

export default function CollectionsPage() {
  const { data, isLoading, isError, error } = useCollections();
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
        className={isLoading ? "" : "grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3"}
      >
        <h2 id="collections-heading" className="sr-only">
          Collections
        </h2>
        {isLoading ? (
          <CollectionListLoader />
        ) : isError ? (
          <div className="col-span-full">
            <EmptyState
              title="Something went wrong"
              description={error?.message || "Failed to load collections. Please try again."}
              icon={<SearchSlashIcon />}
            />
          </div>
        ) : (
          collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))
        )}
      </SectionContainer>
    </main>
  );
}
