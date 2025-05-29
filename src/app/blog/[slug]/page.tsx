import React, { Suspense } from "react";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { getBlogPost, getRelatedBlogPosts } from "@/lib/api/blog-posts";
import {
  cleanMarkdownContent,
  createHeadingRenderer,
  generateTableOfContents,
} from "@/lib/helpers/blog-post";
import { SectionContainer } from "@/components";
import { PageHeading } from "@/components";
import { BlogHeroImage } from "./_components/blog-hero-image";
import { TableOfContents } from "./_components/table-of-content";
import { RelatedPosts } from "./_components/related-posts";
import { dateToOrdinalDayMonthYear } from "@/lib/utils/date";
import { BlogPostDetailLoader } from "@/components/loader";
import "./styles.scss";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | EnoBasse Jewellery`,
      description: post.excerpt,
      publishedTime: new Date(post.createdAt).toISOString(),
      images: [
        {
          url: `https://enobasse.com${post.image.src}`,
          width: 1200,
          height: 630,
          alt: post.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | EnoBasse Jewellery`,
      description: post.excerpt,
      images: [`https://enobasse.com${post.image.src}`],
    },
  };
};

export default async function BlogPostPageProps({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const [post, relatedPosts] = await Promise.all([
    getBlogPost(slug),
    getRelatedBlogPosts(slug)
  ]);

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title, href: "#" },
  ];

  const content = cleanMarkdownContent(post.content);
  const toc = generateTableOfContents(content);

  return (
    <Suspense fallback={<BlogPostDetailLoader />}>
      <main className="blog-detail">
        <PageHeading breadcrumb={{ items: breadcrumbItems }} />

        <SectionContainer id="blog-post" aria-labelledby="blog-post-heading">
          <BlogHeroImage
            src={post.image.src}
            alt={post.image.alt}
            author={post.author.name}
            date={dateToOrdinalDayMonthYear(post.createdAt)}
            share={{url: `https://enobasse.com/blog/${slug}`, title: post.title}}
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
              {relatedPosts && (
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

        {relatedPosts && (
          <SectionContainer
            id="related-blog-posts"
            aria-labelledby="related-blog-posts-heading"
            className="lg:hidden"
          >
            <RelatedPosts posts={relatedPosts} />
          </SectionContainer>
        )}
      </main>
    </Suspense>
  );
}
