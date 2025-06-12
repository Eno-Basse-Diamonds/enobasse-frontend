import React from "react";
import Link from "next/link";

export const BlogHeader: React.FC = () => {
  return (
    <header className="blog-header">
      <h2 className="blog-header__title">Our Blog</h2>
      <Link href="/blog" className="blog-header__link">
        View All Posts
      </Link>
    </header>
  );
};
