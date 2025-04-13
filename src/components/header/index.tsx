"use client";

import { useState, useEffect } from "react";
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

interface DropdownNavigation {
  id: string;
  title: string;
  href: string;
  dropdownItems?: DropdownNavigationItem[];
}

interface DropdownNavigationItem {
  label: string;
  href: string;
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const mainNavItems: DropdownNavigation[] = [
    {
      id: "rings",
      title: "Rings",
      href: "/collections/rings",
      dropdownItems: [
        { label: "Engagement Rings", href: "/collections/engagement-rings" },
        {
          label: "Men's Wedding Rings",
          href: "/collections/men-wedding-rings",
        },
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

  const utilityNavItems: DropdownNavigation[] = [
    { id: "about", title: "About", href: "/about" },
    { id: "contact", title: "Contact", href: "/contact" },
  ];

  return (
    <header className="header" aria-label="Site header">
      <div
        className="header__top"
        role="navigation"
        aria-label="Primary navigation"
      >
        <UtilityNav navItems={utilityNavItems} />
        <MobileMenuButton toggleMobileMenu={toggleMobileMenu} />
        <LogoLink />
        <UserActions />
      </div>
      <MainNavigation navItems={mainNavItems} />
      <MobileMenuBackdrop
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
        navItems={[...mainNavItems, ...utilityNavItems]}
      />
    </header>
  );
}

function UtilityNav({ navItems }: { navItems: DropdownNavigation[] }) {
  return (
    <nav className="header__utility-nav" aria-label="Utility navigation">
      <ul className="header__utility-nav-list">
        {navItems.map((item) => (
          <li key={item.href} className="header__utility-nav-item">
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
}

function MobileMenuButton({
 toggleMobileMenu,
}: {
  toggleMobileMenu: () => void;
}) {
  return (
    <button
      className="header__mobile-menu-button"
      aria-label="Open menu"
      onClick={toggleMobileMenu}
    >
      <MenuIcon />
    </button>
  );
}

function LogoLink() {
  return (
    <h1 className="header__logo">
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
    </h1>
  );
}

function UserActions() {
  return (
    <div
      className="header__user-actions"
      role="toolbar"
      aria-label="User actions"
    >
      <Link href="#" aria-label="Search" className="header__user-action">
        <SearchIcon />
      </Link>
      <Link href="#" aria-label="Wishlist" className="header__user-action">
        <WishlistIcon />
      </Link>
      <Link href="#" aria-label="Account" className="header__user-action">
        <AccountIcon />
      </Link>
      <Link href="#" aria-label="Cart" className="header__user-action">
        <CartIcon />
      </Link>
    </div>
  );
}

function MainNavigation({ navItems }: { navItems: DropdownNavigation[] }) {
  return (
    <nav className="header__main-nav" aria-label="Main menu">
      <ul className="header__main-nav-list">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ title, href, dropdownItems }: DropdownNavigation) {
  return (
    <li className="relative list-none group py-3">
      <Link
        href={href}
        className="header__main-nav-link"
        aria-current="page"
        aria-haspopup={!!dropdownItems}
        aria-expanded="false"
      >
        {title} {dropdownItems && <ChevronDownIcon />}
      </Link>
      {dropdownItems && (
        <ul
          className="absolute bg-white top-full left-0 pt-3 pb-5 px-4 font-light text-base text-[#502B3A] shadow-md space-y-3 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          aria-label={`${title} submenu`}
        >
          {dropdownItems.map((item) => (
            <li key={item.href} className="header__dropdown-item">
              <Link href={item.href} className="header__dropdown-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileMenuBackdrop({
  isMobileMenuOpen,
  toggleMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}) {
  return (
    <div
      className={`header__mobile-backdrop ${isMobileMenuOpen ? "header__mobile-backdrop--visible" : ""}`}
      onClick={toggleMobileMenu}
    />
  );
}

function MobileMenu({
  isMobileMenuOpen,
  toggleMobileMenu,
  openDropdown,
  toggleDropdown,
  navItems,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  openDropdown: string | null;
  toggleDropdown: (name: string) => void;
  navItems: DropdownNavigation[];
}) {
  return (
    <div
      className={`header__mobile-menu ${isMobileMenuOpen ? "header__mobile-menu--open" : ""}`}
    >
      <div className="header__mobile-menu-container">
        <MobileMenuHeader toggleMobileMenu={toggleMobileMenu} />

        <nav className="header__mobile-nav" aria-label="Mobile menu">
          <ul className="header__mobile-nav-list">
            {navItems.map((item) =>
              item.dropdownItems ? (
                <MobileDropdownItem
                  key={item.id}
                  title={item.title}
                  id={item.id}
                  items={item.dropdownItems}
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                  toggleMobileMenu={toggleMobileMenu}
                />
              ) : (
                <li key={item.href} className="header__mobile-nav-item">
                  <Link
                    href={item.href}
                    className="header__mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <MobileActions toggleMobileMenu={toggleMobileMenu} />
      </div>
    </div>
  );
}

function MobileMenuHeader({
  toggleMobileMenu,
}: {
  toggleMobileMenu: () => void;
}) {
  return (
    <div className="header__mobile-menu-header">
      <Link href="/" aria-label="Home" onClick={toggleMobileMenu}>
        <Logo />
      </Link>
      <button
        className="header__mobile-menu-close"
        aria-label="Close menu"
        onClick={toggleMobileMenu}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function MobileDropdownItem({
  title,
  id,
  items,
  openDropdown,
  toggleDropdown,
  toggleMobileMenu,
}: {
  title: string;
  id: string;
  items: { label: string; href: string }[];
  openDropdown: string | null;
  toggleDropdown: (name: string) => void;
  toggleMobileMenu: () => void;
}) {
  return (
    <li className="header__mobile-dropdown">
      <button
        className="header__mobile-dropdown-button"
        onClick={() => toggleDropdown(id)}
        aria-expanded={openDropdown === id}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`header__mobile-dropdown-icon ${openDropdown === id ? "header__mobile-dropdown-icon--rotated" : ""}`}
        />
      </button>
      <div
        className={`header__mobile-dropdown-content ${openDropdown === id ? "header__mobile-dropdown-content--open" : ""}`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="header__mobile-dropdown-link"
            onClick={toggleMobileMenu}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

function MobileActions({ toggleMobileMenu }: { toggleMobileMenu: () => void }) {
  return (
    <div className="header__mobile-actions">
      <Link
        href="#"
        aria-label="Search"
        className="header__mobile-action"
        onClick={toggleMobileMenu}
      >
        <SearchIcon />
      </Link>
      <Link
        href="#"
        aria-label="Wishlist"
        className="header__mobile-action"
        onClick={toggleMobileMenu}
      >
        <WishlistIcon />
      </Link>
      <Link
        href="#"
        aria-label="Account"
        className="header__mobile-action"
        onClick={toggleMobileMenu}
      >
        <AccountIcon />
      </Link>
      <Link
        href="#"
        aria-label="Cart"
        className="header__mobile-action"
        onClick={toggleMobileMenu}
      >
        <CartIcon />
      </Link>
    </div>
  );
}
