import { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-12 min-h-[88dvh] lg:min-h-screen">
      <PageHeading title="Shopping Cart" />
      {children}
    </div>
  );
}
