"use client";

import React from "react";
import Markdown from "react-markdown";
import { SectionContainer, PageHeading } from "@/components";
import { BlogPostDetailLoader } from "@/components/loader";
import { BlogHeroImage } from "./blog-hero-image";
import { TableOfContents } from "./table-of-content";
import { RelatedPosts } from "./related-posts";
import {
  cleanMarkdownContent,
  createHeadingRenderer,
  generateTableOfContents,
} from "@/lib/helpers/blog-post";
import { useBlogPost, useRelatedBlogPosts } from "@/lib/hooks/use-blog";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";

interface BlogPostContentProps {
  slug: string;
}

export function BlogPostContent({ slug }: BlogPostContentProps) {
  const { data: post, isLoading: isPostLoading } = useBlogPost(slug);
  const { data: relatedPosts, isLoading: isRelatedLoading } =
    useRelatedBlogPosts(slug);

  if (isPostLoading) {
    return <BlogPostDetailLoader />;
  }

  if (!post) {
    return null;
  }

  const content = cleanMarkdownContent(post.content);
  const toc = generateTableOfContents(content);

  return (
    <>
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
            {relatedPosts && !isRelatedLoading && (
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

      {relatedPosts && !isRelatedLoading && (
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
