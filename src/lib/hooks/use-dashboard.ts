import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, DashboardStats } from "../api/dashboard";

export function useDashboardStats() {
  return useQuery<DashboardStats, Error>({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });
}

export function useRecentOrders() {
  return useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const response = await fetch("/api/orders/recent?limit=4");
      return response.json();
    },
  });
}

export function useRecentReviews() {
  return useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => {
      const response = await fetch("/api/reviews/recent?limit=4");
      return response.json();
    },
  });
}
