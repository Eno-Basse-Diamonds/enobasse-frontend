import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/api/blog-posts";
import {
  BlogSection,
  SectionContainer,
  Pagination,
  PageHeading,
} from "@/components";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Our Blog",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const pagination = { currentPage: 2, totalPages: 10 };

  if (!posts) return notFound();

  return (
    <main className="blog-page">
      <PageHeading title="Our Blog" />

      <SectionContainer
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        className="blog-page__posts-container"
      >
        <h2 id="blog-posts-heading" className="sr-only">
          Blog Posts
        </h2>
        <BlogSection posts={posts} />
      </SectionContainer>

      <div aria-label="Blog pagination" className="blog-page__pagination">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hrefBuilder={(page) => `/blog?page=${page}`}
        />
      </div>
    </main>
  );
}
