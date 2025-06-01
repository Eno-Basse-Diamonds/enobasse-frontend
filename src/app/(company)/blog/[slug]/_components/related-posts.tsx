"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from '@/lib/types/blog-post';
import { ImageIcon } from "lucide-react";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <div className={"blog-detail__related"}>
      <h2 className="blog-detail__related-title">Related Blogs</h2>
      <div className="blog-detail__related-grid">
        {posts.map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const RelatedPostCard = ({ post }: { post: BlogPost }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="blog-detail__related-item group">
        <div className="blog-detail__related-item-image">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              title={post.image.alt}
              width={320}
              height={240}
              quality={80}
              className="blog-detail__related-item-image-content"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="blog-detail__related-item-content">
          <div>
            <h3 className="blog-detail__related-item-title">
              {post.title}
            </h3>
            <p className="blog-detail__related-item-excerpt">
              {post.excerpt}
            </p>
          </div>
          <div className="blog-detail__related-item-meta">
            <time
              dateTime={new Date(post.createdAt).toISOString()}
              className="blog-detail__related-item-date"
            >
              {dateToOrdinalDayMonthYear(post.createdAt)}
            </time>
            <span className="blog-detail__related-item-time">
              {post.readingTime} mins
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
