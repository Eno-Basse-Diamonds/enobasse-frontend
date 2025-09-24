import React from "react";
import Link from "next/link";

export const BlogHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between gap-4">
      <h2 className="font-primary font-semibold text-2xl md:text-3xl lg:text-4xl text-[#502B3A]">
        Our Blog
      </h2>
      <Link
        href="/blog"
        className="rounded-sm inline-flex items-center gap-x-2 bg-[#502B3A] py-3 px-8 text-white text-center hover:bg-opacity-90"
      >
        View All Posts
      </Link>
    </header>
  );
};
