/**
 * Dashboard skeleton loader.
 *
 * @description Renders a pulsing placeholder with a row of four stat cards and
 * large chart areas matching the admin dashboard layout.
 *
 * @returns An animated skeleton placeholder matching Admin Dashboard UI.
 */
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Title skeleton */}
      <div className="h-8 bg-gray-200/80 rounded w-48 mb-4" />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-white border border-gray-200/70 rounded-sm space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200/80 rounded w-24" />
              <div className="h-6 w-6 bg-gray-200/80 rounded-full" />
            </div>
            <div className="h-7 bg-gray-200/80 rounded w-32" />
            <div className="h-3 bg-gray-200/80 rounded w-20" />
          </div>
        ))}
      </div>

      {/* Chart & Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <div className="lg:col-span-2 h-80 bg-white border border-gray-200/70 rounded-sm p-6 space-y-4">
          <div className="h-6 bg-gray-200/80 rounded w-40" />
          <div className="h-56 bg-gray-200/80 rounded-sm w-full" />
        </div>
        <div className="h-80 bg-white border border-gray-200/70 rounded-sm p-6 space-y-4">
          <div className="h-6 bg-gray-200/80 rounded w-36" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200/80 rounded-sm w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { DashboardSkeleton as AdminDashboardSkeletonLoader };

