"use client";

import { BlogSection } from "@/components/blog-section";
import { BlogSectionSkeletonLoader } from "@/components/loaders/blog";
import { usePublishedBlogPosts } from "@/lib/hooks/use-blog";

export function BlogContent() {
  const currentPage = 1;
  const perPage = 6;
  const { data, isLoading } = usePublishedBlogPosts(currentPage, perPage);
  const { posts } = data || { posts: [], totalPages: 1 };

  if (isLoading) {
    return (
      <div className="-mx-4 lg:-mx-8">
        <BlogSectionSkeletonLoader count={3} />
      </div>
    );
  }

  return <BlogSection layout="horizonatal" posts={posts} />;
}
