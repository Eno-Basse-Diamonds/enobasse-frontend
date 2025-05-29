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
import "./styles.scss";

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
      <div className="admin-layout">
        <SidebarNavigation sidebarItems={sidebarItems} />
        <div className="admin-layout__content">{children}</div>
      </div>

      <div className="mobile-restricted-view">
        <div className="mobile-restricted-view__container">
          <div className="mobile-restricted-view__icon">
            <TriangleAlert />
          </div>
          <h1 className="mobile-restricted-view__title">Access Restricted</h1>
          <p className="mobile-restricted-view__message">
            Admin dashboard is only available on tablet and desktop devices.
          </p>
          <div className="mobile-restricted-view__button">
            <Button href="/">Go Home</Button>
          </div>
        </div>
      </div>
    </>
  );
}
