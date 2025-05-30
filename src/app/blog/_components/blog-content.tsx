"use client";

import { Suspense } from "react";
import { usePublishedBlogPosts } from "@/lib/hooks/use-blog";
import { BlogSection, SectionContainer, Pagination } from "@/components";
import { BlogSectionSkeletonLoader } from "@/components/loader";

interface BlogContentProps {
  page: number;
}

export function BlogContent({ page }: BlogContentProps) {
  const currentPage = page || 1;
  const { data, isLoading } = usePublishedBlogPosts(currentPage);
  const { posts, totalPages } = data || { posts: [], totalPages: 1 };

  if (isLoading) {
    return <BlogSectionSkeletonLoader />;
  }

  return (
    <>
      <SectionContainer
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        className="blog-page__posts-container"
      >
        <h2 id="blog-posts-heading" className="sr-only">
          Blog Posts
        </h2>
        <BlogSection posts={posts} />
      </SectionContainer>
      <div aria-label="Blog pagination" className="blog-page__pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={(page) => `/blog?page=${page}`}
        />
      </div>
    </>
  );
}
