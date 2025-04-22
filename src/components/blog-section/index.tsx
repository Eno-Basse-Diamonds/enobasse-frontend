import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.scss";
import { Post } from "@/lib/api/blog-posts";

interface BlogSectionProps {
  posts: Post[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <ul className="blog-section" role="list">
      {posts.map((post) => (
        <li key={post.id} role="listitem" className="blog-section__item">
          <Link href={`/blog/${post.slug}`} className="blog-section__link">
            <figure className="blog-section__figure">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={500}
                height={500}
                quality={100}
                priority
                className="blog-section__image"
              />
            </figure>
            <div className="blog-section__content">
              <h3 className="blog-section__title">{post.title}</h3>
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
        </li>
      ))}
    </ul>
  );
};
