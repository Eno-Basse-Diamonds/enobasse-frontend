import { SectionContainer } from "@/shared/components/SectionContainer";

/**
 * Blog section skeleton loader.
 *
 * @description Renders a pulsing grid matching BlogCard layout: image header on top,
 * title, excerpt, and author/date footer inside border card.
 *
 * @returns An animated skeleton placeholder.
 */
export function BlogSectionSkeletonLoader({
  count = 6,
}: {
  count?: number;
} = {}) {
  return (
    <SectionContainer id="blog-posts" className="mt-8 md:mt-12 lg:mt-16 animate-pulse">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="border border-secondary-200 overflow-hidden rounded-sm bg-white flex flex-col h-full">
            {/* Blog Image Skeleton */}
            <div className="h-60 lg:h-72 w-full bg-gray-200/80 flex-shrink-0" />
            {/* Blog Body Skeleton */}
            <div className="p-4 sm:p-5 flex-grow flex flex-col space-y-3">
              <div className="h-6 bg-gray-200/80 rounded w-5/6" />
              <div className="space-y-2 flex-grow">
                <div className="h-4 bg-gray-200/80 rounded w-full" />
                <div className="h-4 bg-gray-200/80 rounded w-11/12" />
                <div className="h-4 bg-gray-200/80 rounded w-4/5" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <div className="h-4 bg-gray-200/80 rounded w-24" />
                <div className="h-4 bg-gray-200/80 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

/**
 * Blog post detail skeleton loader.
 *
 * @description Renders a pulsing placeholder with article title, meta header,
 * main hero image, and content paragraph blocks matching BlogPostDetail page.
 *
 * @returns An animated skeleton placeholder matching Blog Post detail UI.
 */
export function BlogPostDetailLoader() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6 animate-pulse space-y-6">
      {/* Title & Metadata */}
      <div className="space-y-3 text-center md:text-left">
        <div className="h-8 md:h-10 bg-gray-200/80 rounded w-3/4" />
        <div className="h-4 bg-gray-200/80 rounded w-48" />
      </div>

      {/* Main Post Image */}
      <div className="h-64 sm:h-96 md:h-[450px] w-full bg-gray-200/80 rounded-sm" />

      {/* Article Content Paragraphs */}
      <div className="space-y-6 pt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200/80 rounded w-full" />
            <div className="h-4 bg-gray-200/80 rounded w-11/12" />
            <div className="h-4 bg-gray-200/80 rounded w-4/5" />
            <div className="h-4 bg-gray-200/80 rounded w-9/12" />
          </div>
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
    <div className="animate-pulse space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="h-9 bg-gray-200/80 rounded-sm w-48" />
        <div className="h-10 bg-gray-200/80 rounded-sm w-36" />
      </div>
      <div className="border border-gray-200/70 rounded-sm overflow-hidden divide-y divide-gray-100">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 bg-gray-200/80 rounded-sm flex-shrink-0" />
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

