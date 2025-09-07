import { PageHeading } from "@/components/page-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-12 min-h-screen">
      <PageHeading title="Shopping Cart" />
      {children}
    </div>
  );
}
