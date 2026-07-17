"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Video,
  Upload,
  GripVertical,
  Trash2,
  Plus,
  Check,
  Loader2,
  LayoutGrid,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { AdminHeader } from "../_components/admin-header";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import {
  useHomepageSettings,
  useUpdateHomepageSettings,
} from "@/lib/hooks/use-homepage-settings";
import { useAdminCollections } from "@/lib/hooks/use-collections";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface AlertState {
  visible: boolean;
  type: "success" | "error";
  message: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminHomepagePage() {
  const { data: session } = useSession();
  const { data: settings, isLoading: settingsLoading } = useHomepageSettings();
  const { data: collectionsData, isLoading: collectionsLoading } =
    useAdminCollections({ pageSize: 100, published: true });
  const updateMutation = useUpdateHomepageSettings();

  // Local state mirrors the saved settings so the UI can be edited before saving
  const [heroVideoUrl, setHeroVideoUrl] = useState<string | null>(null);
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    type: "success",
    message: "",
  });

  // Sync local state when remote settings load
  useEffect(() => {
    if (settings) {
      setHeroVideoUrl(settings.heroVideoUrl ?? null);
      setFeaturedSlugs(settings.featuredCollectionSlugs ?? []);
    }
  }, [settings]);

  const allCollections = collectionsData?.collections ?? [];

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        heroVideoUrl,
        featuredCollectionSlugs: featuredSlugs,
      });
      setAlertState({
        visible: true,
        type: "success",
        message: "Homepage settings saved successfully!",
      });
    } catch (err: any) {
      setAlertState({
        visible: true,
        type: "error",
        message: err?.message || "Failed to save settings.",
      });
    }
  };

  // ── Featured collections drag-and-drop ──────────────────────────────────────
  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...featuredSlugs];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setFeaturedSlugs(reordered);
    setDragIndex(index);
  };
  const handleDragEnd = () => setDragIndex(null);

  const addCollection = (slug: string) => {
    if (featuredSlugs.includes(slug) || featuredSlugs.length >= 4) return;
    setFeaturedSlugs((prev) => [...prev, slug]);
  };

  const removeCollection = (slug: string) =>
    setFeaturedSlugs((prev) => prev.filter((s) => s !== slug));

  const isLoading = settingsLoading || collectionsLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert */}
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          duration={5000}
          onDismiss={() => setAlertState((p) => ({ ...p, visible: false }))}
        >
          {alertState.message}
        </Alert>
      )}

      <AdminHeader
        title="Homepage Settings"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
          </div>
        ) : (
          <>
            {/* ── Hero Video Section ──────────────────────────────────────── */}
            <section className="bg-white border border-gray-200 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h2 className="font-primary text-lg font-semibold text-primary-500">
                    Hero Video
                  </h2>
                  <p className="text-sm text-primary-300">
                    The video that plays full-screen on the home page hero
                    section.
                  </p>
                </div>
              </div>

              {/* Current video preview */}
              {heroVideoUrl ? (
                <div className="mb-4 relative">
                  <video
                    src={heroVideoUrl}
                    className="w-full h-48 object-cover rounded-sm border border-gray-200"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                  <button
                    onClick={() => setHeroVideoUrl(null)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Remove video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mb-4 w-full h-48 bg-gray-100 border border-dashed border-gray-300 rounded-sm flex flex-col items-center justify-center gap-2 text-primary-300">
                  <Video className="w-10 h-10" />
                  <span className="text-sm">No video uploaded yet</span>
                  <span className="text-xs text-primary-200">
                    The static fallback video will be used
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <CldUploadWidget
                  uploadPreset="hero_videos"
                  options={{
                    sources: ["local", "url"],
                    resourceType: "video",
                    multiple: false,
                    maxFiles: 1,
                    clientAllowedFormats: ["mp4", "mov", "webm", "avi"],
                  }}
                  onSuccess={(result: any) => {
                    if (result?.info?.secure_url) {
                      setHeroVideoUrl(result.info.secure_url);
                    }
                  }}
                >
                  {({ open }) => (
                    <Button
                      type="button"
                      variant="outline"
                      leadingIcon={<Upload className="w-4 h-4" />}
                      onClick={() => open()}
                    >
                      Upload New Video
                    </Button>
                  )}
                </CldUploadWidget>

                {/* Or paste a Cloudinary URL manually */}
                <input
                  type="url"
                  value={heroVideoUrl ?? ""}
                  onChange={(e) =>
                    setHeroVideoUrl(e.target.value || null)
                  }
                  placeholder="Or paste Cloudinary video URL…"
                  className="flex-1 h-10 px-3 text-sm border border-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300"
                />
              </div>
            </section>

            {/* ── Featured Collections Section ────────────────────────────── */}
            <section className="bg-white border border-gray-200 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-primary-500/10 flex items-center justify-center">
                  <LayoutGrid className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h2 className="font-primary text-lg font-semibold text-primary-500">
                    Featured Collections
                  </h2>
                  <p className="text-sm text-primary-300">
                    Choose up to 4 published collections to display in the home
                    page grid. Drag to reorder.
                  </p>
                </div>
              </div>

              {/* Selected collections (drag-and-drop list) */}
              <div className="mb-5 space-y-2 min-h-[60px]">
                {featuredSlugs.length === 0 && (
                  <p className="text-sm text-primary-200 italic py-4 text-center border border-dashed border-gray-200 rounded-sm">
                    No featured collections selected – defaults will be used
                  </p>
                )}
                {featuredSlugs.map((slug, index) => {
                  const col = allCollections.find((c) => c.slug === slug);
                  return (
                    <div
                      key={slug}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-3 p-3 bg-gray-50 border rounded-sm cursor-grab select-none transition-opacity ${
                        dragIndex === index
                          ? "opacity-50 border-primary-300"
                          : "border-gray-200"
                      }`}
                    >
                      <GripVertical className="w-4 h-4 text-primary-200 shrink-0" />
                      <span className="flex-1 text-sm font-medium text-primary-500 truncate">
                        {col?.name || slug}
                      </span>
                      <span className="text-xs text-primary-200 font-mono hidden sm:inline">
                        {slug}
                      </span>
                      <span className="text-xs bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded-full shrink-0">
                        #{index + 1}
                      </span>
                      <button
                        onClick={() => removeCollection(slug)}
                        className="p-1 text-red-400 hover:text-red-600 shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Available collections to add */}
              <div>
                <p className="text-sm font-semibold text-primary-400 mb-2">
                  Add a collection{" "}
                  <span className="font-normal text-primary-200">
                    ({featuredSlugs.length}/4 selected)
                  </span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allCollections
                    .filter((c) => !featuredSlugs.includes(c.slug))
                    .map((col) => (
                      <button
                        key={col.id}
                        disabled={featuredSlugs.length >= 4}
                        onClick={() => addCollection(col.slug)}
                        className="flex items-center gap-2 p-3 text-left border border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-colors rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4 text-primary-300 shrink-0" />
                        <span className="text-sm text-primary-500 truncate">
                          {col.name}
                        </span>
                      </button>
                    ))}
                  {allCollections.filter(
                    (c) => !featuredSlugs.includes(c.slug)
                  ).length === 0 && (
                    <p className="text-sm text-primary-200 italic col-span-2">
                      All published collections are already selected.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ── Save button ──────────────────────────────────────────────── */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                leadingIcon={
                  updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )
                }
              >
                {updateMutation.isPending ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
