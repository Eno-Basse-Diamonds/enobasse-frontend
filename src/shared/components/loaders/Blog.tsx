/**
 * Blog section skeleton loader.
 *
 * @description Renders a pulsing placeholder grid with a heading bar and three
 * tall cards to indicate blog content is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function BlogSectionSkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}

/**
 * Blog post detail skeleton loader.
 *
 * @description Renders a pulsing placeholder with a large hero image, title
 * bar, and several text lines to indicate a blog article is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function BlogPostDetailLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-96 bg-gray-200 rounded" />
      <div className="h-8 bg-gray-200 w-3/4" />
      <div className="h-4 bg-gray-200 w-1/2" />
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 w-full" />
        ))}
      </div>
    </div>
  );
}

/**
 * Admin blog list skeleton loader.
 *
 * @description Renders a pulsing placeholder with a heading bar and four row
 * bars to indicate the admin blog table is loading.
 *
 * @returns An animated skeleton placeholder.
 */
export function AdminBlogSkeletonLoader() {
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
