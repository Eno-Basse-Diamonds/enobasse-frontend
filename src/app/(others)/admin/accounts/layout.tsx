import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
