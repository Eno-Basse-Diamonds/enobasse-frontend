/**
 * Product list grid skeleton loader.
 *
 * @description Renders a pulsing grid with six card-sized blocks matching the
 * standard product grid layout.
 *
 * @returns An animated skeleton placeholder.
 */
export function ProductListLoader() {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-80" />
      ))}
    </div>
  );
}

/**
 * Products page skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading, sidebar filter
 * block, and six product grid cards to indicate the full product listing page
 * is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function ProductsPageLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 w-48" />
      <div className="flex gap-4">
        <div className="w-64 h-96 bg-gray-200 rounded hidden lg:block" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
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
