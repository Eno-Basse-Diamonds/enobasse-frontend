"use client";

import { BlogSection } from "@/shared/components/BlogSection";
import { usePublishedBlogPosts } from "@/modules/blog/hooks";
import { BlogSectionSkeletonLoader } from "@/shared/components/loaders/Blog";

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

  return <BlogSection layout="horizontal-scroll" posts={posts} />;
}
