interface LoaderProps {
  count?: number;
}

export const ProductListLoader: React.FC<LoaderProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="relative bg-white overflow-hidden flex flex-col animate-pulse"
        >
          <div className="h-full flex flex-col">
            <div className="relative aspect-square overflow-hidden border border-gray-200 bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
            </div>
            <div className="mt-4 flex flex-col flex-grow">
              <div className="h-5 w-3/4 bg-gray-200 mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 mt-auto"></div>
            </div>
          </div>

          <div className="absolute top-2 left-2 bg-white/80 rounded-full p-2 h-8 w-8"></div>

          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-2 h-8 w-8"></div>
        </div>
      ))}
    </div>
  );
};

export const ProductsPageLoader: React.FC<LoaderProps> = ({ count = 8 }) => {
  return (
    <div>
      <div className="h-8 bg-gray-100 mb-8 w-full"></div>

      <div className="mb-12">
        <div>
          <div className="h-96 inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>
        </div>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-1/4 space-y-6">
          <div className="h-2 bg-gray-100"></div>
          <div className="space-y-3">
            <div className="h-6 w-1/2 bg-gray-100"></div>
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-5 w-full bg-gray-100"></div>
            ))}
          </div>
          <div className="h-2 bg-gray-100"></div>
          <div className="space-y-3">
            <div className="h-6 w-1/2 bg-gray-100"></div>
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-5 w-full bg-gray-100"></div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="lg:hidden mb-6 h-12 bg-gray-100"></div>
          <div className="flex justify-between items-center mb-8">
            <div className="h-5 w-24 bg-gray-100"></div>
            <div className="h-10 w-36 bg-gray-100"></div>
          </div>
          <ProductListLoader count={count} />
        </div>
      </div>
    </div>
  );
};

export const ProductDetailPageLoader: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex space-x-2">
        <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
        <div className="h-4 w-4 bg-gray-200 animate-pulse-slow"></div>
        <div className="h-4 w-24 bg-gray-300 animate-pulse-slow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="flex justify-end mb-4">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse-slow"></div>
          </div>

          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse-slow mb-4"></div>

          <div className="flex gap-2 overflow-x-auto py-2">
            <div className="h-16 w-16 flex-shrink-0 bg-gray-200 animate-pulse-slow"></div>
            <div className="h-16 w-16 flex-shrink-0 bg-gray-200 animate-pulse-slow"></div>
            <div className="h-16 w-16 flex-shrink-0 bg-gray-300 animate-pulse-slow"></div>
            <div className="h-16 w-16 flex-shrink-0 bg-gray-200 animate-pulse-slow"></div>
          </div>

          <div className="hidden md:block mt-8">
            <div className="h-6 w-32 bg-gray-200 mb-4 animate-pulse-slow"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse-slow"></div>
            </div>
          </div>

          <div className="hidden md:block mt-8">
            <div className="h-6 w-24 bg-gray-200 mb-4 animate-pulse-slow"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 mt-4 md:mt-0">
          <div className="sticky top-4 md:top-32 h-auto md:h-[calc(100vh-6rem)] overflow-y-auto pb-8 md:pb-0">
            <div className="space-y-6 md:space-y-7">
              <div className="h-8 w-3/4 bg-gray-200 mb-3 md:mb-5 animate-pulse-slow"></div>

              <div className="mb-6 md:mb-10 flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-24 bg-gray-200 animate-pulse-slow"></div>
                  <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
                </div>
                <div className="h-5 w-5 bg-gray-200 animate-pulse-slow"></div>
              </div>

              <div className="space-y-4">
                <div className="h-12 w-full bg-gray-200 animate-pulse-slow"></div>
                <div className="h-12 w-full bg-gray-200 animate-pulse-slow"></div>
              </div>

              <div className="flex flex-row gap-x-4 md:gap-x-14 ml-[1px]">
                <div className="h-12 w-24 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-12 w-24 bg-gray-200 animate-pulse-slow"></div>
              </div>

              <div className="h-6 w-32 bg-gray-200 animate-pulse-slow"></div>

              <div className="hidden md:flex flex-col gap-y-3 md:gap-y-4 mt-8 md:mt-12">
                <div className="h-12 w-full bg-gray-200 animate-pulse-slow"></div>
              </div>

              <div className="flex flex-col gap-y-3 md:gap-y-4 mt-8 md:mt-12 md:hidden">
                <div className="h-10 w-full bg-gray-200 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="my-4">
            <div className="h-6 w-32 bg-gray-200 mb-3 animate-pulse-slow"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse-slow"></div>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-6 w-24 bg-gray-200 mb-4 animate-pulse-slow"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminProductsSkeletonLoader: React.FC<LoaderProps> = ({
  count = 6,
}) => {
  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-6 bg-gray-200 w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 w-64 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 w-32 animate-pulse"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <div className="h-10 bg-gray-200 w-full animate-pulse"></div>
        </div>
        <div className="md:w-auto">
          <div className="h-10 bg-gray-200 w-32 animate-pulse"></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white shadow overflow-hidden border border-gray-200 flex flex-col h-full"
          >
            <div className="h-48 bg-gray-200 animate-pulse relative">
              <div className="absolute top-3 left-3">
                <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="h-6 w-20 bg-gray-300 animate-pulse"></div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="h-6 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-full mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-2/3 mb-4 animate-pulse"></div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-12 bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
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
};
