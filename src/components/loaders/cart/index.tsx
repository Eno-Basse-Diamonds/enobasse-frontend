export const CartLoader = () => {
  return (
    <div className="my-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mt-6 md:gap-6 lg:flex lg:items-start">
          <div className="bg-white overflow-hidden mx-auto w-full lg:max-w-xl xl:max-w-2xl">
            <ul className="divide-y divide-gray-100">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="py-6 transition-colors">
                  <div className="flex gap-4">
                    <div className="shrink-0 relative w-32 h-32 md:w-40 md:h-40 bg-gray-200 animate-pulse"></div>

                    <div className="flex flex-col flex-1 justify-between">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="h-5 w-48 bg-gray-200 animate-pulse"></div>
                          <div className="h-4 w-64 bg-gray-200 animate-pulse"></div>
                          <div className="h-5 w-24 bg-gray-200 animate-pulse"></div>
                        </div>
                        <div className="h-5 w-5 bg-gray-200 animate-pulse"></div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-24 bg-gray-200 animate-pulse"></div>
                          <div className="h-8 w-20 bg-gray-200 animate-pulse"></div>
                        </div>
                        <div className="h-5 w-32 bg-gray-200 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 mx-auto max-w-4xl flex-1 space-y-6 mt-6 sm:mt-8 lg:mt-0 lg:w-full">
            <div className="h-7 w-32 bg-gray-200 animate-pulse mb-4"></div>

            <div className="space-y-3 mb-3 divide-y divide-gray-200">
              <div className="flex justify-between pt-3">
                <div className="h-4 w-20 bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
              </div>
              <div className="flex justify-between pt-3">
                <div className="h-5 w-16 bg-gray-200 animate-pulse"></div>
                <div className="h-5 w-28 bg-gray-200 animate-pulse"></div>
              </div>
            </div>

            <div className="h-12 w-full bg-gray-200 animate-pulse"></div>
            <div className="mt-4 text-center">
              <div className="h-4 w-32 bg-gray-200 animate-pulse inline-block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
