import { BlogPost } from "@/modules/blog/types";

interface ArticleSchemaProps {
  post: BlogPost;
  url: string;
}

/**
 * BlogPosting structured data (JSON-LD).
 *
 * @description Generates schema.org BlogPosting markup for blog articles,
 * including headline, image, author, publisher, publication dates, and
 * description. Renders as a script tag in the document head.
 *
 * @param post - The blog post data with title, image, author, and timestamps.
 * @param url - Canonical URL of the article.
 * @returns A JSON-LD script tag for BlogPosting.
 */
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
