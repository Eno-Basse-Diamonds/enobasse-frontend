import { Metadata } from "next";
import { PageHeading } from "@/components";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-12 min-h-screen">
      <PageHeading title="Account" />
      {children}
    </div>
  );
}
