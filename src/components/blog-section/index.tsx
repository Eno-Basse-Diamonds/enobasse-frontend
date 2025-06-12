"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { BlogPost } from "@/lib/types/blog-post";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";
import { Image as ImageIcon } from "lucide-react";
import "./styles.scss";

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = React.memo(({ posts }) => {
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts]);

  return (
    <ul className="blog-section" role="list">
      {sortedPosts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </ul>
  );
});

BlogSection.displayName = 'BlogSection';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = React.memo(({ post, index }) => {
  const [imageError, setImageError] = useState(false);

  const formattedDate = useMemo(() =>
    dateToOrdinalDayMonthYear(post.createdAt),
    [post.createdAt]
  );

  return (
    <motion.li
      role="listitem"
      className="blog-section__item"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/blog/${post.slug}`} className="blog-section__link">
        <figure className="blog-section__figure">
          {imageError ? (
            <div className="blog-section__image-fallback">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <Image
              src={post.image.src}
              alt={post.title}
              className="blog-section__image object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={100}
              priority={index < 3}
              onError={() => setImageError(true)}
            />
          )}
        </figure>
        <div className="blog-section__content">
          <h3 className="blog-section__title">{post.title}</h3>
          <p className="blog-section__excerpt">{post.excerpt}</p>
          <div className="blog-section__meta">
            <p className="blog-section__author">{post.author.name}</p>
            <span className="blog-section__divider">•</span>
            <time
              dateTime={new Date(post.createdAt).toISOString()}
              className="blog-section__date"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </motion.li>
  );
});

BlogCard.displayName = 'BlogCard';
