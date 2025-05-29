import { BlogPost } from "@/lib/types/blog-post";
import { BlogPostCard } from "./blog-post-card";

interface BlogPostListProps {
  blogPosts: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (slug: string) => void;
}

export function BlogPostList({ blogPosts, onEdit, onDelete }: BlogPostListProps) {
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
}
