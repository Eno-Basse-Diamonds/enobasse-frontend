
export const StatsCard = ({
  title, value, icon, bgColor, compact = false,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  compact?: boolean;
}) => (
  <div
    className={`bg-white shadow-sm rounded-sm border border-gray-200 ${compact ? "p-4" : "p-6"}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p
          className={`${compact ? "text-xl" : "text-2xl"} font-bold text-gray-900`}
        >
          {value.toLocaleString()}
        </p>
      </div>
      <div className={`h-12 w-12 ${bgColor} rounded-sm flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);
