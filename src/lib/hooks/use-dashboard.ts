import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, DashboardStats } from "../api/dashboard";

export function useDashboardStats() {
  return useQuery<DashboardStats, Error>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
}
