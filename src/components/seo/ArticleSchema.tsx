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
      name: "Eno Bassé Diamonds",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png",
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
