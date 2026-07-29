"use client";

import { useCallback, useEffect, useRef } from "react";

import { useAlertStore } from "@/shared/store/alert";

const POLL_INTERVAL_MS = 30 * 60 * 1000; // Check every 30 minutes in production
const DISMISS_STORAGE_KEY = "enobasse_version_dismissed";
const CURRENT_BUILD_ID =
  process.env.NEXT_PUBLIC_BUILD_ID || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "";

interface VersionResponse {
  buildId?: string;
}

/**
 * Production-only Version Watcher.
 *
 * @description Silently checks for new deployments only in production environments.
 * Disabled completely in development or when no build ID is defined.
 * Never listens to window focus or tab switching.
 */
export function VersionWatcher() {
  const addAlert = useAlertStore((state) => state.addAlert);
  const notificationShown = useRef(false);

  const isDevOrLocal =
    process.env.NODE_ENV !== "production" ||
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local")));

  const checkVersion = useCallback(async () => {
    // Strictly run only in production on live domain with a valid build hash
    if (
      isDevOrLocal ||
      !CURRENT_BUILD_ID ||
      CURRENT_BUILD_ID === "unknown"
    ) {
      return;
    }

    if (notificationShown.current) return;
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(DISMISS_STORAGE_KEY) === "true") {
        return;
      }
    } catch {}

    try {
      const response = await fetch(`/api/version?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (!response.ok) return;

      const { buildId } = (await response.json()) as VersionResponse;

      if (!buildId || buildId === "unknown" || buildId === CURRENT_BUILD_ID) {
        return;
      }

      notificationShown.current = true;
      try {
        sessionStorage.setItem(DISMISS_STORAGE_KEY, "true");
      } catch {}

      addAlert({
        type: "info",
        title: "Update Available",
        dismissible: true,
        duration: 10000,
        message: (
          <span className="flex items-center gap-2">
            A new version of Eno Bassé is available.{" "}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="font-semibold underline underline-offset-2 hover:opacity-80"
            >
              Refresh
            </button>
          </span>
        ),
      });
    } catch {
      // Quietly ignore network failures
    }
  }, [addAlert]);

  useEffect(() => {
    // Strict guard: Do nothing in development or local environment
    if (
      isDevOrLocal ||
      !CURRENT_BUILD_ID ||
      CURRENT_BUILD_ID === "unknown"
    ) {
      return;
    }

    // Single quiet check 30 seconds after page load
    const initialTimer = setTimeout(() => {
      void checkVersion();
    }, 30000);

    // Periodic check every 30 minutes (NO tab focus or visibility listeners!)
    const intervalId = setInterval(() => {
      void checkVersion();
    }, POLL_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [checkVersion]);

  return null;
}
