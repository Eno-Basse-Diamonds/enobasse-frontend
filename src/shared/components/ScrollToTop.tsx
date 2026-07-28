"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Ensures page scroll position resets to the top (0, 0) on route change.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
