import Link from "next/link";
import { ChevronDown } from "lucide-react";

type NavigationItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  action?: () => void;
};


interface DesktopNavigationProps {
  items: NavigationItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function DesktopNavigation({
  items,
  activeTab,
  onTabChange,
}: DesktopNavigationProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <Icon size={18} />
              <span className="font-light">{item.label}</span>
            </Link>
          );
        }

        if (item.action) {
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
            >
              <Icon size={18} />
              <span className="font-light">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
              activeTab === item.id
                ? "bg-gray-50 text-gray-900 border-r-2 border-secondary-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Icon size={18} />
            <span className="font-light">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

interface MobileNavigationProps {
  items: NavigationItem[];
  activeTab: string;
  isOpen: boolean;
  onToggle: () => void;
  onTabChange: (tabId: string) => void;
  onItemClick: () => void;
}

export function MobileNavigation({
  items,
  activeTab,
  isOpen,
  onToggle,
  onTabChange,
  onItemClick,
}: MobileNavigationProps) {
  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 border border-gray-300 bg-white text-gray-900"
      >
        <span className="font-light">{activeItem?.label || "Menu"}</span>
        <ChevronDown
          size={20}
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="border border-gray-300 border-t-0 bg-white">
          <nav className="space-y-1 p-2">
            {items.map((item) => {
              const Icon = item.icon;
              if (item.action) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action?.();
                      onItemClick();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                  >
                    <Icon size={18} />
                    <span className="font-light">{item.label}</span>
                  </button>
                );
              }

              if (item.href) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onItemClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                  >
                    <Icon size={18} />
                    <span className="font-light">{item.label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onItemClick();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-gray-50 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-light">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
