import React, { cache } from 'react';
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BlogPostContent } from "./_components/blog-post-content";
import { getBlogPost, getRelatedBlogPosts } from "@/lib/api/blog-posts";
import "./styles.scss";

const cachedGetBlogPost = cache(async (slug: string) => {
  return getBlogPost(slug);
});

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await cachedGetBlogPost(slug);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const post = await cachedGetBlogPost(slug);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["blogPost", slug],
      queryFn: () => post,
    }),
    queryClient.prefetchQuery({
      queryKey: ["relatedBlogPosts", slug],
      queryFn: () => getRelatedBlogPosts(slug),
    }),
  ]);

  return (
    <main className="blog-detail">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogPostContent slug={slug} />
      </HydrationBoundary>
    </main>
  );
}
