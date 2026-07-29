import { SectionContainer } from "@/shared/components/SectionContainer";

/**
 * Wishlist page skeleton loader.
 *
 * @description Renders a pulsing placeholder matching WishlistPage layout with
 * header and list-item blocks inside max-w-4xl container.
 *
 * @returns An animated skeleton placeholder matching Wishlist page UI.
 */
export function WishlistLoader() {
  return (
    <SectionContainer id="wishlist" className="animate-pulse">
      <div className="my-8 max-w-4xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div className="h-8 bg-gray-200/80 rounded w-44" />
          <div className="h-8 bg-gray-200/80 rounded-sm w-24" />
        </div>

        {/* Wishlist Items List Skeleton */}
        <div className="bg-white border border-gray-100 rounded-sm divide-y divide-gray-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200/80 rounded-sm flex-shrink-0" />
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200/80 rounded w-48" />
                  <div className="h-4 bg-gray-200/80 rounded w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="h-10 bg-gray-200/80 rounded-sm w-32" />
                <div className="h-6 w-6 bg-gray-200/80 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

