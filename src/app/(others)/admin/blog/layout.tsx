import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Admin Blog Management",
};

interface AdminBlogLayoutProps {
  children: React.ReactNode;
}

export default async function AdminBlogLayout({
  children,
}: AdminBlogLayoutProps) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
