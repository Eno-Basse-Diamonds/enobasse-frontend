import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";

export const BlogHeader: React.FC = () => {
  return (
    <header className="blog-header">
      <h2 className="blog-header__title">Our Blog</h2>
      <Link href="/blog" className="blog-header__link">
        View All Posts <ArrowUpRightIcon className="blog-header__link-icon" />
      </Link>
    </header>
  );
};
