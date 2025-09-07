import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTestimonialsForAdmin } from "@/lib/api/testimonials";

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

  await queryClient.prefetchQuery({
    queryKey: ["testimonialsForAdmin"],
    queryFn: () => getTestimonialsForAdmin(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
