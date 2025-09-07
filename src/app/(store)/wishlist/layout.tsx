import { PageHeading } from "@/components/page-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default async function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-12 min-h-[88dvh] lg:min-h-screen">
      <PageHeading title="Wishlist" />
      {children}
    </div>
  );
}
