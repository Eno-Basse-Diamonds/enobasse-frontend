import React from "react";
import { BackButton, Breadcrumb } from "@/components";
import { Post } from "@/lib/api/blog-posts";

interface BlogHeaderProps {
  post: Post;
  breadcrumbItems: Array<{ label: string; href: string }>;
}

export const BlogHeader = ({ post, breadcrumbItems }: BlogHeaderProps) => (
  <header className="blog-detail__header">
    <div className="blog-detail__header-container">
      <BackButton />
      <Breadcrumb items={breadcrumbItems} />
      <div aria-hidden className="hidden md:block w-5 sm:w-6"></div>
    </div>
  </header>
);
