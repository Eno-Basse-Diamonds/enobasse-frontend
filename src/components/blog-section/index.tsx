"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { BlogPost } from "@/lib/types/blog-post";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";
import { Image as ImageIcon } from "lucide-react";
import { blurDataURL } from "@/lib/utils/constants/blur-data-url";

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = React.memo(
  ({ posts }) => {
    const sortedPosts = useMemo(() => {
      return [...posts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }, [posts]);

    return (
      <ul
        className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {sortedPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </ul>
    );
  }
);

BlogSection.displayName = "BlogSection";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = React.memo(({ post, index }) => {
  const [imageError, setImageError] = useState(false);

  const formattedDate = useMemo(
    () => dateToOrdinalDayMonthYear(post.createdAt),
    [post.createdAt]
  );

  return (
    <motion.li
      role="listitem"
      className="hover:shadow-md transition-shadow duration-300 border border-secondary-200 overflow-hidden"
      style={{ transformOrigin: "center" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/blog/${post.slug}`} className="h-full flex flex-col">
        <figure className="h-60 lg:h-72 flex-shrink-0 relative">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <Image
              src={post.image.src}
              alt={post.title}
              className="object-cover bg-gray-100"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
              priority={index < 3}
              placeholder="blur"
              blurDataURL={blurDataURL}
              onError={() => setImageError(true)}
            />
          )}
        </figure>
        <div className="bg-white p-4 sm:p-5 flex-grow flex flex-col">
          <h3 className="font-medium font-primary text-primary-500 text-base sm:text-lg md:text-xl mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="font-light text-sm sm:text-base md:text-[15px] text-neutral-300 mb-3 sm:mb-4 md:mb-5 flex-grow line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-x-2">
            <p className="font-light text-sm sm:text-base text-primary-300">
              {post.author.name}
            </p>
            <span className="text-primary-300">•</span>
            <time
              dateTime={new Date(post.createdAt).toISOString()}
              className="font-light text-sm sm:text-base text-primary-300"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </motion.li>
  );
});

BlogCard.displayName = "BlogCard";
