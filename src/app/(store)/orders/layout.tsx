import { Metadata } from "next";
import { PageHeading } from "@/components";

export const metadata: Metadata = {
  title: "Orders",
};


export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 md:my-12 min-h-screen">
      <div className="-mb-6 md:mb-auto">
        <PageHeading title="Order History" />
      </div>
      {children}
    </div>
  );
}
