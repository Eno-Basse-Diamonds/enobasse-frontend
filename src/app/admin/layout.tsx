"use client";

import {
  Home,
  Package,
  Users,
  Settings,
  FileText,
  BarChart3,
  Folder,
  TriangleAlert,
  MessageSquare,
  Truck,
} from "lucide-react";
import { Button } from "@/components";
import { AdminSidebarNavigation } from "./_components/admin-sidebar-navigation";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard", active: pathname === "/admin/dashboard" },
    {
      icon: Folder,
      label: "Collections",
      href: "/admin/collections",
      active: pathname === "/admin/collections",
    },
    {
      icon: Package,
      label: "Products",
      href: "/admin/products",
      active: pathname === "/admin/products",
    },
    {
      icon: Truck,
      label: "Orders",
      href: "/admin/orders",
      active: pathname === "/admin/orders",
    },
    { icon: FileText, label: "Blog", href: "/admin/blog", active: pathname === "/admin/blog" },
    {
      icon: MessageSquare,
      label: "Testimonials",
      href: "/admin/testimonials",
      active: pathname === "/admin/testimonials",
    },
    {
      icon: Users,
      label: "Accounts",
      href: "/admin/accounts",
      active: pathname === "/admin/accounts",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ];

  return (
    <>
      <div className="hidden lg:flex h-full bg-gray-50">
        <AdminSidebarNavigation sidebarItems={sidebarItems} />
        <div className="flex-1 ml-72 bg-gray-100 min-h-screen">{children}</div>
      </div>

      <div className="lg:hidden flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-red-500 mb-4">
            <TriangleAlert className="h-12 w-12 mx-auto" />
          </div>
          <h1 className="font-primary text-2xl font-bold text-primary-500">
            Access Restricted
          </h1>
          <p className="text-primary-300">
            Admin dashboard is only available on desktop devices.
          </p>
          <div className="pt-4">
            <Button href="/">Go Home</Button>
          </div>
        </div>
      </div>
    </>
  );
}
