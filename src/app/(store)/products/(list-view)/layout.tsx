import React, { cache } from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";

interface ProductsFilterOptions {
  page?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  minPrice?: number;
  maxPrice?: number;
  metals?: string[];
  gemstones?: string[];
}

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
  const queryClient = new QueryClient();

  const filterOptions: ProductsFilterOptions = {
    page: 1,
    sortBy: "featured",
    sortOrder: "DESC",
    metals: [],
    gemstones: [],
  };

  await queryClient.prefetchQuery({
    queryKey: ["products", filterOptions],
    queryFn: () => getProducts(filterOptions),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
