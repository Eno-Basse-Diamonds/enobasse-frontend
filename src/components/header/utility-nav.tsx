"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/api/account";
import { logger } from "@/lib/utils/logger";
import { DropdownNavigation } from "./types";

interface UtilityNavProps {
  navItems: DropdownNavigation[];
}

export const UtilityNav: React.FC<UtilityNavProps> = ({ navItems }) => {
  const [user, setUser] = useState<{ isAdmin?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        logger.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
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
          <li className="header__utility-nav-item">
            <div className="w-16 h-4 rounded-sm bg-gray-200 animate-pulse" />
          </li>
        </ul>
      </nav>
    );
  }

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
        {user?.isAdmin && (
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
