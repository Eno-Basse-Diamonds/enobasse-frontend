"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types/blog-post";
import { ImageIcon } from "lucide-react";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";
import { blurDataURL } from "@/lib/utils/constants";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-primary text-primary-500 mb-6">
        Related Blogs
      </h2>
      <div className="grid gap-6 grid-cols-1">
        {posts.map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

const RelatedPostCard = ({ post }: { post: BlogPost }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="flex flex-col sm:flex-row gap-4 transition-colors">
        <div className="relative aspect-video sm:aspect-square sm:h-32 sm:w-56 flex-shrink-0 overflow-hidden">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 224px, 224px"
              className="object-cover transition-transform duration-300 group-hover:scale-105 bg-gray-100"
              onError={() => setImageError(true)}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          )}
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="text-lg font-medium text-primary-500 group-hover:text-secondary-500 transition-colors font-primary">
              {post.title}
            </h3>
            <p className="mt-1 text-sm text-primary-400 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <time
              dateTime={new Date(post.createdAt).toISOString()}
              className="text-sm font-medium text-primary-200"
            >
              {dateToOrdinalDayMonthYear(post.createdAt)}
            </time>
            <span className="text-xs font-medium text-secondary-500">
              {post.readingTime} mins
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
