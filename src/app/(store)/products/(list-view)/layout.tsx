import React from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { getPreferredCurrency } from "@/lib/api/account";
import { ProductFilterOptions } from "@/lib/types/products";
import { getProducts } from "@/lib/api/products";
import { logger } from "@/lib/utils/logger";

export const revalidate = 3600;

const DEFAULT_CURRENCY = "USD";

export const metadata: Metadata = {
  title: "Products - Eno Bassé Diamonds",
  description:
    "Explore our exquisite collection of diamond jewellery, including rings, necklaces, earrings, and bracelets. Each piece is crafted with precision and care, showcasing the beauty of diamonds.",
  alternates: {
    canonical: `/products`,
  },
  openGraph: {
    title: "Products - Eno Bassé Diamonds",
    description:
      "Explore our exquisite collection of diamond jewellery, including rings, necklaces, earrings, and bracelets. Each piece is crafted with precision and care, showcasing the beauty of diamonds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Eno Bassé Diamonds",
    description:
      "Explore our exquisite collection of diamond jewellery, including rings, necklaces, earrings, and bracelets. Each piece is crafted with precision and care, showcasing the beauty of diamonds.",
  },
};

interface ProductListLayoutProps {
  children: React.ReactNode;
}

export default async function ProductListLayout({
  children,
}: ProductListLayoutProps) {
  const session = await getServerSession();

  let preferredCurrency = DEFAULT_CURRENCY;
  if (session?.user?.email) {
    try {
      preferredCurrency = await getPreferredCurrency(session.user.email);
    } catch (error) {
      logger.error("Failed to fetch preferred currency", error);
    }
  }

  const queryClient = new QueryClient();

  const filterOptions: ProductFilterOptions = {
    page: 1,
    pageSize: 36,
    sortBy: "featured",
    metals: [],
    gemstones: [],
    currency: preferredCurrency,
  };

  await queryClient.prefetchQuery({
    queryKey: ["products", filterOptions],
    queryFn: () => getProducts(filterOptions),
    staleTime: 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
