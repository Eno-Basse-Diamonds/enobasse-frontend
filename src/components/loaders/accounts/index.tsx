export function AccountLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200"></div>
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="h-64 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
