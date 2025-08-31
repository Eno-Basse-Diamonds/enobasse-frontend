import {
  Home,
  Package,
  Users,
  Settings,
  FileText,
  BarChart3,
  Folder,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components";
import { SidebarNavigation } from "./_components/sidebar-navigation";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard", active: false },
    {
      icon: Folder,
      label: "Collections",
      href: "/admin/collections",
      active: false,
    },
    {
      icon: Package,
      label: "Products",
      href: "/admin/products",
      active: false,
    },
    { icon: FileText, label: "Blog", href: "/admin/blog", active: true },
    {
      icon: Users,
      label: "Customers",
      href: "/admin/customers",
      active: false,
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/admin/analytics",
      active: false,
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/settings",
      active: false,
    },
  ];

  return (
    <>
      <div className="hidden md:flex h-full bg-gray-50">
        <SidebarNavigation sidebarItems={sidebarItems} />
        <div className="flex-1 ml-72 bg-gray-100">{children}</div>
      </div>

      <div className="md:hidden flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-red-500 mb-4">
            <TriangleAlert className="h-12 w-12 mx-auto" />
          </div>
          <h1 className="font-primary text-2xl font-bold text-primary-500">
            Access Restricted
          </h1>
          <p className="text-primary-300">
            Admin dashboard is only available on tablet and desktop devices.
          </p>
          <div className="pt-4">
            <Button href="/">Go Home</Button>
          </div>
        </div>
      </div>
    </>
  );
}
