import { SectionContainer } from "@/shared/components/SectionContainer";

/**
 * Cart page skeleton loader.
 *
 * @description Renders a pulsing placeholder matching the Cart page layout with
 * cart item list on the left and order summary sidebar on the right.
 *
 * @returns An animated skeleton placeholder matching Cart page UI.
 */
export function CartLoader() {
  return (
    <SectionContainer id="cart" className="animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 bg-gray-200/80 rounded w-36 mb-6" />

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-12">
          {/* Left Column: Cart Items List */}
          <div className="bg-white overflow-hidden mx-auto w-full flex-none lg:max-w-xl xl:max-w-2xl border border-gray-100 rounded-sm divide-y divide-gray-100">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                {/* Thumbnail Image Skeleton */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200/80 rounded-sm flex-shrink-0" />
                {/* Product Info Skeleton */}
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200/80 rounded w-3/4" />
                  <div className="h-4 bg-gray-200/80 rounded w-1/3" />
                  <div className="h-4 bg-gray-200/80 rounded w-1/4" />
                </div>
                {/* Action & Price Skeleton */}
                <div className="flex flex-col items-end gap-4">
                  <div className="h-5 bg-gray-200/80 rounded w-20" />
                  <div className="h-8 bg-gray-200/80 rounded-sm w-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:max-w-xs xl:max-w-md mt-6 lg:mt-0 flex-1 bg-gray-50 border border-gray-200/70 p-6 rounded-sm space-y-4">
            <div className="h-6 bg-gray-200/80 rounded w-36 mb-4" />
            <div className="flex justify-between py-2 border-b border-gray-200/50">
              <div className="h-4 bg-gray-200/80 rounded w-20" />
              <div className="h-4 bg-gray-200/80 rounded w-24" />
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200/50">
              <div className="h-4 bg-gray-200/80 rounded w-20" />
              <div className="h-4 bg-gray-200/80 rounded w-24" />
            </div>
            <div className="flex justify-between py-2 pt-4">
              <div className="h-6 bg-gray-200/80 rounded w-24" />
              <div className="h-6 bg-gray-200/80 rounded w-28" />
            </div>
            <div className="h-12 bg-gray-200/80 rounded-sm w-full mt-6" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

