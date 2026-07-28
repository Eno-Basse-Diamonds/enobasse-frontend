/**
 * Wishlist page skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading bar and a grid of
 * three product-card-sized blocks to indicate the wishlist is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function WishlistLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
