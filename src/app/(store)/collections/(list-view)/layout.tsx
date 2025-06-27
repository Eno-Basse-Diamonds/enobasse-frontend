import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCollections } from "@/lib/api/collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore our curated jewelry collections—each piece handcrafted with exceptional diamonds and precious metals. Discover your perfect statement piece.",
  keywords: [
    "luxury jewelry collections",
    "Eno Basse signature designs",
    "diamond ring collections",
    "handcrafted jewelry lines",
    "precious metal collections",
  ],
  openGraph: {
    title: "Collections - Eno Basse Diamonds",
    description:
      "Journey through our artisan-crafted jewelry lines, where every collection tells a story of craftsmanship and timeless elegance.",
    url: "https://www.enobasse.com/collections",
  },
  twitter: {
    title: "Collections - Eno Basse Diamonds",
    description:
      "Explore our designer jewelry lines—where heritage techniques meet contemporary design.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/collections",
  },
};

interface CollectionsLayoutProps {
  children: React.ReactNode;
}

export default async function CollectionsLayout({
  children,
}: CollectionsLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
