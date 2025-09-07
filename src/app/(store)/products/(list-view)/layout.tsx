import React from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
