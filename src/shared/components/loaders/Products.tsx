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
          <div className="relative aspect-square w-full border border-gray-200 bg-gray-200/80 rounded-sm">
            {/* Wishlist icon skeleton */}
            <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-300/80" />
            {/* Badge skeleton */}
            <div className="absolute bottom-2 right-2 h-5 w-14 bg-gray-300/80 rounded-sm" />
          </div>
          {/* Product Info skeleton */}
          <div className="mt-4 flex flex-col flex-grow">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Products page skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading, filter bar,
 * and matching product grid cards to indicate the full product listing page is loading.
 *
 * @returns An animated skeleton placeholder matching the Products Page UI.
 */
export function ProductsPageLoader() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Page Title & Subtitle skeleton */}
      <div className="flex flex-col items-center justify-center space-y-3 py-6">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-4 bg-gray-200 rounded w-72" />
      </div>
      {/* Filter / Sort Bar skeleton */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="h-9 bg-gray-200 rounded w-28" />
        <div className="h-9 bg-gray-200 rounded w-36" />
      </div>
      {/* Product List Grid */}
      <ProductListLoader count={8} />
    </div>
  );
}

/**
 * Product detail page skeleton loader.
 *
 * @description Renders a pulsing two-column layout with an image placeholder on
 * the left and title, price, and description lines on the right.
 *
 * @returns An animated skeleton placeholder.
 */
export function ProductDetailPageLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 rounded" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 w-3/4" />
          <div className="h-6 bg-gray-200 w-1/4" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 w-full" />
            ))}
          </div>
        </div>
      </div>
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
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 w-48" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
