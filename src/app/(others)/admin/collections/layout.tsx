import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Admin Collections Management",
};

interface AdminCollectionsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminCollectionsLayout({
  children,
}: AdminCollectionsLayoutProps) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
