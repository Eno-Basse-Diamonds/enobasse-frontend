interface LoaderProps {
  count?: number;
}

export const BlogSectionSkeletonLoader: React.FC<LoaderProps> = ({
  count = 6,
}) => {
  return (
    <ul
      className="px-4 mt-8 grid grid-cols-1 gap-4 list-none sm:gap-5 sm:grid-cols-2 md:mt-10 md:gap-6 lg:px-8 lg:mt-12 lg:grid-cols-3"
      role="list"
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow"
        >
          <div className="h-full flex flex-col">
            <div className="h-40 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] sm:h-44 md:h-48 lg:h-52"></div>
            <div className="bg-white p-4 flex-1 flex flex-col sm:p-5">
              <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] mb-2 w-3/4 animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

              <div className="mt-2 flex-1 flex flex-col gap-2">
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-full animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-10/12 animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-2/3 animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
              </div>

              <div className="inline-flex items-center gap-2 mt-4">
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-16 animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                <div className="h-1 w-1 bg-gray-200"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-20 animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
};

export const BlogPostDetailLoader: React.FC = () => {
  return (
    <main
      className="px-4 animate-pulse lg:px-8"
      style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
    >
      <div
        className="mt-6 h-10 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] mb-8 animate-shimmer"
        style={{ animation: "shimmer 1.5s infinite" }}
      ></div>

      <section className="mb-12">
        <div
          className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer md:h-96"
          style={{ animation: "shimmer 1.5s infinite" }}
        ></div>
        <div className="mt-4 flex justify-between">
          <div
            className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-1/4 animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
          <div
            className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-1/4 animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
        </div>
      </section>

      <section className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-3/4">
          {[...Array(10)].map((_, i) => {
            const widthClass =
              i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-10/12" : "w-2/3";
            const heightClass =
              i % 4 === 0
                ? "h-6"
                : i % 4 === 1
                ? "h-5"
                : i % 4 === 2
                ? "h-4"
                : "h-8";
            const gradientClass =
              i % 2 === 0
                ? "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                : "bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50";

            return (
              <div
                key={i}
                className={`${gradientClass} bg-[length:200%_100%] ${heightClass} ${widthClass} animate-shimmer`}
                style={{ animation: "shimmer 1.5s infinite" }}
              ></div>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 lg:w-1/4">
          <div className="flex flex-col gap-3">
            <div
              className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-3/4 animate-shimmer"
              style={{ animation: "shimmer 1.5s infinite" }}
            ></div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] ml-4 animate-shimmer"
                style={{
                  animation: "shimmer 1.5s infinite",
                  width: `${60 + i * 10}%`,
                }}
              ></div>
            ))}
          </div>

          <div className="hidden mt-16 flex-col gap-4 lg:flex">
            <div
              className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-3/4 animate-shimmer"
              style={{ animation: "shimmer 1.5s infinite" }}
            ></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="h-16 w-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer"
                  style={{ animation: "shimmer 1.5s infinite" }}
                ></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div
                    className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-full animate-shimmer"
                    style={{ animation: "shimmer 1.5s infinite" }}
                  ></div>
                  <div
                    className="h-3 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] w-3/4 animate-shimmer"
                    style={{ animation: "shimmer 1.5s infinite" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-4 lg:hidden">
        <div
          className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-3/4 mb-6 animate-shimmer"
          style={{ animation: "shimmer 1.5s infinite" }}
        ></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div
                className="h-40 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer"
                style={{ animation: "shimmer 1.5s infinite" }}
              ></div>
              <div
                className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-10/12 animate-shimmer"
                style={{ animation: "shimmer 1.5s infinite" }}
              ></div>
              <div
                className="h-3 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] w-3/4 animate-shimmer"
                style={{ animation: "shimmer 1.5s infinite" }}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export const AdminBlogSkeletonLoader: React.FC<LoaderProps> = ({
  count = 6,
}) => {
  return (
    <div className="relative mt-6">
      <div className="absolute top-0 right-6 h-10 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] w-24 animate-[shimmer_1.5s_infinite,pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="grid grid-cols-1 gap-6 p-6 pt-16 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <AdminBlogSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

const AdminBlogSkeletonCard: React.FC = () => {
  return (
    <div
      className="bg-white shadow-sm overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow animate-pulse"
      style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
    >
      <div
        className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] relative overflow-hidden animate-shimmer"
        style={{ animation: "shimmer 1.5s infinite" }}
      >
        <div
          className="absolute top-3 right-3 h-6 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] w-16 animate-shimmer"
          style={{ animation: "shimmer 1.5s infinite" }}
        ></div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <div
            className="h-5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] mb-1 w-3/4 animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
          <div
            className="h-5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] mb-1 w-1/2 animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <div
            className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-full animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
          <div
            className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-full animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
          <div
            className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-10/12 animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-sm mb-6">
          <div className="flex items-center">
            <div
              className="w-4 h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] mr-1 animate-shimmer"
              style={{ animation: "shimmer 1.5s infinite" }}
            ></div>
            <div
              className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-20 animate-shimmer"
              style={{ animation: "shimmer 1.5s infinite" }}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] mr-1 animate-shimmer"
              style={{ animation: "shimmer 1.5s infinite" }}
            ></div>
            <div
              className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] w-16 animate-shimmer"
              style={{ animation: "shimmer 1.5s infinite" }}
            ></div>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <div
            className="h-10 w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-[length:200%_100%] animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
          <div
            className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] border border-gray-300 animate-shimmer"
            style={{ animation: "shimmer 1.5s infinite" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
