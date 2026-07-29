import Image from "next/image";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { LogOut, X } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: any;
  active: boolean;
}

interface SidebarNavigationProps {
  sidebarItems: SidebarItem[];
  onItemClick?: () => void;
}

export const AdminSidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sidebarItems,
  onItemClick,
}) => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            className="w-10 h-10 bg-transparent"
            src="https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png"
            alt="Eno Bassé logo"
            quality={100}
            height={100}
            width={100}
          />
        </div>
        <button
          onClick={onItemClick}
          className="lg:hidden p-2 text-primary-500 hover:text-secondary-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="mt-2 flex-1">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={onItemClick}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              item.active
                ? "bg-secondary-500/10 border-r-2 border-secondary-500"
                : "text-primary-500 hover:text-secondary-500"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3 text-primary-200 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-full flex items-center px-6 py-3 text-left transition-colors text-primary-500 hover:text-secondary-500 border-t border-gray-200"
      >
        <LogOut className="w-5 h-5 mr-3 text-primary-200 shrink-0" />
        <span className="truncate">Sign Out</span>
      </button>
    </div>
  );
};
