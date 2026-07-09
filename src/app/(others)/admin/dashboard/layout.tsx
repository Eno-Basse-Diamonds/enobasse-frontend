import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return <>{children}</>;
}