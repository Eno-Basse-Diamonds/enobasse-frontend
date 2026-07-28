import { memo } from "react";

import { BlogPost } from "@/modules/blog/types";

import { BlogPostCard } from "./BlogPostCard";

interface BlogPostListProps {
  blogPosts: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (slug: string) => void;
}

export const BlogPostList = memo(function BlogPostList({
  blogPosts,
  onEdit,
  onDelete,
}: BlogPostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
});
