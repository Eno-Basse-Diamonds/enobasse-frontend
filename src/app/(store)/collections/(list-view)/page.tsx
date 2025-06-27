"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHeading, SectionContainer } from "@/components";
import { CollectionListLoader } from "@/components/loaders";
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
        className="collections-page__grid"
      >
        <h2 id="collections-heading" className="sr-only">
          Collections
        </h2>
        {isLoading ? (
          <CollectionListLoader />
        ) : (
          collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group collections-page__card"
            >
              <div className="collections-page__card-image-container">
                <Image
                  src={collection.image.url}
                  alt={collection.image.alt}
                  title={collection.image.alt}
                  width={500}
                  height={500}
                  className="collections-page__card-image"
                  priority={false}
                  quality={100}
                />
              </div>
              <div className="collections-page__card-content">
                <h3 className="collections-page__card-title">
                  {collection.name}
                </h3>
                <p className="collections-page__card-count">
                  {collection.productCount}{" "}
                  {collection.productCount === 1 ? "item" : "items"}
                </p>
              </div>
            </Link>
          ))
        )}
      </SectionContainer>
    </main>
  );
}
