export function DashboardSkeleton() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 w-16"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 w-32 mb-4"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex justify-between items-center py-3">
                  <div>
                    <div className="h-4 bg-gray-200 w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 w-24"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 w-12 mb-2"></div>
                    <div className="h-6 bg-gray-200 w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
