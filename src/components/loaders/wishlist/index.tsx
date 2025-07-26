export const WishlistLoader = () => {
  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="bg-white overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="py-4 transition-colors">
              <div className="flex gap-4">
                <div className="shrink-0 relative w-24 h-24 md:w-40 md:h-40 overflow-hidden border border-gray-200 bg-gray-200 animate-pulse"></div>


                <div className="flex flex-col flex-1">
                  <div className="flex justify-between gap-2">
                    <div className="space-y-2">
                      <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex gap-3">
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

