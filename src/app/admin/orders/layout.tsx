import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAdminOrders } from "@/lib/api/orders";

export const metadata: Metadata = {
  title: "Admin Orders",
};

export default async function AdminOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adminOrders", { page: 1, perPage: 10 }],
    queryFn: () => getAdminOrders({ page: 1, perPage: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
