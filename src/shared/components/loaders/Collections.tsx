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
            <div className="h-5 bg-gray-200 rounded w-3/5" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
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
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 w-48" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
