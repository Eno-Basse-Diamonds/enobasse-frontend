import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Reviews Management",
};

export default function AdminReviewsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}