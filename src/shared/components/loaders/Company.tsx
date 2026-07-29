import { SectionContainer } from "@/shared/components/SectionContainer";

/**
 * About page skeleton loader.
 *
 * @description Renders hero banner, founder profile grid, and text section skeletons.
 */
export function AboutPageSkeletonLoader() {
  return (
    <div className="min-h-screen pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* Title & Hero Banner Skeleton */}
      <div className="mb-10 md:mb-16 text-center space-y-4">
        <div className="h-9 bg-gray-200/80 rounded w-48 mx-auto" />
        <div className="w-full h-80 lg:h-96 bg-gray-200/80 rounded-sm" />
        <div className="max-w-4xl mx-auto space-y-3 pt-4">
          <div className="h-4 bg-gray-200/80 rounded w-full" />
          <div className="h-4 bg-gray-200/80 rounded w-11/12" />
          <div className="h-4 bg-gray-200/80 rounded w-4/5" />
        </div>
      </div>

      {/* Founder Profile Grid Skeleton */}
      <div className="py-6 lg:py-16 border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="w-full h-96 md:h-[500px] bg-gray-200/80 rounded-sm" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200/80 rounded w-48" />
            <div className="space-y-3 pt-2">
              <div className="h-4 bg-gray-200/80 rounded w-full" />
              <div className="h-4 bg-gray-200/80 rounded w-full" />
              <div className="h-4 bg-gray-200/80 rounded w-11/12" />
              <div className="h-4 bg-gray-200/80 rounded w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Contact page skeleton loader.
 *
 * @description Renders page title, contact info cards, and form skeleton.
 */
export function ContactPageSkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
      {/* Heading Skeleton */}
      <div className="text-center space-y-3">
        <div className="h-9 bg-gray-200/80 rounded w-44 mx-auto" />
        <div className="h-4 bg-gray-200/80 rounded w-72 mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Cards */}
        <div className="space-y-6">
          <div className="h-6 bg-gray-200/80 rounded w-48 mb-4" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 bg-white border border-gray-100 rounded-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200/80 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200/80 rounded w-32" />
                <div className="h-4 bg-gray-200/80 rounded w-48" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white p-6 md:p-8 border border-gray-100 rounded-sm space-y-6">
          <div className="h-6 bg-gray-200/80 rounded w-44" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-20" />
                <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-20" />
                <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-24" />
              <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-24" />
              <div className="h-32 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="h-12 bg-gray-200/80 rounded-sm w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonials page skeleton loader.
 *
 * @description Renders page title and grid of testimonial cards.
 */
export function TestimonialsPageSkeletonLoader() {
  return (
    <SectionContainer id="testimonials" className="py-12 animate-pulse">
      <div className="text-center space-y-3 mb-10">
        <div className="h-9 bg-gray-200/80 rounded w-48 mx-auto" />
        <div className="h-4 bg-gray-200/80 rounded w-80 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 bg-white border border-gray-100 rounded-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200/80 rounded-full flex-shrink-0" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-28" />
                <div className="h-3 bg-gray-200/80 rounded w-20" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-gray-200/80 rounded w-full" />
              <div className="h-4 bg-gray-200/80 rounded w-11/12" />
              <div className="h-4 bg-gray-200/80 rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

/**
 * FAQs page skeleton loader.
 *
 * @description Renders page title and list of accordion skeletons.
 */
export function FaqsPageSkeletonLoader() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-pulse space-y-8">
      <div className="text-center space-y-3">
        <div className="h-9 bg-gray-200/80 rounded w-36 mx-auto" />
        <div className="h-4 bg-gray-200/80 rounded w-64 mx-auto" />
      </div>

      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-white border border-gray-200/70 rounded-sm p-4 flex justify-between items-center">
            <div className="h-5 bg-gray-200/80 rounded w-3/4" />
            <div className="h-5 w-5 bg-gray-200/80 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
