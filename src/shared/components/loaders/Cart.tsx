/**
 * Cart page skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading bar and three
 * cart-item-sized blocks to indicate the cart is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function CartLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 w-48" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
