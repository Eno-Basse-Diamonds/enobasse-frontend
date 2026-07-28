"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ArrowLeftIcon, ChevronRightIcon, SearchSlashIcon } from "lucide-react";

import { getCurrentUser } from "@/modules/account/api";
import { useAccountStore } from "@/modules/account/store";
import { useCartStore } from "@/modules/cart/store";
import { useInfiniteProductsSearch } from "@/modules/products/hooks";
import { useWishlistStore } from "@/modules/wishlist/store";
import { CurrencyDropdown } from "@/shared/components/Dropdown";
import { EmptyState } from "@/shared/components/EmptyState";
import { Logo } from "@/shared/components/Logo";
import { ProductList } from "@/shared/components/ProductList";
import { AccountIcon } from "@/shared/components/icons/Account";
import { CartIcon } from "@/shared/components/icons/Cart";
import { ChevronDownIcon } from "@/shared/components/icons/ChevronDown";
import { CloseIcon } from "@/shared/components/icons/Close";
import { FacebookIcon } from "@/shared/components/icons/Facebook";
import { InstagramIcon } from "@/shared/components/icons/Instagram";
import { LinkedInIcon } from "@/shared/components/icons/Linkedin";
import { MenuIcon } from "@/shared/components/icons/Menu";
import { SearchIcon } from "@/shared/components/icons/Search";
import { TiktokIcon } from "@/shared/components/icons/Tiktok";
import { WishlistIcon } from "@/shared/components/icons/Wishlist";
import { XIcon } from "@/shared/components/icons/X";
import { ProductListLoader } from "@/shared/components/loaders/Products";
import { useDebounce } from "@/shared/hooks/useDebounce";
import "@/shared/styles/header.scss";
import { logger } from "@/shared/utils/logger";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface DropdownNavigation {
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

/**
 * Main site header.
 *
 * @description The primary navigation header containing the utility nav bar,
 * logo, main navigation with dropdowns, user action icons (search, wishlist,
 * account, cart), a search overlay with debounced product search, and a
 * mobile menu with submenu support. Closes overlays on route change.
 *
 * @param mainNavItems - Primary navigation links with optional dropdown children.
 * @param utilityNavItems - Secondary top-bar navigation links.
 * @returns The site header with navigation and overlays.
 */
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
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen || isSearchVisible);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen, isSearchVisible]);

  return (
    <header className="header" aria-label="Site header">
      <div className="header__top" role="navigation" aria-label="Primary navigation">
        <UtilityNav navItems={utilityNavItems} />
        <LogoLink href="/" />
        <UserActions onSearchClick={toggleSearch} />
        <MobileMenuButton toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
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
      href: "/Wishlist",
      label: "Wishlist",
      icon: <WishlistIcon />,
      showBadge: true,
    },
    {
      href: "/Account",
      label: "Account",
      icon: <AccountIcon />,
      showDot: !!session?.user,
    },
    { href: "/Cart", label: "Cart", icon: <CartIcon />, showBadge: true },
  ];

  return (
    <div className="header__user-actions" role="toolbar" aria-label="User actions">
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

const NavItem: React.FC<DropdownNavigation> = ({ title, href, dropdownItems }) => (
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

// --- LogoLink ---
interface LogoLinkProps {
  href: string;
}

/**
 * Logo wrapped as a home link.
 *
 * @description Renders the Eno Bassé SVG logo inside a Next.js Link that
 * navigates to the given href.
 *
 * @param href - The link destination (typically "/").
 * @returns A clickable logo linking to the homepage.
 */
export const LogoLink: React.FC<LogoLinkProps> = ({ href }) => (
  <h1 className="header__logo">
    <Link href={href} aria-label="Home">
      <Logo />
    </Link>
  </h1>
);

// --- MobileMenu ---
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

const SubMenu: React.FC<SubMenuProps> = ({ isOpen, onClose, item, onCloseMainMenu }) => {
  return (
    <div className={`header__mobile-submenu ${isOpen ? "header__mobile-submenu--open" : ""}`}>
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

  const itemClass = `header__mobile-nav-item ${isLastItem ? "header__last-nav-item" : ""}`;

  if (!item.href && hasDropdown) {
    return (
      <li className={itemClass}>
        <div className="header__mobile-nav-item-wrapper">
          <button className="header__mobile-nav-link" onClick={() => onOpenSubMenu(item)}>
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
        <Link href={item.href} className="header__mobile-nav-link" onClick={onCloseMenu}>
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li className={itemClass}>
      <div className="header__mobile-nav-item-wrapper">
        <Link href={item.href!} className="header__mobile-nav-link" onClick={onCloseMenu}>
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

/**
 * Mobile navigation menu.
 *
 * @description A full-screen mobile menu opened from the header hamburger icon.
 * Renders all navigation items, a currency dropdown, and social links. Supports
 * drill-down submenus with slide-in/out animations. Manages submenu open/close
 * state with requestAnimationFrame for smooth transitions.
 *
 * @param isOpen - Whether the mobile menu is visible.
 * @param onClose - Callback to close the menu.
 * @param mainNavItems - Primary navigation items.
 * @param utilityNavItems - Secondary navigation items.
 * @returns The mobile menu overlay.
 */
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

  const allNavItems = [...(mainNavItems ?? []), ...otherNavItems, ...(utilityNavItems ?? [])];

  return (
    <>
      <div className={`header__mobile-menu ${isOpen ? "header__mobile-menu--open" : ""}`}>
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

// --- SearchOverlay ---
interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  initialQuery?: string;
}

/**
 * Search overlay.
 *
 * @description A full-screen search interface that appears on the search icon
 * click. Features debounced product search via infinite scroll, recent searches
 * stored in localStorage, and a close button. Displays results as a product
 * grid or an empty state when no matches are found.
 *
 * @param isVisible - Whether the overlay is shown.
 * @param onClose - Callback to close the overlay.
 * @param initialQuery - Optional pre-filled search query.
 * @returns The full-screen search overlay.
 */
export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isVisible,
  onClose,
  initialQuery = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { preferredCurrency } = useAccountStore();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      const savedSearches = localStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const saveRecentSearch = (term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    const updatedSearches = [trimmedTerm, ...recentSearches.filter((s) => s !== trimmedTerm)].slice(
      0,
      5,
    );

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const shouldFetch = isVisible && debouncedQuery.trim().length > 0;

  const searchParams = shouldFetch
    ? {
        search: debouncedQuery,
        pageSize: 12,
        currency: preferredCurrency,
      }
    : undefined;

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProductsSearch(searchParams, shouldFetch);

  const isSearching =
    searchQuery.trim().length > 0 &&
    (searchQuery.trim().toLowerCase() !== debouncedQuery.trim().toLowerCase() ||
      isLoading ||
      (isFetching && !isFetchingNextPage));

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
    root: scrollContainerRef.current,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.products) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
    }
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchQuery(term);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`header__search-overlay ${isVisible ? "header__search-overlay--visible" : ""}`}
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

        {searchQuery.trim().length === 0 ? (
          <div className="header__search-overlay-recent mt-8 px-4">
            {recentSearches.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-[#D1A559] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(term)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-sm text-sm text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="header__search-overlay-results">
            {isSearching ? (
              <ProductListLoader />
            ) : products && products.length > 0 ? (
              <>
                <ProductList products={products} />
                <div
                  ref={loadMoreRef}
                  className="h-10 w-full flex items-center justify-center py-4"
                >
                  {isFetchingNextPage && (
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-[#D1A559] rounded-full animate-spin" />
                  )}
                </div>
              </>
            ) : (
              <EmptyState
                title="No Results Found"
                description={`We couldn't find any products matching "${searchQuery}".`}
                icon={<SearchSlashIcon />}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Socials ---
interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

/**
 * Social media icon links.
 *
 * @description Renders icon-only links to the brand's social media profiles:
 * Facebook, Instagram, X (Twitter), LinkedIn, and TikTok. Each link opens in a
 * new tab with noopener noreferrer.
 *
 * @returns A nav element with social media anchor links.
 */
export const Socials: React.FC = () => {
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

// --- UtilityNav ---
interface UtilityNavProps {
  navItems: DropdownNavigation[];
}

/**
 * Utility navigation bar.
 *
 * @description Renders the top navigation bar with text links (About, Contact,
 * Blog). Supports dropdown submenus on hover. Fetches the current user on mount
 * and conditionally shows an Admin link for admin users.
 *
 * @param navItems - Navigation items with optional dropdown children.
 * @returns The utility navigation bar.
 */
export const UtilityNav: React.FC<UtilityNavProps> = ({ navItems }) => {
  const [user, setUser] = useState<{ isAdmin?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        logger.error("Failed to fetch user in UtilityNav:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="header__utility-nav" aria-label="Utility navigation">
      <ul className="flex items-center gap-4">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.title}
              </Link>
            ) : (
              <span className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                {item.title}
              </span>
            )}
            {item.dropdownItems && item.dropdownItems.length > 0 && (
              <ul className="absolute top-full right-0 bg-white shadow-lg border min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {item.dropdownItems.map((subItem) => (
                  <li key={subItem.label}>
                    <Link
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {!isLoading && user?.isAdmin && (
          <li>
            <Link
              href="/admin"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
