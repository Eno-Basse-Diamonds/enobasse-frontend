import { PageHeading } from "@/components/page-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <PageHeading title="Checkout" />
      {children}
    </div>
  );
}
