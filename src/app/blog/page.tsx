import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPublishedBlogPosts } from "@/lib/api/blog-posts";
import { PageHeading } from "@/components";
import { BlogContent } from "./_components/blog-content";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Our Blog",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["publishedBlogPosts", page],
    queryFn: () => getPublishedBlogPosts(page),
  });

  return (
    <main className="blog-page">
      <PageHeading title="Our Blog" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogContent page={page} />
      </HydrationBoundary>
    </main>
  );
}
