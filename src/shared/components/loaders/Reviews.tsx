/**
 * Admin reviews skeleton loader.
 *
 * @description Renders a pulsing placeholder with heading bar, filter tabs, and review card list.
 *
 * @returns An animated skeleton placeholder matching Admin Reviews UI.
 */
export function AdminReviewsSkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="h-9 bg-gray-200/80 rounded-sm w-48" />
        <div className="h-10 bg-gray-200/80 rounded-sm w-36" />
      </div>
      <div className="flex gap-2 border-b border-gray-200/70 pb-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200/80 rounded-sm w-24" />
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 bg-white border border-gray-200/70 rounded-sm space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200/80 rounded-full" />
                <div className="h-4 bg-gray-200/80 rounded w-32" />
              </div>
              <div className="h-4 bg-gray-200/80 rounded w-24" />
            </div>
            <div className="h-4 bg-gray-200/80 rounded w-full" />
            <div className="h-4 bg-gray-200/80 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

