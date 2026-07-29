"use client";

import { useCallback, useEffect } from "react";

const POLL_INTERVAL_MS = 30 * 60 * 1000; // Check every 30 minutes in production
const CURRENT_BUILD_ID =
  process.env.NEXT_PUBLIC_BUILD_ID || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "";

interface VersionResponse {
  buildId?: string;
}

/**
 * Silent Background Update Watcher.
 *
 * @description Silently reloads the application when a new build is deployed in production.
 * Has NO UI, NO toasts, and NO notifications.
 */
export function SilentUpdateWatcher() {
  const checkAndSilentUpdate = useCallback(async () => {
    const isDevOrLocal =
      process.env.NODE_ENV !== "production" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".local")));

    if (isDevOrLocal || !CURRENT_BUILD_ID || CURRENT_BUILD_ID === "unknown") {
      return;
    }

    try {
      const response = await fetch(`/api/version?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (!response.ok) return;

      const { buildId } = (await response.json()) as VersionResponse;

      // If server buildId is different, silently reload browser to get latest assets
      if (buildId && buildId !== "unknown" && buildId !== CURRENT_BUILD_ID) {
        window.location.reload();
      }
    } catch {
      // Quietly ignore network failures
    }
  }, []);

  useEffect(() => {
    const isDevOrLocal =
      process.env.NODE_ENV !== "production" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".local")));

    if (isDevOrLocal || !CURRENT_BUILD_ID || CURRENT_BUILD_ID === "unknown") {
      return;
    }

    // Silent check 30 seconds after initial load
    const initialTimer = setTimeout(() => {
      void checkAndSilentUpdate();
    }, 30000);

    // Periodic check every 30 minutes
    const intervalId = setInterval(() => {
      void checkAndSilentUpdate();
    }, POLL_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [checkAndSilentUpdate]);

  return null;
}
