"use client";

import { usePublishedBlogPosts } from "@/modules/blog/hooks";
import { BlogSection } from "@/shared/components/BlogSection";
import { BlogSectionSkeletonLoader } from "@/shared/components/loaders/Blog";

export function BlogContent() {
  const currentPage = 1;
  const perPage = 6;
  const { data, isLoading } = usePublishedBlogPosts(currentPage, perPage);
  const { posts } = data || { posts: [], totalPages: 1 };

  if (isLoading && !posts.length) {
    return null;
  }

  return <BlogSection layout="horizontal-scroll" posts={posts} />;
}
