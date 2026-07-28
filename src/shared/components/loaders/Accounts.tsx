/**
 * Account page loading skeleton.
 *
 * @description Renders a pulsing placeholder with a heading bar and four list
 * item bars to indicate content is loading on account-related pages.
 *
 * @returns An animated skeleton placeholder.
 */
export function AccountLoadingSkeleton() {
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
