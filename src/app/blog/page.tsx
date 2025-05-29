import { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedBlogPosts } from "@/lib/api/blog-posts";
import {
  BlogSection,
  SectionContainer,
  Pagination,
  PageHeading,
} from "@/components";
import { BlogSectionSkeletonLoader } from "@/components/loader";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Our Blog",
};

interface BlogPageProps {
  searchParams?: Promise<{ page?: string; }>;
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <main className="blog-page">
      <PageHeading title="Our Blog" />
      <Suspense fallback={<BlogSectionSkeletonLoader />}>
        <BlogContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function BlogContent({ searchParams }: BlogPageProps) {
  const { page } = (await searchParams) || {};
  const currentPage = Number(page) || 1;
  const { posts, totalPages } = await getPublishedBlogPosts(currentPage);

  return (
    <>
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
          currentPage={currentPage}
          totalPages={totalPages}
          hrefBuilder={(page) => `/blog?page=${page}`}
        />
      </div>
    </>
  );
}
