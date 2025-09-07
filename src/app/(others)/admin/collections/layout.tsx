import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  AdminCollectionsFilterOptions,
  getCollectionsForAdmin,
} from "@/lib/api/collections";

export const metadata: Metadata = {
  title: "Admin Collections Management",
};

interface AdminCollectionsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminCollectionsLayout({
  children,
}: AdminCollectionsLayoutProps) {
  const queryClient = new QueryClient();

  const filterOptions: AdminCollectionsFilterOptions = {
    page: 1,
    pageSize: 12,
    sortBy: "createdAt",
    sortOrder: "DESC",
  };

  await queryClient.prefetchQuery({
    queryKey: ["adminCollections", filterOptions],
    queryFn: () => getCollectionsForAdmin(filterOptions),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
