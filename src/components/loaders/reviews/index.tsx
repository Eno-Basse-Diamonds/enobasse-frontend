export function AdminReviewsSkeletonLoader() {
  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-6 w-32 bg-gray-200 mb-2"></div>
          <div className="h-4 w-48 bg-gray-200"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <div className="h-10 bg-gray-200"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-200"></div>
          <div className="h-10 w-40 bg-gray-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white shadow  p-6 h-80 animate-pulse"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200-full mr-3"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 mb-2"></div>
                <div className="h-3 w-32 bg-gray-200"></div>
              </div>
            </div>
            <div className="h-4 w-20 bg-gray-200 mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200"></div>
              <div className="h-3 bg-gray-200"></div>
              <div className="h-3 w-3/4 bg-gray-200"></div>
            </div>
            <div className="h-16 bg-gray-200 mb-4"></div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-3 w-16 bg-gray-200"></div>
              <div className="h-6 w-20 bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
