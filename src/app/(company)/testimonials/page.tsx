"use client";

import Image from "next/image";
import { useTestimonials } from "@/lib/hooks/use-testimonials";

export default function TestimonialsPage() {
  const { data, isLoading } = useTestimonials();
  const testimonials = data || [];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white shadow animate-pulse p-6">
            <div className="h-4 bg-gray-200 mb-4"></div>
            <div className="h-4 bg-gray-200 mb-2"></div>
            <div className="h-4 bg-gray-200 mb-2"></div>
            <div className="h-4 bg-gray-200 mb-2"></div>
            <div className="h-4 bg-gray-200 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-50 p-8 text-sm leading-6 flex flex-col h-full rounded-sm"
          >
            <blockquote className="text-primary-500 flex-grow">
              <p>"{testimonial.text}"</p>
            </blockquote>
            <div className="mt-6 flex items-center gap-x-4">
              {testimonial.avatar?.url ? (
                <Image
                  className="h-10 w-10 rounded-full bg-gray-50"
                  src={testimonial.avatar.url}
                  alt={testimonial.avatar.alt || testimonial.name}
                  width={40}
                  height={40}
                  loading="lazy"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                  <span className="text-sm font-medium text-primary-500">
                    {getInitials(testimonial.name)}
                  </span>
                </div>
              )}
              <div>
                <div className="font-semibold text-primary-500">
                  {testimonial.name}
                </div>
                {testimonial.handle && (
                  <div className="text-primary-400">{testimonial.handle}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
