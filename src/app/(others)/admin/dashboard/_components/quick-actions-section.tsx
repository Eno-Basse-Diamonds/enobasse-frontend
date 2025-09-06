import { Package, Folder, FileText, Truck } from "lucide-react";
import Link from "next/link";

export const QuickActionsSection = () => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <QuickActionLink
        href="/admin/products"
        icon={<Package className="h-8 w-8 text-purple-600 mr-3" />}
        title="Add Product"
        description="Create new product"
      />

      <QuickActionLink
        href="/admin/collections"
        icon={<Folder className="h-8 w-8 text-indigo-600 mr-3" />}
        title="New Collection"
        description="Create collection"
      />

      <QuickActionLink
        href="/admin/blog"
        icon={<FileText className="h-8 w-8 text-green-600 mr-3" />}
        title="Write Post"
        description="Create blog post"
      />

      <QuickActionLink
        href="/admin/orders"
        icon={<Truck className="h-8 w-8 text-blue-600 mr-3" />}
        title="View Orders"
        description="Manage orders"
      />
    </div>
  </div>
);

const QuickActionLink = ({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Link
    href={href}
    className="bg-white shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center">
      {icon}
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </Link>
);
