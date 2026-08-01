"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BarChart3,
  FileText,
  Folder,
  Heart,
  Home,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";

import { AdminSidebarNavigation } from "./_components/AdminSidebarNavigation";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  // Keep the server HTML and the first client render identical. Pathname can
  // differ during rewrites or a rolling deploy, which otherwise changes the
  // active sidebar item during hydration.
  const [hydratedPathname, setHydratedPathname] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setHydratedPathname(pathname);
  }, [pathname]);

  const sidebarItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/admin/dashboard",
      active: hydratedPathname === "/admin/dashboard",
    },
    {
      icon: LayoutDashboard,
      label: "Homepage",
      href: "/admin/homepage",
      active: hydratedPathname === "/admin/homepage",
    },
    {
      icon: Folder,
      label: "Collections",
      href: "/admin/collections",
      active: hydratedPathname === "/admin/collections",
    },
    {
      icon: Package,
      label: "Products",
      href: "/admin/products",
      active: hydratedPathname === "/admin/products",
    },
    {
      icon: Truck,
      label: "Orders",
      href: "/admin/orders",
      active: hydratedPathname === "/admin/orders",
    },
    {
      icon: ShoppingBag,
      label: "Carts",
      href: "/admin/carts",
      active: hydratedPathname === "/admin/carts",
    },
    {
      icon: Heart,
      label: "Wishlists",
      href: "/admin/wishlists",
      active: hydratedPathname === "/admin/wishlists",
    },
    {
      icon: FileText,
      label: "Blog",
      href: "/admin/blog",
      active: hydratedPathname === "/admin/blog",
    },
    {
      icon: MessageSquare,
      label: "Testimonials",
      href: "/admin/testimonials",
      active: hydratedPathname === "/admin/testimonials",
    },
    {
      icon: Star,
      label: "Reviews",
      href: "/admin/reviews",
      active: hydratedPathname === "/admin/reviews",
    },
    {
      icon: Mail,
      label: "Newsletter",
      href: "/admin/newsletter",
      active: hydratedPathname === "/admin/newsletter",
    },
    {
      icon: Users,
      label: "Accounts",
      href: "/admin/accounts",
      active: hydratedPathname === "/admin/accounts",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/admin/analytics",
      active: hydratedPathname === "/admin/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/settings",
      active: hydratedPathname === "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] w-72 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <AdminSidebarNavigation
            sidebarItems={sidebarItems}
            onItemClick={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="fixed inset-y-0 left-0 z-50">
          <AdminSidebarNavigation sidebarItems={sidebarItems} />
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="-ml-2 p-2 mr-3 text-primary-500 hover:text-secondary-500"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-primary text-lg font-semibold text-primary-500 truncate">Admin</span>
      </div>

      {/* Main content */}
      <div className="lg:ml-72 pt-14 lg:pt-0 min-w-0 overflow-x-hidden">{children}</div>
    </div>
  );
}
