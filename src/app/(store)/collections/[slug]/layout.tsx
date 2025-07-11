import { cache } from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCollectionWithProducts } from "@/lib/api/collections";

const cachedGetCollection = cache(async (slug: string) => {
  return getCollectionWithProducts(slug);
});

interface CollectionLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const { collection } = await cachedGetCollection(slug);

  if (!collection) {
    return {
      title: "Collection not found - Eno Bassé Diamonds",
      description: "This collection does not exist.",
    };
  }

  return {
    title: `${collection.name} Collection - Eno Bassé Diamonds`,
    description: collection.description,
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
    openGraph: {
      title: `${collection.name} Collection - Eno Bassé Diamonds`,
      description: collection.description,
      images: [
        {
          url: `${collection.image.url}`,
          width: 1200,
          height: 630,
          alt: collection.image.alt || collection.name,
        },
      ],
    },
    twitter: {
      title: `${collection.name} - Eno Bassé Diamonds"`,
      description: collection.description,
      images: [`${collection.image.url}`],
    },
  };
};

export default async function CollectionLayout({
  children,
  params,
}: CollectionLayoutProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const collection = await cachedGetCollection(slug);

  await queryClient.prefetchQuery({
    queryKey: ["collection", slug],
    queryFn: () => collection,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
