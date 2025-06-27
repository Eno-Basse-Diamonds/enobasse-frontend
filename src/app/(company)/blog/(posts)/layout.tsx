import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPublishedBlogPosts } from "@/lib/api/blog-posts";
import { PageHeading } from "@/components";
import "./styles.scss";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Our Blog",
  description:
    "Discover the art of fine jewelry through our blog—diamond guides, style trends, and behind-the-scenes craftsmanship from our master jewelers.",
  keywords: [
    "luxury jewelry blog",
    "diamond education",
    "jewelry care tips",
    "Eno Basse blog",
    "fine jewelry trends",
  ],
  openGraph: {
    title: "Our Blog - Eno Basse Diamonds",
    description:
      "Where heritage craftsmanship meets modern design insights. Explore our articles on jewelry selection, care, and the art of adornment.",
    url: "https://www.enobasse.com/blog",
  },
  twitter: {
    title: "Our Blog - Eno Basse Diamonds",
    description:
      "From diamond grading to design philosophy—unpack the world of fine jewelry with our experts. #JewelryWisdom",
  },
  alternates: {
    canonical: "https://www.enobasse.com/blog",
  },
};

interface BlogPageLayoutProps {
  children: ReactNode;
  searchParams: { page?: string };
}

export default async function BlogPageLayout({
  children,
  searchParams = {},
}: BlogPageLayoutProps) {
  const page = Number(searchParams.page) || 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["publishedBlogPosts", page],
    queryFn: () => getPublishedBlogPosts(page),
  });

  return (
    <main className="blog-page">
      <PageHeading title="Our Blog" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </main>
  );
}
