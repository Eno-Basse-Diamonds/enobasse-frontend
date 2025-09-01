import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBlogPostsForAdmin } from "@/lib/api/blog-posts";

export const metadata: Metadata = {
  title: "Admin Blog Management",
};

interface AdminBlogLayoutProps {
  children: React.ReactNode;
}

export default async function AdminBlogLayout({
  children,
}: AdminBlogLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blogPostsForAdmin", { page: 1, perPage: 9 }],
    queryFn: () => getBlogPostsForAdmin({ page: 1, perPage: 9 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
