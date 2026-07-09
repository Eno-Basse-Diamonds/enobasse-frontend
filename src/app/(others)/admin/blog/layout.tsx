import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Blog Management",
};

export default function AdminBlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}