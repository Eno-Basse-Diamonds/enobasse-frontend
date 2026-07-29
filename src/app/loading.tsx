import { SectionContainer } from "@/shared/components/SectionContainer";

export default function Loading() {
  return (
    <div className="min-h-screen py-12 animate-pulse">
      <SectionContainer id="page-loading">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center justify-center py-6 mb-8">
          <div className="h-8 bg-gray-200/80 rounded w-48 mb-3" />
          <div className="h-4 bg-gray-200/80 rounded w-72" />
        </div>

        {/* Content Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <div className="aspect-square w-full bg-gray-200/80 rounded-sm" />
              <div className="h-4 bg-gray-200/80 rounded w-3/4" />
              <div className="h-4 bg-gray-200/80 rounded w-1/3" />
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}

