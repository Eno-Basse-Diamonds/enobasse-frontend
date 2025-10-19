"use client";

import { useEffect } from "react";

export default function ScrollRestoration(): null {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("scrollRestoration" in window.history)
    ) {
      return;
    }

    const prev = window.history.scrollRestoration;

    try {
      window.history.scrollRestoration = "manual";
    } catch {}

    return () => {
      try {
        window.history.scrollRestoration =
          (prev as History["scrollRestoration"]) || "auto";
      } catch {}
    };
  }, []);

  return null;
}
