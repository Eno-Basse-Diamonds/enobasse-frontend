import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllAccounts } from "@/lib/api/account";

export const metadata: Metadata = {
  title: "Admin Accounts Management",
};

interface AdminAccountsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminAccountsLayout({
  children,
}: AdminAccountsLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["adminAccounts", { page: 1, pageSize: 10 }],
    queryFn: () => getAllAccounts({ page: 1, pageSize: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
