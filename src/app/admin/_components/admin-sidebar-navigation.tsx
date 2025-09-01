import Image from "next/image";
import Link from "next/link";

interface SidebarItem {
  label: string;
  href: string;
  icon: any;
  active: boolean;
}

interface SidebarNavigationProps {
  sidebarItems: SidebarItem[];
}

export const AdminSidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sidebarItems,
}) => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 fixed top-0 left-0 h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Image
            className="w-10 h-10"
            src="https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png"
            alt="Eno Bassé logo"
            quality={100}
            height={100}
            width={100}
          />
        </div>
      </div>
      <nav className="mt-2">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
              item.active
                ? "bg-secondary-500/10 border-r-2 border-secondary-500"
                : "text-primary-500 hover:text-secondary-500"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3 text-primary-200" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
