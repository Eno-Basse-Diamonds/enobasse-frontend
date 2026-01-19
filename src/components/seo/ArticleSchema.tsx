import React from "react";
import { BlogPost } from "@/lib/types/blog-post";

interface ArticleSchemaProps {
  post: BlogPost;
  url: string;
}

export const ArticleSchema = ({ post, url }: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image?.src,
    author: {
      "@type": "Person",
      name: post.author.name,
      image: post.author.avatar?.src,
    },
    publisher: {
      "@type": "Organization",
      name: "Enobasse",
      logo: {
        "@type": "ImageObject",
        url: "https://enobasse.com/logo.png",
      },
    },
    url: url,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt?.toISOString() || post.createdAt.toISOString(),
    description: post.excerpt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
