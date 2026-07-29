/**
 * Auth pages skeleton loader.
 *
 * @description Renders a pulsing placeholder matching auth form layout (sign-in, sign-up, forgot-password).
 */
export function AuthSkeletonLoader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-pulse">
      <div className="max-w-md w-full bg-white p-6 md:p-8 border border-gray-100 rounded-sm space-y-6 shadow-sm">
        {/* Header Skeleton */}
        <div className="text-center space-y-2">
          <div className="h-7 bg-gray-200/80 rounded w-44 mx-auto" />
          <div className="h-4 bg-gray-200/80 rounded w-64 mx-auto" />
        </div>

        {/* Input Fields Skeleton */}
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200/80 rounded w-24" />
            <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200/80 rounded w-20" />
            <div className="h-11 bg-gray-200/80 rounded-sm w-full" />
          </div>
          <div className="h-11 bg-gray-200/80 rounded-sm w-full mt-6" />
        </div>

        {/* Bottom Link Skeleton */}
        <div className="h-4 bg-gray-200/80 rounded w-48 mx-auto pt-2" />
      </div>
    </div>
  );
}
