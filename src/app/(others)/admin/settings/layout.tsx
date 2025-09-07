import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { useAccountByEmail } from "@/lib/hooks/use-accounts";

export const metadata: Metadata = {
  title: "Admin Settings",
};

interface AdminReviewsLayoutProps {
  children: React.ReactNode;
}

export default async function AdminSettingsLayout({
  children,
}: AdminReviewsLayoutProps) {
  const queryClient = new QueryClient();
  const session = await getServerSession();

  await queryClient.prefetchQuery({
    queryKey: ["account"],
    queryFn: () => useAccountByEmail(session?.user?.email),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
