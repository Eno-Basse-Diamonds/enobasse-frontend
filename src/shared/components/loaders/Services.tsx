import { SectionContainer } from "@/shared/components/SectionContainer";

/**
 * Service page skeleton loader.
 *
 * @description Renders a pulsing layout matching multi-step service forms & guide pages
 * (Custom Design, Ring Resizing, Maintenance & Repairs, Size Guide).
 */
export function ServicePageSkeletonLoader() {
  return (
    <SectionContainer id="service-page" className="py-12 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title & Description Header Skeleton */}
        <div className="text-center space-y-3">
          <div className="h-9 bg-gray-200/80 rounded w-56 mx-auto" />
          <div className="h-4 bg-gray-200/80 rounded w-96 max-w-full mx-auto" />
        </div>

        {/* Step Progress Bar Skeleton */}
        <div className="flex justify-between items-center max-w-2xl mx-auto px-4 py-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200/80 flex items-center justify-center" />
              <div className="h-4 bg-gray-200/80 rounded w-20 hidden sm:block" />
            </div>
          ))}
        </div>

        {/* Main Content / Form Card Skeleton */}
        <div className="bg-white p-6 md:p-10 border border-gray-100 rounded-sm space-y-6 max-w-3xl mx-auto">
          <div className="h-6 bg-gray-200/80 rounded w-48 mb-4" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-24" />
                <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-24" />
                <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-32" />
              <div className="h-28 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <div className="h-11 bg-gray-200/80 rounded-sm w-28" />
              <div className="h-11 bg-gray-200/80 rounded-sm w-36" />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
