import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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

  await queryClient.prefetchQuery({
    queryKey: ["adminProducts", { page: 1, pageSize: 12 }],
    queryFn: () => getProductsForAdmin({ page: 1, pageSize: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
