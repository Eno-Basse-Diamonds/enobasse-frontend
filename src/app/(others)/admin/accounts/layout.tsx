import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Accounts Management",
};

export default function AdminAccountsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
