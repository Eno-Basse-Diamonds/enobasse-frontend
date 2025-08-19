import { cache } from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { getCollectionWithProducts } from "@/lib/api/collections";
import { getPreferredCurrency } from "@/lib/api/account";
import { authOptions } from "@/lib/config/auth";

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
  const session = await getServerSession(authOptions);
  const preferredCurrency = await getPreferredCurrency(session?.user?.email);
  const { collection } = await getCollectionWithProducts(slug, {
    currency: preferredCurrency,
  });

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
  const session = await getServerSession(authOptions);
  const preferredCurrency = await getPreferredCurrency(session?.user?.email);
  const options = { currency: preferredCurrency };

  await queryClient.prefetchQuery({
    queryKey: ["collection", slug, options],
    queryFn: () => getCollectionWithProducts(slug, options),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
