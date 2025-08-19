export function OrderHistoryLoader() {
  return (
    <div className="my-6 md:my-12">
      <div className="space-y-6">
        {[...Array(3)].map((_, orderIndex) => (
          <div key={orderIndex} className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="bg-gray-50 p-4 md:p-6 mb-6 animate-pulse">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-4 md:gap-6 w-full">
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-400 rounded w-24"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-400 rounded w-28"></div>
                  </div>
                  <div className="col-span-2 md:col-auto">
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-400 rounded w-16"></div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <div className="h-10 bg-gray-300 rounded w-full md:w-32 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[...Array(2)].map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`${
                    itemIndex < 1 ? "border-b border-gray-200 pb-6" : "pb-2"
                  } animate-pulse`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="mb-4 md:mb-0 flex-1">
                          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </div>
                          <div className="flex gap-4 mt-4 items-center">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <span className="text-gray-200">|</span>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="text-left md:text-right mt-4 md:mt-0">
                          <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
