import { SectionContainer } from "@/shared/components/SectionContainer";
import { ProductListLoader } from "@/shared/components/loaders/Products";

/**
 * Home page skeleton loader.
 *
 * @description Renders a pulsing hero banner, featured products grid, and section placeholders matching the homepage layout.
 */
export function HomePageSkeletonLoader() {
  return (
    <div className="space-y-12 animate-pulse mb-16">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-80 sm:h-[450px] md:h-[550px] lg:h-[650px] bg-gray-200/80 relative flex items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-4">
          <div className="h-10 md:h-14 bg-gray-300/80 rounded w-3/4 mx-auto" />
          <div className="h-4 md:h-5 bg-gray-300/80 rounded w-1/2 mx-auto" />
          <div className="h-12 bg-gray-300/80 rounded-sm w-40 mx-auto mt-6" />
        </div>
      </div>

      {/* Featured Products Section Skeleton */}
      <SectionContainer id="featured-products">
        <div className="text-center space-y-3 mb-8">
          <div className="h-8 bg-gray-200/80 rounded w-56 mx-auto" />
          <div className="h-4 bg-gray-200/80 rounded w-80 mx-auto" />
        </div>
        <ProductListLoader count={4} gridCols="grid-cols-2 md:grid-cols-4" />
      </SectionContainer>

      {/* Collections Section Skeleton */}
      <SectionContainer id="collections-preview">
        <div className="text-center space-y-3 mb-8">
          <div className="h-8 bg-gray-200/80 rounded w-48 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 sm:h-80 bg-gray-200/80 rounded-sm" />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
