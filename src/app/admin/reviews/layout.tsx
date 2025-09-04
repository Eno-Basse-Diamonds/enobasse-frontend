import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getReviewsForAdmin } from "@/lib/api/reviews";

export const metadata: Metadata = {
  title: "Admin Reviews Management",
};

interface AdminReviewsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminReviewsLayout({
  children,
}: AdminReviewsLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reviewsForAdmin", { page: 1, perPage: 9 }],
    queryFn: () => getReviewsForAdmin({ page: 1, perPage: 9 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
