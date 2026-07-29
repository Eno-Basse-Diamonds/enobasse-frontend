import { SectionContainer } from "@/shared/components/SectionContainer";

interface ProductListLoaderProps {
  count?: number;
  gridCols?: string;
}

/**
 * Product list grid skeleton loader.
 *
 * @description Renders a pulsing grid with card-sized blocks matching the exact
 * 2-column mobile / 3-column tablet / 4-column desktop ProductListItem layout.
 *
 * @param count - Number of skeleton cards to render (default 8).
 * @param gridCols - Custom grid column classes (optional).
 * @returns An animated skeleton placeholder matching ProductList UI.
 */
export function ProductListLoader({
  count = 8,
  gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: ProductListLoaderProps = {}) {
  return (
    <div className={`animate-pulse grid gap-x-6 gap-y-14 ${gridCols}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex flex-col h-full overflow-hidden">
          {/* Image container skeleton */}
          <div className="relative aspect-square w-full border border-gray-200/60 bg-gray-200/80 rounded-sm">
            {/* Wishlist icon skeleton */}
            <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-300/80" />
            {/* Badge skeleton */}
            <div className="absolute bottom-2 right-2 h-5 w-14 bg-gray-300/80 rounded-sm" />
          </div>
          {/* Product Info skeleton */}
          <div className="mt-4 flex flex-col flex-grow space-y-2">
            <div className="h-4 bg-gray-200/80 rounded w-3/4" />
            <div className="h-4 bg-gray-200/80 rounded w-1/3 mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Products page skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading, sidebar filters (on desktop),
 * filter/sort control bar, and matching product grid cards.
 *
 * @returns An animated skeleton placeholder matching the Products Page UI.
 */
export function ProductsPageLoader() {
  return (
    <div className="my-12 animate-pulse">
      {/* Page Heading skeleton */}
      <div className="flex flex-col items-center justify-center py-4 mb-6">
        <div className="h-8 bg-gray-200/80 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-200/80 rounded w-72" />
      </div>

      <SectionContainer id="all-products">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar skeleton */}
          <aside className="hidden lg:block lg:w-1/4 space-y-6 divide-y divide-gray-100 pr-4">
            <div className="space-y-3 pb-6">
              <div className="h-5 bg-gray-200/80 rounded w-24 mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200/80 rounded-sm" />
                  <div className="h-4 bg-gray-200/80 rounded w-32" />
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6 pb-6">
              <div className="h-5 bg-gray-200/80 rounded w-20 mb-4" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200/80 rounded-sm" />
                  <div className="h-4 bg-gray-200/80 rounded w-28" />
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6">
              <div className="h-5 bg-gray-200/80 rounded w-28 mb-4" />
              <div className="flex gap-2">
                <div className="h-9 bg-gray-200/80 rounded-sm flex-1" />
                <div className="h-9 bg-gray-200/80 rounded-sm flex-1" />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {/* Mobile Filter Button skeleton */}
            <div className="lg:hidden mb-4">
              <div className="h-10 bg-gray-200/80 rounded-sm w-full" />
            </div>

            {/* Filter / Sort Bar skeleton */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 bg-gray-200/80 rounded w-40" />
              <div className="h-9 bg-gray-200/80 rounded-sm w-44" />
            </div>

            {/* Product List Grid */}
            <ProductListLoader count={9} gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-3" />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

/**
 * Product detail page skeleton loader.
 *
 * @description Renders a pulsing layout matching the 2-column detail view on tablet/desktop,
 * image gallery with thumbnails, options selector, and details table.
 *
 * @returns An animated skeleton placeholder matching Product Details UI.
 */
export function ProductDetailPageLoader() {
  return (
    <div className="my-6 md:my-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="h-4 bg-gray-200/80 rounded w-48" />
      </div>

      <SectionContainer id="product-details">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-x-4 md:gap-x-12">
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-3">
            <div className="flex justify-end mb-2">
              <div className="h-8 w-20 bg-gray-200/80 rounded-sm" />
            </div>
            {/* Main Image */}
            <div className="w-full h-80 md:h-[480px] lg:h-[520px] bg-gray-200/80 rounded-sm border border-gray-200/60" />
            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200/80 rounded-sm" />
              ))}
            </div>

            {/* Desktop Description & Details */}
            <div className="hidden md:block mt-8 space-y-4">
              <div className="h-6 bg-gray-200/80 rounded w-32 mb-2" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-full" />
                <div className="h-4 bg-gray-200/80 rounded w-11/12" />
                <div className="h-4 bg-gray-200/80 rounded w-4/5" />
              </div>
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                    <div className="h-4 bg-gray-200/80 rounded w-20" />
                    <div className="h-4 bg-gray-200/80 rounded w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Options & Add to Cart */}
          <div className="lg:col-span-2 mt-6 md:mt-0 space-y-6">
            <div className="h-8 bg-gray-200/80 rounded w-3/4" />
            
            {/* Rating & Wishlist */}
            <div className="flex justify-between items-center py-2">
              <div className="h-5 bg-gray-200/80 rounded w-32" />
              <div className="h-6 w-6 bg-gray-200/80 rounded-full" />
            </div>

            {/* Metal Selector */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-24" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-24 bg-gray-200/80 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Gemstone Selector */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200/80 rounded w-28" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-24 bg-gray-200/80 rounded-sm" />
                ))}
              </div>
            </div>

            {/* Ring Size / Engraving Row */}
            <div className="flex gap-4">
              <div className="h-10 w-36 bg-gray-200/80 rounded-sm" />
              <div className="h-10 w-36 bg-gray-200/80 rounded-sm" />
            </div>

            {/* Price */}
            <div className="h-8 bg-gray-200/80 rounded w-44 pt-2" />

            {/* Add to Cart Button */}
            <div className="h-12 bg-gray-200/80 rounded-sm w-full mt-8" />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

/**
 * Admin products skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading bar and four row
 * bars to indicate the admin products table is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function AdminProductsSkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="h-9 bg-gray-200/80 rounded-sm w-48" />
        <div className="h-10 bg-gray-200/80 rounded-sm w-36" />
      </div>
      <div className="border border-gray-200/70 rounded-sm overflow-hidden divide-y divide-gray-100">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200/80 rounded-sm flex-shrink-0" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/80 rounded w-48" />
                <div className="h-3 bg-gray-200/80 rounded w-24" />
              </div>
            </div>
            <div className="h-8 bg-gray-200/80 rounded-sm w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

