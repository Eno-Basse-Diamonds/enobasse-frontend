export function AdminLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 w-48"></div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
