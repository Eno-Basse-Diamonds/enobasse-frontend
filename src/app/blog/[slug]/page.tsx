import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { getPostBySlug, getRelatedPosts, Post } from "@/lib/api/blog-posts";
import {
  cleanMarkdownContent,
  createHeadingRenderer,
  generateTableOfContents,
} from "@/lib/utils/blog-post.utils";
import { SectionContainer } from "@/components";
import { BlogHeader } from "./_components/blog-header";
import { BlogHeroImage } from "./_components/blog-hero-image";
import { TableOfContents } from "./_components/table-of-content";
import { RelatedPosts } from "./_components/related-posts";
import "./styles.scss";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: BlogDetailPageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: `${post.title} | EnoBasse Jewellery`,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{
        url: `https://enobasse.com${post.image.src}`,
        width: 1200,
        height: 630,
        alt: post.image.alt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | EnoBasse Jewellery`,
      description: post.excerpt,
      images: [`https://enobasse.com${post.image.src}`],
    },
  };
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug);
  const relatedPosts = await getRelatedPosts();

  if (!post) return notFound();

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title, href: "#" },
  ];

  const content = cleanMarkdownContent(post.content);
  const toc = generateTableOfContents(content);

  return (
    <main className="blog-detail">
      <BlogHeader post={post} breadcrumbItems={breadcrumbItems} />

      <SectionContainer id="blog-post" aria-labelledby="blog-post-heading">
        <BlogHeroImage
          src={post.image.src}
          alt={post.image.alt}
          author={post.author.name}
          date={post.date}
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
            <div className="hidden mt-16 lg:block">
              <RelatedPosts posts={relatedPosts} />
            </div>
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

      <SectionContainer
        id="related-blog-posts"
        aria-labelledby="related-blog-posts-heading"
        className="lg:hidden"
      >
        <RelatedPosts posts={relatedPosts} className="blog-detail__related" />
      </SectionContainer>
    </main>
  );
}
