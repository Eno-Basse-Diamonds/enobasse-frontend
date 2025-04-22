"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Logo } from "../logo";
import {
  AccountIcon,
  CartIcon,
  SearchIcon,
  WishlistIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "../icons";
import "./styles.scss";

interface NavigationItem {
  label: string;
  href: string;
}

interface DropdownNavigation {
  id: string;
  title: string;
  href: string;
  dropdownItems?: NavigationItem[];
}

interface HeaderProps {
  mainNavItems?: DropdownNavigation[];
  utilityNavItems?: DropdownNavigation[];
  logoHref?: string;
  className?: string;
}

const DEFAULT_MAIN_NAV_ITEMS: DropdownNavigation[] = [
  {
    id: "rings",
    title: "Rings",
    href: "/collections/rings",
    dropdownItems: [
      { label: "Engagement Rings", href: "/collections/engagement-rings" },
      { label: "Men's Wedding Rings", href: "/collections/men-wedding-rings" },
      {
        label: "Women's Wedding Rings",
        href: "/collections/women-wedding-rings",
      },
    ],
  },
  {
    id: "earrings",
    title: "Earrings",
    href: "/collections/earrings",
  },
  {
    id: "wristwears",
    title: "Wristwears",
    href: "/collections/wristwears",
    dropdownItems: [
      { label: "Bangles", href: "/collections/bangles" },
      { label: "Bracelets", href: "/collections/bracelets" },
    ],
  },
  {
    id: "neckpieces",
    title: "Neckpieces",
    href: "/collections/neckpieces",
    dropdownItems: [
      { label: "Necklace", href: "/collections/necklace" },
      { label: "Pendants", href: "/collections/pendants" },
    ],
  },
];

const DEFAULT_UTILITY_NAV_ITEMS: DropdownNavigation[] = [
  { id: "about", title: "About", href: "/about" },
  { id: "contact", title: "Contact", href: "/contact" },
  { id: "blog", title: "Blog", href: "/blog" },
];

export const Header: React.FC<HeaderProps> = ({
  mainNavItems = DEFAULT_MAIN_NAV_ITEMS,
  utilityNavItems = DEFAULT_UTILITY_NAV_ITEMS,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      if (prev) setOpenDropdown(null);
      return !prev;
    });
  }, []);

  const toggleDropdown = useCallback((dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  return (
    <header className="header" aria-label="Site header">
      <div
        className="header__top"
        role="navigation"
        aria-label="Primary navigation"
      >
        <UtilityNav navItems={utilityNavItems} />
        <MobileMenuButton
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <LogoLink href="/" />
        <UserActions />
      </div>

      <MainNavigation navItems={mainNavItems} />

      <MobileMenuBackdrop
        isVisible={isMobileMenuOpen}
        onClick={toggleMobileMenu}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        openDropdown={openDropdown}
        onToggleDropdown={toggleDropdown}
        navItems={[...mainNavItems, ...utilityNavItems]}
      />
    </header>
  );
};

interface UtilityNavProps {
  navItems: DropdownNavigation[];
}

const UtilityNav: React.FC<UtilityNavProps> = ({ navItems }) => (
  <nav className="header__utility-nav" aria-label="Utility navigation">
    <ul className="header__utility-nav-list">
      {navItems.map((item) => (
        <li key={item.id} className="header__utility-nav-item">
          <Link
            href={item.href}
            className="header__utility-nav-link"
            aria-label={item.title}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  toggleMobileMenu,
  isMobileMenuOpen,
}) => (
  <button
    className="header__mobile-menu-button"
    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    onClick={toggleMobileMenu}
    aria-expanded={isMobileMenuOpen}
  >
    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
  </button>
);

interface LogoLinkProps {
  href: string;
}

const LogoLink: React.FC<LogoLinkProps> = ({ href }) => (
  <h1 className="header__logo">
    <Link href={href} aria-label="Home">
      <Logo />
    </Link>
  </h1>
);

const UserActions: React.FC = () => {
  const actions = [
    { href: "/search", label: "Search", icon: <SearchIcon /> },
    { href: "/wishlist", label: "Wishlist", icon: <WishlistIcon /> },
    { href: "/account", label: "Account", icon: <AccountIcon /> },
    { href: "/cart", label: "Cart", icon: <CartIcon /> },
  ];

  return (
    <div
      className="header__user-actions"
      role="toolbar"
      aria-label="User actions"
    >
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          aria-label={action.label}
          className="header__user-action"
        >
          {action.icon}
        </Link>
      ))}
    </div>
  );
};

