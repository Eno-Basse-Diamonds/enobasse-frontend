import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProductsForAdmin } from "@/lib/api/products";
import { getCollectionsForAdmin } from "@/lib/api/collections";

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
    sortBy: "createdAt" as
      | "name"
      | "createdAt"
      | "updatedAt"
      | "category"
      | "price",
    sortOrder: "DESC" as "ASC" | "DESC",
    search: undefined,
    category: undefined,
  };

  await queryClient.prefetchQuery({
    queryKey: ["adminCollections", { page: 1, pageSize: 50 }],
    queryFn: () => getCollectionsForAdmin({ page: 1, pageSize: 50 }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["adminProducts", filterOptions],
    queryFn: () => getProductsForAdmin(filterOptions),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
