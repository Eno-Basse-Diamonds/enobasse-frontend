"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Collection } from "@/lib/types/collections";

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group collections-page__card"
    >
      <div className="collections-page__card-image-container">
        <Image
          src={
            imageError
              ? "/images/collections/collection-fallback.png"
              : collection.image.url
          }
          alt={collection.image.alt}
          title={collection.image.alt}
          width={500}
          height={500}
          className="collections-page__card-image"
          quality={100}
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          onError={() => setImageError(true)}
          decoding="async"
        />
      </div>
      <div className="collections-page__card-content">
        <h3 className="collections-page__card-title">{collection.name}</h3>
        <p className="collections-page__card-count">
          {collection.productCount}{" "}
          {collection.productCount === 1 ? "item" : "items"}
        </p>
      </div>
    </Link>
  );
}
