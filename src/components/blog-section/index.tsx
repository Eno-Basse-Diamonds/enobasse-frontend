import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Post } from "@/lib/data/blog-posts";
import "./styles.scss";

interface BlogSectionProps {
  posts: Post[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <ul className="blog-section" role="list">
      {posts.map((post, index) => (
        <motion.li
          key={post.id}
          role="listitem"
          className="blog-section__item"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Link href={`/blog/${post.slug}`} className="blog-section__link">
            <figure className="blog-section__figure">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                title={post.image.alt}
                width={500}
                height={500}
                quality={100}
                priority
                className="blog-section__image"
              />
            </figure>
            <div className="blog-section__content">
              <h3 className="blog-section__title">
                {post.title}
              </h3>
              <p className="blog-section__excerpt">{post.excerpt}</p>
              <div className="blog-section__meta">
                <p className="blog-section__author">{post.author.name}</p>
                <span className="blog-section__divider">•</span>
                <time dateTime={post.datetime} className="blog-section__date">
                  {post.date}
                </time>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};
