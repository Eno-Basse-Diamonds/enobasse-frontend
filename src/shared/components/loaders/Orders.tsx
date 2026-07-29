/**
 * Order history skeleton loader.
 *
 * @description Renders a pulsing placeholder matching OrderHistoryPage layout with
 * order header, product item cards, and billing summary breakdown.
 *
 * @returns An animated skeleton placeholder matching Order History UI.
 */
export function OrderHistoryLoader() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-6 animate-pulse">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="border border-gray-200/70 rounded-sm overflow-hidden bg-white">
          {/* Order Header Skeleton */}
          <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-100">
            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-4 md:gap-8">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-20" />
                <div className="h-4 bg-gray-200/80 rounded w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-24" />
                <div className="h-4 bg-gray-200/80 rounded w-32" />
              </div>
              <div className="space-y-2 col-span-2 md:col-auto">
                <div className="h-4 bg-gray-200/80 rounded w-24" />
                <div className="h-4 bg-gray-200/80 rounded w-28" />
              </div>
            </div>
          </div>

          {/* Product Items Skeleton */}
          <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200/80 rounded-sm flex-shrink-0" />
              <div className="flex-grow space-y-3">
                <div className="h-6 bg-gray-200/80 rounded w-3/4" />
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200/80 rounded w-24" />
                  <div className="h-4 bg-gray-200/80 rounded w-20" />
                </div>
                <div className="h-4 bg-gray-200/80 rounded w-28 pt-2" />
              </div>
              <div className="h-6 bg-gray-200/80 rounded w-24 self-start" />
            </div>
          </div>

          {/* Billing Summary Skeleton */}
          <div className="p-4 md:p-6 bg-gray-50/50 border-t border-gray-200/60 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200/80 rounded w-32 mb-2" />
              <div className="h-4 bg-gray-200/80 rounded w-40" />
              <div className="h-4 bg-gray-200/80 rounded w-48" />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200/80 rounded w-40 mb-2" />
              <div className="h-4 bg-gray-200/80 rounded w-32" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200/80 rounded w-20" />
                <div className="h-4 bg-gray-200/80 rounded w-24" />
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200/50">
                <div className="h-5 bg-gray-200/80 rounded w-24" />
                <div className="h-5 bg-gray-200/80 rounded w-28" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

