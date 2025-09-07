import { ReactNode } from "react";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useTestimonials } from "@/lib/hooks/use-testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read authentic stories from our clients about their Eno Bassé jewelry experiences. Discover why collectors trust our craftsmanship and service.",
  keywords: [
    "Eno Bassé reviews",
    "luxury jewelry testimonials",
    "diamond jewelry feedback",
    "client success stories",
    "fine jewelry customer experiences",
  ],
  openGraph: {
    title: "Testimonials - Eno Bassé Diamonds",
    description:
      "Real experiences from Eno Bassé collectors. See how our custom jewelry has become part of their life stories.",
    url: "https://www.enobasse.com/testimonials",
  },
  twitter: {
    title: "Testimonials - Eno Bassé Diamonds",
    description: "Hear from our clients about their bespoke jewelry journeys.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/testimonials",
  },
};

interface TestimonialLayoutProps {
  children: ReactNode;
}

export default async function TesimonialsLayout({
  children,
}: TestimonialLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tesimonials"],
    queryFn: () => useTestimonials(),
  });

  return (
    <div className="min-h-screen pt-12 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-lg font-semibold leading-8 tracking-tight text-secondary-500">
            Testimonials
          </h1>
          <h2 className="mt-2 text-3xl md:text-4xl font-primary font-semibold tracking-tight text-primary-500">
            Read what our customers are saying about us!
          </h2>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          {children}
        </HydrationBoundary>
      </div>
    </div>
  );
}
