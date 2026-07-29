/**
 * Account page loading skeleton.
 *
 * @description Renders a pulsing placeholder matching CustomerAccountPage layout with
 * sidebar navigation on desktop, mobile nav placeholder, and account profile form grid.
 *
 * @returns An animated skeleton placeholder matching Account page UI.
 */
export function AccountLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8 animate-pulse">
      {/* Mobile Navigation Skeleton */}
      <div className="lg:hidden mb-6">
        <div className="h-12 bg-gray-200/80 rounded-sm w-full" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Navigation Skeleton */}
        <div className="hidden lg:block lg:w-64 flex-shrink-0 space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-11 bg-gray-200/80 rounded-sm w-full" />
          ))}
        </div>

        {/* Account Profile Content Skeleton */}
        <div className="flex-1 bg-white p-6 md:p-8 border border-gray-100 rounded-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div className="h-7 bg-gray-200/80 rounded w-44" />
            <div className="h-9 bg-gray-200/80 rounded-sm w-28" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-20" />
              <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-24" />
              <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-28" />
              <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-20" />
              <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="h-4 bg-gray-200/80 rounded w-32" />
              <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

