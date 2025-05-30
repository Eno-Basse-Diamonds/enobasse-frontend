import { BlogPost } from "@/lib/types/blog-post";
import { BlogPostCard } from "./blog-post-card";
import { memo } from "react";

interface BlogPostListProps {
  blogPosts: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (slug: string) => void;
}

export const BlogPostList = memo(function BlogPostList({ blogPosts, onEdit, onDelete }: BlogPostListProps) {
  return (
    <div className="blog-post-list">
      {blogPosts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});
