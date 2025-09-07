import { memo } from "react";

interface LoaderProps {
  count?: number;
}

export const CollectionListLoader: React.FC<LoaderProps> = ({ count = 6 }) => {
  return (
    <div className="grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="group flex flex-col h-full">
          <div className="relative w-full h-40 sm:h-48 md:h-60 lg:h-80 overflow-hidden bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>
          </div>
          <div className="mt-4 flex flex-col flex-grow space-y-2">
            <div className="h-6 w-4/5 bg-gray-200"></div>
            <div className="h-4 w-2/5 bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AdminCollectionsSkeletonLoader = memo(
  function AdminCollectionsSkeletonLoader() {
    return (
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-6 bg-gray-200 w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 w-32 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow overflow-hidden border border-gray-200 flex flex-col h-full"
            >
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="h-6 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-full mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-2/3 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-1/3 mb-6 animate-pulse"></div>
                </div>
                <div className="flex space-x-3 w-full">
                  <div className="h-10 bg-gray-200 flex-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 flex-1 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
