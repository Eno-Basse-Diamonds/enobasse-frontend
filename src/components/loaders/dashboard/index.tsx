export function DashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 w-64 rounded-sm" />
          <div className="h-4 bg-gray-200 w-48 rounded-sm" />
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 p-6 rounded-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 w-20 rounded-sm" />
                <div className="h-8 bg-gray-200 w-16 rounded-sm" />
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 p-4 rounded-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 w-16 rounded-sm" />
                <div className="h-6 bg-gray-200 w-12 rounded-sm" />
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 p-6 rounded-sm"
          >
            <div className="h-6 bg-gray-200 w-32 mb-4 rounded-sm" />
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex justify-between items-center py-2">
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 w-16 rounded-sm" />
                    <div className="h-3 bg-gray-200 w-24 rounded-sm" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 w-12 rounded-sm ml-auto" />
                    <div className="h-5 bg-gray-200 w-14 rounded-sm ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="h-6 bg-gray-200 w-32 rounded-sm" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gray-200 rounded-sm shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 w-24 rounded-sm" />
                  <div className="h-3 bg-gray-200 w-16 rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
