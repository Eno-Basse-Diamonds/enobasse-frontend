import React from "react";
import { Metadata } from "next";
import { getPostBySlug } from "../api/blog-posts";

export const generateBlogMetadata = async (slug: string): Promise<Metadata> => {
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`
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

export const cleanMarkdownContent = (content: string) => {
  return content.replace(/\n\s+/g, "\n").replace(/\n+/g, "\n").trim();
};

export const generateTableOfContents = (content: string) => {
  const lines = content.split("\n");
  const toc: Array<{
    id: string;
    text: string;
    level: number;
    children?: Array<{ id: string; text: string }>;
  }> = [];

  let currentH2: { id: string; text: string } | null = null;

  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      const text = h2Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      currentH2 = { id, text };
      toc.push({ id, text, level: 2 });
    }

    const h3Match = line.match(/^###\s+(.+)/);
    if (h3Match && currentH2) {
      const text = h3Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      const parent = toc.find((item) => item.id === currentH2?.id);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push({ id, text });
      }
    }
  });

  return toc;
};

export const createHeadingRenderer = (level: number) => {
  const HeadingComponent = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingText = String(children);
    const slug = headingText
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    return React.createElement(`h${level}`, { ...props, id: slug }, children);
  };
  return HeadingComponent;
};
