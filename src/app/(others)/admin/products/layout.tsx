import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCollectionsForAdmin } from "@/lib/api/collections";
import { getProductsForAdmin } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Admin Products Management",
};

interface AdminProductsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminProductsLayout({
  children,
}: AdminProductsLayoutProps) {
  const queryClient = new QueryClient();

  const filterOptions = {
    page: 1,
    pageSize: 21,
    sortBy: "updatedAt" as "name" | "createdAt" | "updatedAt" | "price",
    sortOrder: "DESC" as "ASC" | "DESC",
  };

  await Promise.all([
    await queryClient.prefetchQuery({
      queryKey: ["adminCollections", { page: 1, pageSize: 100 }],
      queryFn: () => getCollectionsForAdmin({ page: 1, pageSize: 100 }),
    }),
    await queryClient.prefetchQuery({
      queryKey: ["adminProducts", filterOptions],
      queryFn: () => getProductsForAdmin(filterOptions),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
