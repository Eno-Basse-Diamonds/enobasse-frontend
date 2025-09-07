import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Admin Testimonials Management",
};

interface AdminTestimonialsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminTestimonialsLayout({
  children,
}: AdminTestimonialsLayoutProps) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
