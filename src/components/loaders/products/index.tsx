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
            <div className="h-6 w-32 bg-gray-200 animate-pulse-slow mb-3"></div>
            <div className="h-4 bg-gray-200 animate-pulse-slow mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse-slow mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse-slow"></div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-24 bg-gray-300 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <div className="h-4 w-32 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-16 bg-gray-300 animate-pulse-slow"></div>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <div className="h-4 w-40 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-6">
            <div className="h-8 w-3/4 bg-gray-300 animate-pulse-slow"></div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-24 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse-slow"></div>
            </div>

            <div>
              <div className="h-5 w-32 bg-gray-200 animate-pulse-slow mb-3"></div>
              <div className="flex space-x-2">
                <div className="h-10 w-20 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-10 w-20 bg-gray-300 animate-pulse-slow"></div>
                <div className="h-10 w-20 bg-gray-200 animate-pulse-slow"></div>
              </div>
            </div>

            <div>
              <div className="h-5 w-40 bg-gray-200 animate-pulse-slow mb-3"></div>
              <div className="flex space-x-2">
                <div className="h-10 w-24 bg-gray-200 animate-pulse-slow"></div>
                <div className="h-10 w-24 bg-gray-300 animate-pulse-slow"></div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="h-5 w-20 bg-gray-200 animate-pulse-slow mb-3"></div>
                <div className="h-10 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex-1">
                <div className="h-5 w-24 bg-gray-200 animate-pulse-slow mb-3"></div>
                <div className="h-10 bg-gray-200 animate-pulse-slow"></div>
              </div>
            </div>

            <div className="h-7 w-40 bg-gray-300 animate-pulse-slow"></div>

            <div className="flex flex-col space-y-3">
              <div className="h-12 w-full bg-gray-300 animate-pulse-slow"></div>
              <div className="h-12 w-full bg-gray-200 animate-pulse-slow"></div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="h-6 w-32 bg-gray-200 animate-pulse-slow mb-3"></div>
          <div className="h-4 bg-gray-200 animate-pulse-slow mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse-slow mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse-slow mb-6"></div>

          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <div className="h-4 w-16 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-24 bg-gray-300 animate-pulse-slow"></div>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <div className="h-4 w-32 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-16 bg-gray-300 animate-pulse-slow"></div>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <div className="h-4 w-40 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <div className="h-7 w-40 bg-gray-300 animate-pulse-slow mx-auto mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="h-9 w-48 bg-gray-300 animate-pulse-slow mb-4"></div>
            <div className="flex items-center mb-3">
              <div className="h-6 w-32 bg-gray-200 animate-pulse-slow"></div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-4 w-12 bg-gray-200 animate-pulse-slow"></div>
                <div className="flex-1 mx-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 rounded-full w-[80%]"
                  ></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-12 bg-gray-200 animate-pulse-slow"></div>
                <div className="flex-1 mx-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 rounded-full w-[60%]"
                  ></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-12 bg-gray-200 animate-pulse-slow"></div>
                <div className="flex-1 mx-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 rounded-full w-[30%]"
                  ></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-12 bg-gray-200 animate-pulse-slow"></div>
                <div className="flex-1 mx-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 rounded-full w-[20%]"
                  ></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-12 bg-gray-200 animate-pulse-slow"></div>
                <div className="flex-1 mx-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 rounded-full w-[10%]"
                  ></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 animate-pulse-slow"></div>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-5 w-40 bg-gray-300 animate-pulse-slow mb-2"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse-slow mb-4"></div>
              <div className="h-10 w-32 bg-gray-300 animate-pulse-slow"></div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse-slow"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-300 animate-pulse-slow mb-1"></div>
                    <div className="h-3 w-24 bg-gray-200 animate-pulse-slow"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="h-4 w-16 bg-gray-200 animate-pulse-slow mb-2"></div>
              <div className="h-4 bg-gray-200 animate-pulse-slow mb-1"></div>
              <div className="h-4 bg-gray-200 animate-pulse-slow mb-1"></div>
              <div className="h-4 w-2/3 bg-gray-200 animate-pulse-slow"></div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse-slow"></div>
                  <div>
                    <div className="h-4 w-28 bg-gray-300 animate-pulse-slow mb-1"></div>
                    <div className="h-3 w-20 bg-gray-200 animate-pulse-slow"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse-slow"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 animate-pulse-slow mb-2"></div>
              <div className="h-4 bg-gray-200 animate-pulse-slow mb-1"></div>
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-start">
            <div className="aspect-square w-full max-w-md bg-gray-200 animate-pulse-slow"></div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-8 w-full bg-gray-300 animate-pulse-slow"></div>
              <div className="h-4 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 bg-gray-200 animate-pulse-slow"></div>
              <div className="h-4 w-2/3 bg-gray-200 animate-pulse-slow"></div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="h-5 w-48 bg-gray-300 animate-pulse-slow"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse-slow"></div>

              <div className="h-5 w-56 bg-gray-300 animate-pulse-slow mt-6"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse-slow"></div>

              <div className="h-5 w-32 bg-gray-300 animate-pulse-slow mt-6"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <div className="h-6 w-64 bg-gray-300 animate-pulse-slow mx-auto mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group">
            <div className="aspect-square bg-gray-200 animate-pulse-slow mb-4"></div>
            <div className="h-5 w-3/4 bg-gray-300 animate-pulse-slow mb-2"></div>
            <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
          </div>

          <div className="group">
            <div className="aspect-square bg-gray-200 animate-pulse-slow mb-4"></div>
            <div className="h-5 w-2/3 bg-gray-300 animate-pulse-slow mb-2"></div>
            <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
          </div>

          <div className="group">
            <div className="aspect-square bg-gray-200 animate-pulse-slow mb-4"></div>
            <div className="h-5 w-4/5 bg-gray-300 animate-pulse-slow mb-2"></div>
            <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
          </div>

          <div className="group">
            <div className="aspect-square bg-gray-200 animate-pulse-slow mb-4"></div>
            <div className="h-5 w-3/4 bg-gray-300 animate-pulse-slow mb-2"></div>
            <div className="h-4 w-20 bg-gray-300 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
