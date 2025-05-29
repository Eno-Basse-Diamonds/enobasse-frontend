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

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sidebarItems,
}) => {
  return (
    <div className="sidebar-navigation">
      <div className="sidebar-navigation__header">
        <div className="sidebar-navigation__logo-container">
          <Image
            className="sidebar-navigation__logo"
            src="/images/logo.png"
            alt="Eno Basse logo"
            quality={100}
            height={100}
            width={100}
          />
        </div>
      </div>
      <nav className="sidebar-navigation__nav">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`sidebar-navigation__item ${
              item.active ? "sidebar-navigation__item--active" : ""
            }`}
          >
            <item.icon className="sidebar-navigation__item-icon" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
