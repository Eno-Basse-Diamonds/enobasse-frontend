interface LoaderProps {
  count?: number;
}

export const CollectionListLoader: React.FC<LoaderProps> = ({ count = 6 }) => {
  return (
    <div className="grid gap-y-10 gap-x-6 grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse group flex flex-col h-full">
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
