import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Collections Management",
};

export default function AdminCollectionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
