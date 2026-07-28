import Link from "next/link";

import { ArrowRight, FileText, Folder, Package, Truck } from "lucide-react";

const actions = [
  {
    href: "/admin/products?modal=create",
    icon: Package,
    title: "Add Product",
    description: "Create new product",
    gradient: "from-purple-500/10 to-purple-500/5",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
  },
  {
    href: "/admin/collections?modal=create",
    icon: Folder,
    title: "New Collection",
    description: "Create collection",
    gradient: "from-indigo-500/10 to-indigo-500/5",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    hoverBorder: "hover:border-indigo-300",
  },
  {
    href: "/admin/blog?modal=create",
    icon: FileText,
    title: "Write Post",
    description: "Create blog post",
    gradient: "from-green-500/10 to-green-500/5",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    hoverBorder: "hover:border-green-300",
  },
  {
    href: "/admin/orders",
    icon: Truck,
    title: "View Orders",
    description: "Manage orders",
    gradient: "from-blue-500/10 to-blue-500/5",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
];

export const QuickActionsSection = () => (
  <div className="mt-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={`group relative bg-white rounded-sm border border-gray-200 p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${action.hoverBorder}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
          />
          <div className="relative flex items-start gap-4">
            <div
              className={`h-12 w-12 ${action.iconBg} rounded-sm flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`}
            >
              <action.icon className={`h-6 w-6 ${action.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-300 mt-1.5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-500" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);
