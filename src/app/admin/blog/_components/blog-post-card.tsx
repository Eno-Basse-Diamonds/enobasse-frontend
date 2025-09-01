import Image from "next/image";
import { User, Calendar, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components";
import { BlogPost } from "@/lib/types/blog-post";
import { useState, memo } from "react";

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (blog: BlogPost) => void;
  onDelete: (slug: string) => void;
}

export const BlogPostCard = memo(function BlogPostCard({
  post,
  onEdit,
  onDelete,
}: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white shadow overflow-hidden hover:shadow-md transition-all duration-300 border border-primary-500/10 flex flex-col h-full">
      <div className="h-48 bg-primary-500/10 relative overflow-hidden">
        {post.image?.src && !imageError ? (
          <Image
            src={post.image.src}
            alt={post.image.alt || post.title}
            fill
            className="object-cover"
            sizes="50vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold ${
            post.isPublished
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
          }`}
        >
          {post.isPublished ? "Published" : "Draft"}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-bold font-primary text-lg mb-2 text-primary-500 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-primary-300 text-sm mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-primary-300 mb-6">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author.name  || "No author"}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex space-x-3 w-full">
            <Button
              leadingIcon={<Edit />}
              onClick={() => onEdit(post)}
              className="w-full"
            >
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              leadingIcon={<Trash2 />}
              onClick={() => onDelete(post.slug)}
              className="w-full"
            >
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
