import Image from "next/image";
import { User, Calendar, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components";
import { BlogPost } from "@/lib/types/blog-post";
import { useState } from "react";

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (blog: BlogPost) => void;
  onDelete: (slug: string) => void;
}

export function BlogPostCard({ post, onEdit, onDelete }: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="blog-post-card">
      <div className="blog-post-card__image-container">
        {imageError ? (
          <div className="blog-post-card__image-fallback">
            <ImageIcon />
          </div>
        ) : (
          <Image
            src={post.image.src}
            alt={post.title}
            className="w-full h-full object-cover"
            height={100}
            width={100}
            quality={100}
            onError={() => setImageError(true)}
          />
        )}
        <div
          className={`blog-post-card__status ${
            post.isPublished
              ? "blog-post-card__status--published"
              : "blog-post-card__status--draft"
          }`}
        >
          {post.isPublished ? "Published" : "Draft"}
        </div>
      </div>
      <div className="blog-post-card__content">
        <div className="blog-post-card__body">
          <h3 className="blog-post-card__title">{post.title}</h3>
          <p className="blog-post-card__excerpt">{post.excerpt}</p>
        </div>
        <div className="mt-auto">
          <div className="blog-post-card__meta">
            <span className="blog-post-card__meta-item">
              <User />
              {post.author.name}
            </span>
            <span className="blog-post-card__meta-item">
              <Calendar />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="blog-post-card__actions">
            <Button
              leadingIcon={<Edit />}
              onClick={() => onEdit(post)}
              className="blog-post-card__button"
            >
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              leadingIcon={<Trash2 />}
              onClick={() => onDelete(post.slug)}
              className="blog-post-card__button"
            >
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
