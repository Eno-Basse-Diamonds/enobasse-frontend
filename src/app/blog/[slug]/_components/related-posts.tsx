import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/data/blog-posts";

interface RelatedPostsProps {
  posts: Post[];
  className?: string;
}

export const RelatedPosts = ({ posts, className = "" }: RelatedPostsProps) => (
  <div className={`${className} blog-detail__related`}>
    <h2 className="blog-detail__related-title">Related Blogs</h2>
    <div className="blog-detail__related-grid">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <article className="blog-detail__related-item group">
            <div className="blog-detail__related-item-image">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                title={post.image.alt}
                width={320}
                height={240}
                quality={80}
                priority
              />
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
                  dateTime={post.datetime}
                  className="blog-detail__related-item-date"
                >
                  {post.date}
                </time>
                <span className="blog-detail__related-item-time">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  </div>
);
