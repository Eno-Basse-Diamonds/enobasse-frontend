import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { getPreferredCurrency } from "@/modules/account/api";
import { getCollectionWithProducts } from "@/modules/collections/api";
import { logger } from "@/shared/utils/logger";

const DEFAULT_CURRENCY = "USD";

async function resolvePreferredCurrency(email: string | null | undefined): Promise<string> {
  if (!email) return DEFAULT_CURRENCY;
  try {
    return await getPreferredCurrency(email);
  } catch (error) {
    logger.error("Failed to fetch preferred currency", error);
    return DEFAULT_CURRENCY;
  }
}

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
  const session = await getServerSession();
  const preferredCurrency = await resolvePreferredCurrency(session?.user?.email);
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
      title: `${collection.name} - Eno Bassé Diamonds`,
      description: collection.description,
      images: [`${collection.image.url}`],
    },
  };
};

export default async function CollectionLayout({ params, children }: CollectionLayoutProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const session = await getServerSession();
  const preferredCurrency = await resolvePreferredCurrency(session?.user?.email);
  const options = { currency: preferredCurrency };

  await queryClient.prefetchQuery({
    queryKey: ["collection", slug, options],
    queryFn: () => getCollectionWithProducts(slug, options),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
