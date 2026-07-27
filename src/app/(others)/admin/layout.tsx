"use client";

import { useState } from "react";
import {
  Home,
  Package,
  Users,
  Settings,
  FileText,
  BarChart3,
  Folder,
  MessageSquare,
  Star,
  Mail,
  Truck,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { AdminSidebarNavigation } from "./_components/admin-sidebar-navigation";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard",
    },
    {
      icon: LayoutDashboard,
      label: "Homepage",
      href: "/admin/homepage",
      active: pathname === "/admin/homepage",
    },
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
    {
      icon: FileText,
      label: "Blog",
      href: "/admin/blog",
      active: pathname === "/admin/blog",
    },
    {
      icon: MessageSquare,
      label: "Testimonials",
      href: "/admin/testimonials",
      active: pathname === "/admin/testimonials",
    },
    {
      icon: Star,
      label: "Reviews",
      href: "/admin/reviews",
      active: pathname === "/admin/reviews",
    },
    {
      icon: Mail,
      label: "Newsletter",
      href: "/admin/newsletter",
      active: pathname === "/admin/newsletter",
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
        <span className="font-primary text-lg font-semibold text-primary-500 truncate">
          Admin
        </span>
      </div>

      {/* Main content */}
      <div className="lg:ml-72 pt-14 lg:pt-0 min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}