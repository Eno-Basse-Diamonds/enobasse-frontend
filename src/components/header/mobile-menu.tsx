"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRightIcon, ArrowLeftIcon } from "lucide-react";
import { CurrencyDropdown } from "../dropdown";
import { Socials } from "./socials";
import { DropdownNavigation } from "./types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openDropdown: string | null;
  onToggleDropdown: (id: string) => void;
  mainNavItems?: DropdownNavigation[];
  utilityNavItems?: DropdownNavigation[];
}

interface MobileNavItemProps {
  item: DropdownNavigation;
  onOpenSubMenu: (item: DropdownNavigation) => void;
  onCloseMenu: () => void;
  isLastItem?: boolean;
}

interface SubMenuProps {
  isOpen: boolean;
  onClose: () => void;
  item: DropdownNavigation;
  onCloseMainMenu: () => void;
}

const SubMenu: React.FC<SubMenuProps> = ({
  isOpen,
  onClose,
  item,
  onCloseMainMenu,
}) => {
  return (
    <div
      className={`header__mobile-submenu ${
        isOpen ? "header__mobile-submenu--open" : ""
      }`}
    >
      <div className="header__mobile-submenu-content">
        <div className="header__mobile-submenu-header">
          <button onClick={onClose} aria-label="Go back">
            <ArrowLeftIcon />
          </button>
        </div>
        <h2 className="header__mobile-submenu-title">{item.title}</h2>
        <nav className="header__mobile-submenu-nav">
          <ul className="header__mobile-submenu-list">
            {item.dropdownItems?.map((subItem) => (
              <li key={subItem.href} className="header__mobile-submenu-item">
                <Link
                  href={subItem.href}
                  className="header__mobile-submenu-link"
                  onClick={onCloseMainMenu}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  item,
  onOpenSubMenu,
  onCloseMenu,
  isLastItem = false,
}) => {
  const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

  const itemClass = `header__mobile-nav-item ${
    isLastItem ? "header__last-nav-item" : ""
  }`;

  if (!item.href && hasDropdown) {
    return (
      <li className={itemClass}>
        <div className="header__mobile-nav-item-wrapper">
          <button
            className="header__mobile-nav-link"
            onClick={() => onOpenSubMenu(item)}
          >
            {item.title}
          </button>
          <button
            className="header__mobile-nav-chevron"
            onClick={() => onOpenSubMenu(item)}
            aria-label={`Open ${item.title} submenu`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </li>
    );
  }

  if (!item.href && !hasDropdown) {
    return (
      <li className={itemClass}>
        <span className="header__mobile-nav-title">{item.title}</span>
      </li>
    );
  }

  if (item.href && !hasDropdown) {
    return (
      <li className={itemClass}>
        <Link
          href={item.href}
          className="header__mobile-nav-link"
          onClick={onCloseMenu}
        >
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li className={itemClass}>
      <div className="header__mobile-nav-item-wrapper">
        <Link
          href={item.href!}
          className="header__mobile-nav-link"
          onClick={onCloseMenu}
        >
          {item.title}
        </Link>
        <button
          className="header__mobile-nav-chevron"
          onClick={() => onOpenSubMenu(item)}
          aria-label={`Open ${item.title} submenu`}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  mainNavItems,
  utilityNavItems,
}) => {
  const otherNavItems = [
    {
      id: "create-your-custom-jewelry",
      title: "Create Your Custom Jewelry",
      dropdownItems: [
        { label: "Design Your Ring", href: "/creative-studio" },
        { label: "Custom Jewelry Design", href: "/custom-design" },
        { label: "Book a Consultation", href: "https://wa.me/2349164886579" },
      ],
    },
    {
      id: "jewelry-repair",
      title: "Jewelry Repair",
      dropdownItems: [
        { label: "Ring Resizing", href: "/ring-resizing" },
        { label: "Maintenance & Repairs", href: "/maintenance-repairs" },
      ],
    },
    {
      id: "faqs-and-tesimonials",
      title: "FAQs and Testimonials",
      dropdownItems: [
        { label: "FAQs", href: "/faqs" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
  ];

  const [subMenuState, setSubMenuState] = useState<{
    isOpen: boolean;
    item: DropdownNavigation | null;
  }>({ isOpen: false, item: null });

  useEffect(() => {
    if (!isOpen) {
      setSubMenuState({ isOpen: false, item: null });
    }
  }, [isOpen]);

  const handleOpenSubMenu = (item: DropdownNavigation) => {
    setSubMenuState({ isOpen: false, item });
    requestAnimationFrame(() => {
      setSubMenuState({ isOpen: true, item });
    });
  };

  const handleCloseSubMenu = () => {
    setSubMenuState((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => setSubMenuState({ isOpen: false, item: null }), 300);
  };

  const allNavItems = [
    ...(mainNavItems ?? []),
    ...otherNavItems,
    ...(utilityNavItems ?? []),
  ];

  return (
    <>
      <div
        className={`header__mobile-menu ${
          isOpen ? "header__mobile-menu--open" : ""
        }`}
      >
        <div className="header__mobile-menu-container">
          <div className="mt-3 flex justify-center px-4">
            <CurrencyDropdown />
          </div>
          <nav className="header__mobile-nav" aria-label="Mobile menu">
            <ul className="header__mobile-nav-list">
              {allNavItems.map((item, index) => (
                <MobileNavItem
                  key={item.id}
                  item={item}
                  onOpenSubMenu={handleOpenSubMenu}
                  onCloseMenu={onClose}
                  isLastItem={index === allNavItems.length - 1}
                />
              ))}
            </ul>
          </nav>

          <div className="header__mobile-menu-footer">
            <Socials />
          </div>
        </div>
      </div>

      {subMenuState.item && (
        <SubMenu
          isOpen={isOpen && subMenuState.isOpen}
          onClose={handleCloseSubMenu}
          item={subMenuState.item}
          onCloseMainMenu={onClose}
        />
      )}
    </>
  );
};
