import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAccountByEmail } from "@/lib/api/account";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
}
