import { TrendingDown, TrendingUp } from "lucide-react";

export const StatsCard = ({
  title,
  value,
  icon,
  bgColor,
  iconColor,
  compact = false,
  trend,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor?: string;
  compact?: boolean;
  trend?: { direction: "up" | "down"; percentage: number };
}) => (
  <div className={`bg-white rounded-sm border border-gray-200 ${compact ? "p-4" : "p-6"}`}>
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline gap-2">
          <p
            className={`${compact ? "text-xl" : "text-3xl"} font-bold text-gray-900 tracking-tight`}
          >
            {value.toLocaleString()}
          </p>
          {trend && (
            <span
              className={`inline-flex items-center text-xs font-medium ${
                trend.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-0.5" />
              )}
              {trend.percentage}%
            </span>
          )}
        </div>
      </div>
      <div
        className={`h-12 w-12 ${bgColor} rounded-sm flex items-center justify-center ${
          iconColor || ""
        }`}
      >
        {icon}
      </div>
    </div>
  </div>
);
