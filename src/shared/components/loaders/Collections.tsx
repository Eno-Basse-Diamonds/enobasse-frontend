import { SectionContainer } from "@/shared/components/SectionContainer";
import { ProductListLoader } from "@/shared/components/loaders/Products";

interface CollectionListLoaderProps {
  count?: number;
}

/**
 * Collection list skeleton loader.
 *
 * @description Renders a pulsing grid with card-sized blocks matching the exact
 * 2-column mobile / 3-column desktop CollectionCard layout.
 *
 * @param count - Number of skeleton cards to render (default 6).
 * @returns An animated skeleton placeholder matching CollectionCard UI.
 */
export function CollectionListLoader({ count = 6 }: CollectionListLoaderProps = {}) {
  return (
    <div className="animate-pulse grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex flex-col h-full">
          {/* Card Image Skeleton */}
          <div className="relative w-full h-40 sm:h-48 md:h-60 lg:h-80 overflow-hidden rounded-sm bg-gray-200/80 border border-gray-200/50" />
          {/* Collection Title & Count Skeleton */}
          <div className="mt-4 flex flex-col flex-grow space-y-2">
            <div className="h-5 bg-gray-200/80 rounded w-3/5" />
            <div className="h-4 bg-gray-200/80 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Collections list page skeleton loader.
 *
 * @description Renders a page heading and a 2-col / 3-col grid of collection card skeletons.
 *
 * @returns An animated skeleton placeholder matching Collections list page.
 */
export function CollectionsPageLoader() {
  return (
    <div className="mt-12 mb-16 md:mb-24 animate-pulse">
      <div className="flex flex-col items-center justify-center py-4 mb-6">
        <div className="h-8 bg-gray-200/80 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-200/80 rounded w-64" />
      </div>
      <SectionContainer id="collections">
        <CollectionListLoader count={6} />
      </SectionContainer>
    </div>
  );
}

/**
 * Collection detail page skeleton loader.
 *
 * @description Renders a collection banner header skeleton and a flex sidebar + product grid layout.
 *
 * @returns An animated skeleton placeholder matching Collection Detail page.
 */
export function CollectionDetailPageLoader() {
  return (
    <div className="mt-12 mb-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="h-4 bg-gray-200/80 rounded w-48" />
      </div>

      <SectionContainer id="collection-products">
        {/* Banner Header Skeleton */}
        <div className="mb-6 lg:mb-12">
          {/* Mobile Header Skeleton */}
          <div className="lg:hidden space-y-2">
            <div className="h-48 w-full bg-gray-200/80 rounded-sm" />
            <div className="bg-[#502B3A]/90 p-6 rounded-sm space-y-2">
              <div className="h-7 bg-white/20 rounded w-1/2" />
              <div className="h-4 bg-white/20 rounded w-3/4" />
            </div>
          </div>
          {/* Desktop Header Skeleton */}
          <div className="hidden lg:block relative h-80 bg-gray-200/80 rounded-sm overflow-hidden p-8 flex items-center">
            <div className="bg-[#502B3A]/90 p-8 rounded-sm max-w-2xl w-full space-y-3">
              <div className="h-8 bg-white/20 rounded w-1/2" />
              <div className="h-4 bg-white/20 rounded w-5/6" />
            </div>
          </div>
        </div>

        {/* Layout with Sidebar & Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block lg:w-1/4 space-y-6 pr-4">
            <div className="space-y-3 pb-6">
              <div className="h-5 bg-gray-200/80 rounded w-24 mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200/80 rounded-sm" />
                  <div className="h-4 bg-gray-200/80 rounded w-32" />
                </div>
              ))}
            </div>
          </aside>

          {/* Main Product Grid Area */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 bg-gray-200/80 rounded w-40" />
              <div className="h-9 bg-gray-200/80 rounded-sm w-44" />
            </div>
            <ProductListLoader count={6} gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-3" />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

/**
 * Admin collections skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading bar and four row
 * bars to indicate the admin collections table is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function AdminCollectionsSkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="h-9 bg-gray-200/80 rounded-sm w-48" />
        <div className="h-10 bg-gray-200/80 rounded-sm w-36" />
      </div>
      <div className="border border-gray-200/70 rounded-sm overflow-hidden divide-y divide-gray-100">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 bg-gray-200/80 rounded-sm flex-shrink-0" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-48" />
                <div className="h-3 bg-gray-200/80 rounded w-24" />
              </div>
            </div>
            <div className="h-8 bg-gray-200/80 rounded-sm w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

