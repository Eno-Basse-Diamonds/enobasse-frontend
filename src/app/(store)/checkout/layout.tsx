import { Metadata } from "next";

import { PageHeading } from "@/shared/components/PageHeading";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 py-12 min-h-[88dvh] lg:min-h-screen">
      <PageHeading title="Checkout" />
      {children}
    </div>
  );
}
