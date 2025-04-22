import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import { getPostBySlug, getRelatedPosts, Post } from "@/lib/api/blog-posts";
import { Breadcrumb, BackButton, SectionContainer } from "@/components";
import {
  cleanMarkdownContent,
  createHeadingRenderer,
  generateTableOfContents,
} from "@/lib/utils/blog-post.utils";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  TiktokIcon,
} from "@/components/icons";
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

interface BlogHeaderProps {
  post: Post;
  breadcrumbItems: Array<{ label: string; href: string }>;
}

const BlogHeader = ({ post, breadcrumbItems }: BlogHeaderProps) => (
  <header className="blog-detail__header">
    <div className="blog-detail__header-container">
      <BackButton />
      <Breadcrumb items={breadcrumbItems} />
      <div aria-hidden className="hidden md:block w-5 sm:w-6"></div>
    </div>
  </header>
);

interface BlogHeroImageProps {
  src: string;
  alt: string;
  author: string;
  date: string;
}

const BlogHeroImage = ({ src, alt, author, date }: BlogHeroImageProps) => (
  <>
    <div className="blog-detail__hero--desktop">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        quality={100}
        className="blog-detail__hero--desktop-image"
        priority
      />
      <p className="blog-detail__hero--desktop-meta">
        By: {author} | {date}
      </p>
      <ShareButtons />
    </div>
    <div className="blog-detail__hero--mobile">
      <div className="blog-detail__hero--mobile-container">
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          quality={100}
          className="blog-detail__hero--mobile-image"
          priority
        />
      </div>
      <p className="blog-detail__hero--mobile-meta">
        By: {author} | {date}
      </p>
      <ShareButtons />
    </div>
  </>
);

const ShareButtons = () => (
  <div className="blog-detail__hero-share">
    <Link
      href="#"
      aria-label="Share on Facebook"
      className="blog-detail__share-link blog-detail__share-link--facebook"
    >
      <FacebookIcon />
    </Link>
    <Link
      href="#"
      aria-label="Share on Instagram"
      className="blog-detail__share-link blog-detail__share-link--instagram"
    >
      <InstagramIcon />
    </Link>
    <Link
      href="#"
      aria-label="Share on X"
      className="blog-detail__share-link blog-detail__share-link--x"
    >
      <XIcon />
    </Link>
    <Link
      href="#"
      aria-label="Share on TikTok"
      className="blog-detail__share-link blog-detail__share-link--tiktok"
    >
      <TiktokIcon />
    </Link>
  </div>
);

interface RelatedPostsProps {
  posts: Post[];
  className?: string;
}

const RelatedPosts = ({ posts, className = "" }: RelatedPostsProps) => (
  <div className={`${className} blog-detail__related`}>
    <h2 className="blog-detail__related-title">Related Blogs</h2>
    <div className="blog-detail__related-grid">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <article className="blog-detail__related-item group">
            <div className="blog-detail__related-item-image">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={320}
                height={240}
                quality={80}
                priority
              />
            </div>
            <div className="blog-detail__related-item-content">
              <div>
                <h3 className="blog-detail__related-item-title">
                  {post.title}
                </h3>
                <p className="blog-detail__related-item-excerpt">
                  {post.excerpt}
                </p>
              </div>
              <div className="blog-detail__related-item-meta">
                <time
                  dateTime={post.datetime}
                  className="blog-detail__related-item-date"
                >
                  {post.date}
                </time>
                <span className="blog-detail__related-item-time">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  </div>
);

interface TableOfContentsProps {
  toc: Array<{
    id: string;
    text: string;
    children?: Array<{ id: string; text: string }>;
  }>;
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  return (
    <nav className="blog-detail__toc">
      <h2 className="blog-detail__toc-title">Table of Contents</h2>
      <ul className="blog-detail__toc-list">
        {toc.map((item) => (
          <li key={item.id} className="blog-detail__toc-list-item">
            <Link href={`#${item.id}`} className="blog-detail__toc-list-link">
              {item.text}
            </Link>
            {item.children && (
              <ul className="blog-detail__toc-list-sublist">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`#${child.id}`}
                      className="blog-detail__toc-list-link blog-detail__toc-list-link--child"
                    >
                      {child.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
