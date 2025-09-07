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

  const filterOptions = {
    page: 1,
    pageSize: 10,
    sortBy: "createdAt",
    sortOrder: "DESC",
  };

  await queryClient.prefetchQuery({
    queryKey: ["adminAccounts", filterOptions],
    queryFn: () => getAllAccounts(filterOptions),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