interface MainNavigationProps {
  navItems: DropdownNavigation[];
}

const MainNavigation: React.FC<MainNavigationProps> = ({ navItems }) => (
  <nav className="header__main-nav" aria-label="Main menu">
    <ul className="header__main-nav-list">
      {navItems.map((item) => (
        <NavItem key={item.id} {...item} />
      ))}
    </ul>
  </nav>
);

const NavItem: React.FC<DropdownNavigation> = ({
  title,
  href,
  dropdownItems,
}) => (
  <li className="relative list-none group py-3">
    <Link
      href={href}
      className="header__main-nav-link"
      aria-haspopup={!!dropdownItems}
      aria-expanded="false"
    >
      {title}
      {dropdownItems && <ChevronDownIcon className="ml-1" />}
    </Link>
    {dropdownItems && (
      <ul
        className="absolute bg-white top-full left-0 pt-3 pb-5 px-4 font-light text-base text-[#502B3A] shadow-md space-y-3 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
        aria-label={`${title} submenu`}
      >
        {dropdownItems.map((item) => (
          <li key={item.href} className="header__dropdown-item">
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

interface MobileMenuBackdropProps {
  isVisible: boolean;
  onClick: () => void;
}

const MobileMenuBackdrop: React.FC<MobileMenuBackdropProps> = ({
  isVisible,
  onClick,
}) => (
  <div
    className={`header__mobile-backdrop ${isVisible ? "header__mobile-backdrop--visible" : ""}`}
    onClick={onClick}
    aria-hidden="true"
  />
);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openDropdown: string | null;
  onToggleDropdown: (id: string) => void;
  navItems: DropdownNavigation[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  openDropdown,
  onToggleDropdown,
  navItems,
}) => (
  <div
    className={`header__mobile-menu ${isOpen ? "header__mobile-menu--open" : ""}`}
  >
    <div className="header__mobile-menu-container">
      <MobileMenuHeader onClose={onClose} />

      <nav className="header__mobile-nav" aria-label="Mobile menu">
        <ul className="header__mobile-nav-list">
          {navItems.map((item) => (
            <MobileNavItem
              key={item.id}
              item={item}
              isOpen={openDropdown === item.id}
              onToggle={onToggleDropdown}
              onCloseMenu={onClose}
            />
          ))}
        </ul>
      </nav>

      <MobileActions onAction={onClose} />
    </div>
  </div>
);
interface MobileMenuHeaderProps {
  onClose: () => void;
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ onClose }) => {
  return (
    <div className="header__mobile-menu-header">
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
      <button
        className="header__mobile-menu-close"
        aria-label="Close menu"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

interface MobileNavItemProps {
  item: DropdownNavigation;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onCloseMenu: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  item,
  isOpen,
  onToggle,
  onCloseMenu,
}) => {
  if (!item.dropdownItems) {
    return (
      <li className="header__mobile-nav-item">
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
    <li className="header__mobile-dropdown">
      <button
        className="header__mobile-dropdown-button"
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
      >
        <span>{item.title}</span>
        <ChevronDownIcon
          className={`header__mobile-dropdown-icon ${isOpen ? "header__mobile-dropdown-icon--rotated" : ""}`}
        />
      </button>
      <div
        className={`header__mobile-dropdown-content ${isOpen ? "header__mobile-dropdown-content--open" : ""}`}
      >
        {item.dropdownItems.map((subItem) => (
          <Link
            key={subItem.href}
            href={subItem.href}
            className="header__mobile-dropdown-link"
            onClick={onCloseMenu}
          >
            {subItem.label}
          </Link>
        ))}
      </div>
    </li>
  );
};

interface MobileActionsProps {
  onAction: () => void;
}

const MobileActions: React.FC<MobileActionsProps> = ({ onAction }) => {
  const actions = [
    { href: "/search", label: "Search", icon: <SearchIcon /> },
    { href: "/wishlist", label: "Wishlist", icon: <WishlistIcon /> },
    { href: "/account", label: "Account", icon: <AccountIcon /> },
    { href: "/cart", label: "Cart", icon: <CartIcon /> },
  ];

  return (
    <div className="header__mobile-actions">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          aria-label={action.label}
          className="header__mobile-action"
          onClick={onAction}
        >
          {action.icon}
        </Link>
      ))}
    </div>
  );
};
