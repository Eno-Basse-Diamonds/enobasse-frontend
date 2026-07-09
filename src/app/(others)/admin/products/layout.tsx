import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Products Management",
};

export default function AdminProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}