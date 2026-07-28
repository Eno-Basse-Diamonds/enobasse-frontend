"use client";

import { useParams } from "next/navigation";
import Markdown from "react-markdown";

import { SearchSlashIcon } from "lucide-react";

import {
  cleanMarkdownContent,
  createHeadingRenderer,
  generateTableOfContents,
} from "@/modules/blog/helpers";
import { useBlogPost, useRelatedBlogPosts } from "@/modules/blog/hooks";
import { EmptyState } from "@/shared/components/EmptyState";
import { PageHeading } from "@/shared/components/PageHeading";
import { SectionContainer } from "@/shared/components/SectionContainer";
import { BlogPostDetailLoader } from "@/shared/components/loaders/Blog";
import { ArticleSchema } from "@/shared/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/shared/components/seo/BreadcrumbSchema";
import { dateToOrdinalDayMonthYear } from "@/shared/utils/date";

import { BlogHeroImage } from "./_components/BlogHeroImage";
import { RelatedPosts } from "./_components/RelatedPosts";
import { TableOfContents } from "./_components/TableOfContent";

export default function BlogPostContent() {
  const params = useParams();
  const slug = (params.slug as string) || "";
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useBlogPost(slug);
  const { data: relatedPosts, isLoading: isRelatedLoading } = useRelatedBlogPosts(slug);

  if (isPostLoading) {
    return <BlogPostDetailLoader />;
  }

  if (isPostError) {
    return (
      <SectionContainer id="blog-post-error" className="mt-8 md:mt-12">
        <EmptyState
          title="Something went wrong"
          description={postError?.message || "Failed to load blog post. Please try again."}
          icon={<SearchSlashIcon />}
        />
      </SectionContainer>
    );
  }

  if (!post) {
    return null;
  }

  const content = cleanMarkdownContent(post.content);
  const toc = generateTableOfContents(content);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://enobasse.com" },
          { name: "Blog", item: "https://enobasse.com/blog" },
          { name: post.title, item: `https://enobasse.com/blog/${slug}` },
        ]}
      />
      <ArticleSchema post={post} url={`https://enobasse.com/blog/${slug}`} />
      <PageHeading
        breadcrumb={{
          items: [
            { label: "Blog", href: "/blog" },
            { label: post.title, href: "#" },
          ],
        }}
      />

      <SectionContainer id="blog-post" aria-labelledby="blog-post-heading">
        <BlogHeroImage
          src={post.image.src}
          alt={post.image.alt}
          author={post.author.name}
          date={dateToOrdinalDayMonthYear(post.createdAt)}
          share={{
            url: `https://enobasse.com/blog/${slug}`,
            title: post.title,
          }}
        />
      </SectionContainer>

      <SectionContainer
        id="blog-post-content"
        aria-labelledby="blog-post-content-heading"
        className="blog-detail__content"
      >
        <div className="blog-detail__content-container">
          <div className="blog-detail__content-sidebar">
            <TableOfContents toc={toc} />
            {relatedPosts && relatedPosts.length > 0 && !isRelatedLoading && (
              <div className="hidden mt-16 lg:block">
                <RelatedPosts posts={relatedPosts} />
              </div>
            )}
          </div>

          <article className="blog-detail__content-main blog-post">
            <Markdown
              components={{
                h1: createHeadingRenderer(1),
                h2: createHeadingRenderer(2),
                h3: createHeadingRenderer(3),
                h4: createHeadingRenderer(4),
              }}
            >
              {content}
            </Markdown>
          </article>
        </div>
      </SectionContainer>

      {relatedPosts && relatedPosts.length > 0 && !isRelatedLoading && (
        <SectionContainer
          id="related-blog-posts"
          aria-labelledby="related-blog-posts-heading"
          className="lg:hidden"
        >
          <RelatedPosts posts={relatedPosts} />
        </SectionContainer>
      )}
    </>
  );
}
