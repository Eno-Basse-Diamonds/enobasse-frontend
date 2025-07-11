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
import { ProductList } from "@/components/product/list";
import { useProducts } from "@/lib/hooks/use-products";
import { ProductsResponse } from "@/lib/types/products";
import { EmptyState } from "../empty-state";
import { SearchSlashIcon } from "lucide-react";
import { ProductListLoader } from "../loaders";

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
      { label: "All", href: "/collections/rings" },
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
      { label: "All", href: "/collections/wristwears" },
      { label: "Bangles", href: "/collections/bangles" },
      { label: "Bracelets", href: "/collections/bracelets" },
    ],
  },
  {
    id: "neckpieces",
    title: "Neckpieces",
    href: "/collections/neckpieces",
    dropdownItems: [
      { label: "All", href: "/collections/neckpieces" },
      { label: "Necklaces", href: "/collections/necklaces" },
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
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      if (prev) setOpenDropdown(null);
      return !prev;
    });
  }, []);

  const toggleDropdown = useCallback((dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "overflow-hidden",
      isMobileMenuOpen || isSearchVisible
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

      <MobileSearchBar />
      <SearchOverlay isVisible={isSearchVisible} onClose={toggleSearch} />

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

interface UserActionsProps {
  onSearchClick: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onSearchClick }) => {
  const actions = [
    {
      href: "#",
      label: "Search",
      icon: <SearchIcon />,
      onClick: onSearchClick,
    },
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
          onClick={action.onClick}
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
    </div>
  </div>
);

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

const MobileSearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFocus = () => {
    setIsSearchVisible(true);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isSearchVisible);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSearchVisible]);

  return (
    <>
      <div className="header__mobile-search">
        <form onSubmit={handleSubmit} className="header__mobile-search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            className="header__mobile-search-input"
          />
          <SearchIcon />
        </form>
      </div>
      <SearchOverlay
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
        initialQuery={searchQuery}
      />
    </>
  );
};

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isVisible,
  onClose,
  initialQuery = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);

  const { data, isLoading } = useProducts({
    search: submittedQuery,
    page: 1,
    pageSize: 100,
  }) as { data?: ProductsResponse; isLoading: boolean; isError: boolean };

  const products = data?.products || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery.trim());
  };

  return (
    <div
      className={`header__search-overlay ${isVisible ? "header__search-overlay--visible" : ""}`}
    >
      <div className="header__search-overlay-container">
        <div className="header__search-overlay-header">
          <LogoLink href="/" />
          <button
            onClick={onClose}
            className="header__search-overlay-close"
            aria-label="Close search"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="header__search-overlay-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header__search-overlay-input"
            autoFocus
          />
          <button
            type="submit"
            className="header__search-overlay-submit"
            aria-label="Submit search"
          >
            <SearchIcon />
          </button>
        </form>

        {submittedQuery && (
          <div className="header__search-overlay-results">
            {isLoading && <ProductListLoader />}
            {products && products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              !isLoading && (
                <EmptyState
                  title="No Results Found"
                  description="We couldn't find any products that match your query."
                  icon={<SearchSlashIcon />}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
