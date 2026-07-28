/**
 * Collection list skeleton loader.
 *
 * @description Renders a pulsing grid with six card-sized blocks to indicate
 * the collection listing is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function CollectionListLoader() {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-64" />
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
