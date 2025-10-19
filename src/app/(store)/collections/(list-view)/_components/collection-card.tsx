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
      className="group flex flex-col h-full"
    >
      <div className="relative w-full h-40 sm:h-48 md:h-60 lg:h-80 overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 z-10" />
        <Image
          src={
            imageError
              ? "https://res.cloudinary.com/enobasse/image/upload/v1756512499/collection-fallback_syzbce.png"
              : collection.image.url
          }
          alt={collection.image.alt}
          title={collection.image.alt}
          width={500}
          height={500}
          className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-105"
          quality={100}
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          onError={() => setImageError(true)}
          decoding="async"
        />
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          {collection.name}
        </h3>
        <p className="mt-auto text-sm text-gray-500">
          {collection.productCount}{" "}
          {collection.productCount === 1 ? "item" : "items"}
        </p>
      </div>
    </Link>
  );
}
