"use client";

import { useSearchParams } from "next/navigation";
import { SearchSlashIcon } from "lucide-react";
import { usePublishedBlogPosts } from "@/lib/hooks/use-blog";
import { BlogSection } from "@/components/blog-section";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { SectionContainer } from "@/components/section-container";
import { BlogSectionSkeletonLoader } from "@/components/loaders/blog";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError, error } = usePublishedBlogPosts(page);
  const { posts = [], totalPages = 1 } = data || {};

  if (isLoading) {
    return <BlogSectionSkeletonLoader />;
  }

  if (isError) {
    return (
      <SectionContainer id="blog-error" className="mt-8 md:mt-12">
        <EmptyState
          title="Something went wrong"
          description={error?.message || "Failed to load blog posts. Please try again."}
          icon={<SearchSlashIcon />}
        />
      </SectionContainer>
    );
  }

  return (
    <>
      <SectionContainer
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        className="mt-8 md:mt-12 lg:mt-16"
      >
        <h2 id="blog-posts-heading" className="sr-only">
          Blog Posts
        </h2>
        <BlogSection posts={posts} />
      </SectionContainer>
      <div
        aria-label="Blog pagination"
        className="mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6"
      >
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hrefBuilder={(page) => `/blog?page=${page}`}
        />
      </div>
    </>
  );
}
