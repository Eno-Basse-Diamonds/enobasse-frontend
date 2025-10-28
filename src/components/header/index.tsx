"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Logo } from "../logo";
import { ProductList } from "@/components/product/list";
import { CurrencyDropdown } from "../dropdown";
import { useProductsSearch } from "@/lib/hooks/use-products";
import { ProductsResponse } from "@/lib/types/products";
import { EmptyState } from "../empty-state";
import { ChevronRightIcon, SearchSlashIcon } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import "./styles.scss";
import { CloseIcon } from "../icons/close";
import { MenuIcon } from "../icons/menu";
import { SearchIcon } from "../icons/search";
import { WishlistIcon } from "../icons/wishlist";
import { AccountIcon } from "../icons/account";
import { CartIcon } from "../icons/cart";
import { ChevronDownIcon } from "../icons/chevron-down";
import { ProductListLoader } from "../loaders/products";
import { InstagramIcon } from "../icons/instagram";
import { FacebookIcon } from "../icons/facebook";
import { XIcon } from "../icons/x";
import { LinkedInIcon } from "../icons/linkedin";
import { TiktokIcon } from "../icons/tiktok";
import { ArrowLeftIcon } from "../icons/arrow-left";

interface NavigationItem {
  label: string;
  href: string;
}

interface DropdownNavigation {
  id: string;
  title: string;
  href?: string;
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
    setIsMobileMenuOpen((prev) => !prev);
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

const UtilityNav: React.FC<UtilityNavProps> = ({ navItems }) => {
  const { data: session } = useSession();

  return (
    <nav className="header__utility-nav" aria-label="Utility navigation">
      <ul className="header__utility-nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="header__utility-nav-item">
            <Link
              href={item.href || "#"}
              className="header__utility-nav-link"
              aria-label={item.title}
            >
              {item.title}
            </Link>
          </li>
        ))}
        {session?.user?.isAdmin && (
          <li className="header__utility-nav-item">
            <Link
              href="/admin/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="header__utility-nav-link"
              aria-label="Admin Dashboard"
            >
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
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
interface DropdownNavigation {
  id: string;
  title: string;
  href?: string;
  dropdownItems?: Array<{ href: string; label: string }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openDropdown: string | null;
  onToggleDropdown: (id: string) => void;
  navItems: DropdownNavigation[];
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
          <button
            onClick={onClose}
            aria-label="Go back"
          >
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

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
}) => {
  const otherNavItems = [
    {
      id: "our-services",
      title: "Our Services",
      dropdownItems: [
        { label: "Custom Design", href: "/custom-design" },
        { label: "Ring Resizing", href: "/ring-resizing" },
        { label: "Maintenance & Repairs", href: "/maintenance-repairs" },
      ],
    },
    {
      id: "creative-studio",
      title: "Creative Studio",
      href: "/creative-studio",
    },
    { id: "faqs", title: "FAQs", href: "/faqs" },
    {
      id: "testimonials",
      title: "Testimonials",
      href: "/testimonials",
      isLastItem: true,
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

  const allNavItems = [...navItems, ...otherNavItems];

  return (
    <>
      <div
        className={`header__mobile-menu ${
          isOpen ? "header__mobile-menu--open" : ""
        }`}
      >
        <div className="header__mobile-menu-container">
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

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const Socials: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: <FacebookIcon />,
      href: "https://www.facebook.com/eno.basse",
      ariaLabel: "Link to Enobasse Facebook account",
    },
    {
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/eno.basse",
      ariaLabel: "Link to Enobasse Instagram account",
    },
    {
      icon: <XIcon />,
      href: "https://x.com/EnoBasseDiamond",
      ariaLabel: "Link to Enobasse X account",
    },
    {
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/in/eno-bass%C3%A9-diamonds-650b60299/",
      ariaLabel: "Link to Enobasse LinkedIn account",
    },
    {
      icon: <TiktokIcon />,
      href: "https://www.tiktok.com/@eno.basse.diamonds",
      ariaLabel: "Link to Enobasse TikTok account",
    },
  ];

  return (
    <nav aria-label="Social media links" className="order-2 lg:order-1">
      <div className="flex flex-row items-center justify-center gap-x-8">
        {socialLinks.map((link, index) => (
          <a
            key={`social-${index}`}
            href={link.href}
            aria-label={link.ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
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
  const { preferredCurrency } = useAccountStore();

  useEffect(() => {
    if (!isVisible) {
      setSearchQuery("");
      setSubmittedQuery("");
    }
  }, [isVisible]);

  const shouldFetch = isVisible && submittedQuery.trim().length > 0;

  const searchParams = shouldFetch
    ? {
        search: submittedQuery,
        page: 1,
        pageSize: 100,
        currency: preferredCurrency,
      }
    : undefined;

  const { data, isLoading } = useProductsSearch(searchParams, shouldFetch) as {
    data?: ProductsResponse;
    isLoading: boolean;
    isError: boolean;
  };

  const products = data?.products || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery.trim());
  };

  const handleClose = () => {
    setSearchQuery("");
    setSubmittedQuery("");
    onClose();
  };

  return (
    <div
      className={`header__search-overlay ${
        isVisible ? "header__search-overlay--visible" : ""
      }`}
    >
      <div className="header__search-overlay-container">
        <div className="header__search-overlay-header">
          <LogoLink href="/" />
          <button
            onClick={handleClose}
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
