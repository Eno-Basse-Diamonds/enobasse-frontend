"use client";

import { useCallback, useEffect, useRef } from "react";

import { useAlertStore } from "@/shared/store/alert";

const POLL_INTERVAL_MS = 10 * 60 * 1000;
const CURRENT_BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? "unknown";

interface VersionResponse {
  buildId?: string;
}

/**
 * Detects when an open tab belongs to an older deployment and offers a safe,
 * user-controlled refresh. This avoids interrupting checkout or unsaved forms.
 */
export function VersionWatcher() {
  const addAlert = useAlertStore((state) => state.addAlert);
  const notificationShown = useRef(false);

  const checkVersion = useCallback(async () => {
    if (notificationShown.current || CURRENT_BUILD_ID === "unknown") return;

    try {
      const response = await fetch(`/api/version?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!response.ok) return;

      const { buildId } = (await response.json()) as VersionResponse;
      if (!buildId || buildId === "unknown" || buildId === CURRENT_BUILD_ID) return;

      notificationShown.current = true;
      addAlert({
        type: "info",
        title: "Update available",
        dismissible: true,
        message: (
          <span>
            A new version of Eno Bassé is ready.{" "}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="font-semibold underline underline-offset-2"
            >
              Refresh now
            </button>
          </span>
        ),
      });
    } catch {
      // A version check must never disrupt the user's session.
    }
  }, [addAlert]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void checkVersion();
    };

    const intervalId = window.setInterval(() => void checkVersion(), POLL_INTERVAL_MS);
    window.addEventListener("focus", checkVersion);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", checkVersion);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [checkVersion]);

  return null;
}
