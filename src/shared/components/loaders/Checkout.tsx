import { SectionContainer } from "@/shared/components/SectionContainer";

/**
 * Checkout page skeleton loader.
 *
 * @description Renders a pulsing placeholder matching Checkout page 2-column layout with
 * contact and shipping forms on the left and order summary sidebar on the right.
 *
 * @returns An animated skeleton placeholder matching Checkout page UI.
 */
export function CheckoutPageLoader() {
  return (
    <SectionContainer id="checkout" className="animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Contact & Shipping Form Skeleton */}
          <div className="lg:w-3/5 space-y-6">
            {/* Returning customer banner skeleton */}
            <div className="p-6 bg-white border border-gray-100 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200/80 flex-shrink-0" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200/80 rounded w-36" />
                  <div className="h-3 bg-gray-200/80 rounded w-60" />
                </div>
              </div>
              <div className="h-8 bg-gray-200/80 rounded-sm w-24" />
            </div>

            {/* Contact Information Section */}
            <div className="bg-white p-6 border border-gray-100 rounded-sm space-y-4">
              <div className="h-6 bg-gray-200/80 rounded w-44 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200/80 rounded w-28" />
                  <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200/80 rounded w-28" />
                  <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                </div>
              </div>
            </div>

            {/* Shipping & Billing Section */}
            <div className="bg-white p-6 border border-gray-100 rounded-sm space-y-4">
              <div className="h-6 bg-gray-200/80 rounded w-48 mb-4" />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200/80 rounded w-20" />
                    <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200/80 rounded w-20" />
                    <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200/80 rounded w-20" />
                  <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200/80 rounded w-16" />
                    <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200/80 rounded w-20" />
                    <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar Skeleton */}
          <div className="lg:w-2/5">
            <div className="bg-white p-6 border border-gray-100 rounded-sm space-y-4">
              <div className="h-6 bg-gray-200/80 rounded w-36 mb-4" />
              <div className="space-y-3 divide-y divide-gray-100">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="pt-3 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-200/80 rounded-sm flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200/80 rounded w-3/4" />
                      <div className="h-3 bg-gray-200/80 rounded w-1/3" />
                    </div>
                    <div className="h-4 bg-gray-200/80 rounded w-16" />
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200/80 rounded w-20" />
                  <div className="h-4 bg-gray-200/80 rounded w-24" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200/80 rounded w-20" />
                  <div className="h-4 bg-gray-200/80 rounded w-24" />
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <div className="h-6 bg-gray-200/80 rounded w-24" />
                  <div className="h-6 bg-gray-200/80 rounded w-28" />
                </div>
              </div>
              <div className="h-12 bg-gray-200/80 rounded-sm w-full mt-6" />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
