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
    <div className="animate-pulse">
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
