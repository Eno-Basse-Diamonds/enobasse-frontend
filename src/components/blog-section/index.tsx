import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.scss";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  image: { src: string; alt: string };
  author: string;
  date: string;
  datetime: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <ul className="blog-section" role="list">
      {posts.map((post) => (
        <li key={post.id} role="listitem" className="blog-section__item">
          <Link href={post.href} className="blog-section__link">
            <figure className="blog-section__figure">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={500}
                height={500}
                loading="lazy"
                quality={100}
                className="blog-section__image"
              />
            </figure>
            <div className="blog-section__content">
              <h3 className="blog-section__title">{post.title}</h3>
              <p className="blog-section__excerpt">{post.excerpt}</p>
              <div className="blog-section__meta">
                <p className="blog-section__author">{post.author}</p>
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
