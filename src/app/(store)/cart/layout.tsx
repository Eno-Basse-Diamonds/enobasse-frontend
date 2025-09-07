import { Metadata } from "next";
import { PageHeading } from "@/components";

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
