import { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useAccountByEmail } from "@/lib/hooks/use-accounts";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const session = await getServerSession();

  await queryClient.prefetchQuery({
    queryKey: ["account"],
    queryFn: () => useAccountByEmail(session?.user?.email),
  });

  return (
    <div className="my-12 min-h-[88dvh] lg:min-h-screen">
      <PageHeading title="Account" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
}
