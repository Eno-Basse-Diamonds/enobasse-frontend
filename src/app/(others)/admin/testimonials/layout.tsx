import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Testimonials Management",
};

export default function AdminTestimonialsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}