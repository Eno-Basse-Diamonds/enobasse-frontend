"use client";

import { useEffect } from "react";

const CHUNK_RELOAD_KEY = "enobasse:chunk-reload-at";
const RELOAD_COOLDOWN_MS = 60 * 1000;

function isChunkLoadError(error: Error) {
  const message = error.message?.toLowerCase() ?? "";

  return (
    error.name === "ChunkLoadError" ||
    message.includes("loading chunk") ||
    message.includes("chunkloaderror") ||
    message.includes("failed to fetch dynamically imported module") ||
    message.includes("importing a module script failed")
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (!isChunkLoadError(error)) return;

    const previousReload = Number(window.sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? 0);
    if (Date.now() - previousReload < RELOAD_COOLDOWN_MS) return;

    window.sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
    window.location.reload();
  }, [error]);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
      <p className="mb-4 font-light text-gray-600">
        A new version of the site may be available.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-[#502B3A] px-4 py-2 text-[#502B3A]"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-sm bg-[#502B3A] px-4 py-2 text-white transition-colors hover:bg-[#502B3A]/90"
        >
          Refresh page
        </button>
      </div>
    </main>
  );
}
