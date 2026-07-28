/**
 * Dashboard skeleton loader.
 *
 * @description Renders a pulsing placeholder with a row of four stat cards and
 * a large chart area to indicate the admin dashboard is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded" />
    </div>
  );
}
