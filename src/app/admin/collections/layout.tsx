import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCollectionsForAdmin } from "@/lib/api/collections";

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

  await queryClient.prefetchQuery({
    queryKey: ["adminCollections", { page: 1, pageSize: 12 }],
    queryFn: () => getCollectionsForAdmin({ page: 1, pageSize: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
