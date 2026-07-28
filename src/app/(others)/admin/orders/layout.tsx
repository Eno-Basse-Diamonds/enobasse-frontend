import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Orders",
};

export default function AdminOrdersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
