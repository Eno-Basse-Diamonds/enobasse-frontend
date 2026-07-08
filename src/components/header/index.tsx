"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import { CurrencyDropdown } from "../dropdown";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import "./styles.scss";
import { CloseIcon } from "../icons/close";
import { MenuIcon } from "../icons/menu";
import { SearchIcon } from "../icons/search";
import { WishlistIcon } from "../icons/wishlist";
import { AccountIcon } from "../icons/account";
import { CartIcon } from "../icons/cart";
import { ChevronDownIcon } from "../icons/chevron-down";
import { DropdownNavigation } from "./types";
import { UtilityNav } from "./utility-nav";
import { LogoLink } from "./logo-link";
import { MobileMenu } from "./mobile-menu";
import { SearchOverlay } from "./search-overlay";

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
      {
        label: "Fashion Rings",
        href: "/collections/fashion-rings",
      },
    ],
  },
  {
    id: "earrings",
    title: "Earrings",
    href: "/collections/earrings",
  },
  {
    id: "bracelets",
    title: "Bracelets",
    href: "/collections/bracelets",
  },
  {
    id: "necklaces",
    title: "Necklaces",
    href: "/collections/necklaces",
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
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback((dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible((prev) => !prev);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    setIsSearchVisible(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle(
      "overflow-hidden",
      isMobileMenuOpen || isSearchVisible,
    );
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen, isSearchVisible]);

  return (
    <header className="header" aria-label="Site header">
      <div
        className="header__top"
        role="navigation"
        aria-label="Primary navigation"
      >
        <UtilityNav navItems={utilityNavItems} />
        <LogoLink href="/" />
        <UserActions onSearchClick={toggleSearch} />
        <MobileMenuButton
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>

      <MainNavigation navItems={mainNavItems} />

      <SearchOverlay isVisible={isSearchVisible} onClose={toggleSearch} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        openDropdown={openDropdown}
        onToggleDropdown={toggleDropdown}
        mainNavItems={mainNavItems}
        utilityNavItems={utilityNavItems}
      />
    </header>
  );
};



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

interface UserActionsProps {
  onSearchClick: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onSearchClick }) => {
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartItems = useCartStore((state) => state.items);
  const { data: session } = useSession();

  const actions = [
    {
      href: "#",
      label: "Search",
      icon: <SearchIcon />,
      onClick: onSearchClick,
    },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: <WishlistIcon />,
      showBadge: true,
    },
    {
      href: "/account",
      label: "Account",
      icon: <AccountIcon />,
      showDot: !!session?.user,
    },
    { href: "/cart", label: "Cart", icon: <CartIcon />, showBadge: true },
  ];

  return (
    <div
      className="header__user-actions"
      role="toolbar"
      aria-label="User actions"
    >
      <div className="hidden lg:block">
        <CurrencyDropdown />
      </div>
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          aria-label={action.label}
          className="header__user-action"
          onClick={action.onClick}
          style={{ position: "relative", display: "inline-block" }}
        >
          {action.icon}
          {action.label === "Wishlist" && wishlistItems.length > 0 && (
            <span
              className="wishlist-badge absolute top-[2px] right-[2px] bg-primary-500 text-white rounded-full text-xs min-w-[18px] h-[18px] flex items-center justify-center px-1.5 z-10 ring-2 ring-white translate-x-[40%] -translate-y-[40%]"
              aria-label={`Wishlist items: ${wishlistItems.length}`}
            >
              {wishlistItems.length}
            </span>
          )}
          {action.label === "Cart" && cartItems.length > 0 && (
            <span
              className="cart-badge absolute top-[2px] right-[2px] bg-primary-500 text-white rounded-full text-xs min-w-[18px] h-[18px] flex items-center justify-center px-1.5 z-10 ring-2 ring-white translate-x-[40%] -translate-y-[40%]"
              aria-label={`Cart items: ${cartItems.length}`}
            >
              {cartItems.length}
            </span>
          )}
          {action.label === "Account" && action.showDot && (
            <span
              className="absolute top-[2px] right-[2px] bg-primary-500 rounded-full w-2 h-2 z-10 ring-2 ring-white translate-x-[40%] -translate-y-[40%]"
              aria-label="User authenticated"
            />
          )}
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
      href={href || "#"}
      className="header__main-nav-link"
      aria-haspopup={!!dropdownItems}
      aria-expanded="false"
    >
      {title}
      {dropdownItems && <ChevronDownIcon className="ml-1" />}
    </Link>
    {dropdownItems && (
      <ul
        className="absolute bg-white top-full -left-4 pt-3 pb-5 px-4 font-light text-base text-[#502B3A] shadow-md space-y-3 min-w-[230px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
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
