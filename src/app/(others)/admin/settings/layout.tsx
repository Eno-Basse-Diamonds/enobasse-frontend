import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Settings",
};

export default function AdminSettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
