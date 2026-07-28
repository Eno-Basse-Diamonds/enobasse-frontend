import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { getAccountByEmail } from "@/modules/account/api";
import { PageHeading } from "@/shared/components/PageHeading";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  // Route protection: redirect to sign-in if not authenticated
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["account", session.user.email],
    queryFn: () => getAccountByEmail(session.user.email as string),
  });

  return (
    <div className="my-12 min-h-[88dvh] lg:min-h-screen">
      <PageHeading title="Account" />
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
    </div>
  );
}
