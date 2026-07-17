"use client";

import { useState, useEffect, useRef } from "react";
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
  AlertCircle,
} from "lucide-react";
import { AdminHeader } from "../_components/admin-header";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import {
  useHomepageSettings,
  useUpdateHomepageSettings,
  useUploadHeroVideo,
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
  const uploadVideoMutation = useUploadHeroVideo();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [optimizeVideo, setOptimizeVideo] = useState(true);
  const [savedCollections, setSavedCollections] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    type: "success",
    message: "",
  });

  // Sync featured slugs when remote settings load
  useEffect(() => {
    if (settings) {
      setFeaturedSlugs(settings.featuredCollectionSlugs ?? []);
    }
  }, [settings]);

  const allCollections = collectionsData?.collections ?? [];

  // ── Video upload handler ─────────────────────────────────────────────────────
  const handleVideoFile = async (file: File) => {
    setUploadProgress("Uploading & processing video… this may take a minute.");
    try {
      await uploadVideoMutation.mutateAsync({ file, optimize: optimizeVideo });
      setAlertState({
        visible: true,
        type: "success",
        message:
          "Hero video processed and uploaded! WebM + poster generated automatically.",
      });
    } catch (err: any) {
      setAlertState({
        visible: true,
        type: "error",
        message: err?.message || "Video upload failed.",
      });
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleVideoFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) handleVideoFile(file);
  };

  // ── Featured collections drag-and-drop ──────────────────────────────────────
  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleCollectionDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const reordered = [...featuredSlugs];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setFeaturedSlugs(reordered);
    setDragIndex(null);
  };
  const handleDragEnd = () => setDragIndex(null);

  const addCollection = (slug: string) => {
    if (featuredSlugs.includes(slug)) return;
    setFeaturedSlugs((prev) => [...prev, slug]);
  };

  const removeCollection = (slug: string) =>
    setFeaturedSlugs((prev) => prev.filter((s) => s !== slug));

  const handleSaveCollections = async () => {
    try {
      await updateMutation.mutateAsync({ featuredCollectionSlugs: featuredSlugs });
      setSavedCollections(true);
      setTimeout(() => setSavedCollections(false), 2000);
    } catch (err: any) {
      setAlertState({
        visible: true,
        type: "error",
        message: err?.message || "Failed to save collections.",
      });
    }
  };

  const clearHeroVideo = async () => {
    try {
      await updateMutation.mutateAsync({
        heroVideoMp4Url: null,
        heroVideoWebmUrl: null,
        heroVideoPosterUrl: null,
      });
      setAlertState({ visible: true, type: "success", message: "Hero video removed." });
    } catch {
      setAlertState({ visible: true, type: "error", message: "Failed to remove video." });
    }
  };

  const isLoading = settingsLoading || collectionsLoading;
  const isProcessing = uploadVideoMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-50">
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          duration={6000}
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

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
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
                    Upload a video file — the server will automatically generate
                    a WebM version and extract a poster image from the first
                    frame.
                  </p>
                </div>
              </div>

              {/* Current video preview */}
              {settings?.heroVideoMp4Url ? (
                <div className="mb-5 relative">
                  <video
                    src={settings.heroVideoMp4Url}
                    poster={settings.heroVideoPosterUrl || undefined}
                    className="w-full h-52 object-cover rounded-sm border border-gray-200"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                  {/* Asset URLs */}
                  <div className="mt-2 space-y-1 text-xs font-mono text-primary-200 break-all">
                    {settings.heroVideoMp4Url && (
                      <p><span className="text-primary-400 font-semibold not-italic font-sans">MP4: </span>{settings.heroVideoMp4Url}</p>
                    )}
                    {settings.heroVideoWebmUrl && (
                      <p><span className="text-primary-400 font-semibold not-italic font-sans">WebM: </span>{settings.heroVideoWebmUrl}</p>
                    )}
                    {settings.heroVideoPosterUrl && (
                      <p><span className="text-primary-400 font-semibold not-italic font-sans">Poster: </span>{settings.heroVideoPosterUrl}</p>
                    )}
                  </div>
                  <button
                    onClick={clearHeroVideo}
                    disabled={updateMutation.isPending}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Remove video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-primary-200 italic mb-4">
                  No custom video set — the static fallback will be used.
                </p>
              )}

              {/* Upload drop zone */}
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center gap-3 p-8 border border-dashed border-primary-300 rounded-sm bg-primary-50/30">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
                  <p className="text-sm text-primary-400 text-center">
                    {uploadProgress}
                  </p>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-3 p-8 border border-dashed border-gray-300 rounded-sm hover:border-primary-300 hover:bg-primary-50/20 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-primary-300" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary-500">
                      Drop a video file here or click to browse
                    </p>
                    <p className="text-xs text-primary-200 mt-1">
                      MP4, MOV, WebM, AVI — up to 500 MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {/* Optimize toggle */}
              {!isProcessing && (
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optimizeVideo}
                    onChange={(e) => setOptimizeVideo(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400"
                  />
                  <span className="text-sm text-primary-400">
                    Optimize video{" "}
                    <span className="text-primary-200 font-normal">
                      (reduce file size while maintaining quality)
                    </span>
                  </span>
                </label>
              )}

              {uploadVideoMutation.isError && (
                <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {(uploadVideoMutation.error as any)?.message ||
                      "Upload failed"}
                  </span>
                </div>
              )}
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
                    Select and arrange collections for the home page bento grid.
                    Drag cards to reorder.
                  </p>
                </div>
              </div>

              {/* Grid preview — bento layout matching the homepage */}
              <div className="mt-4 mb-6">
                {featuredSlugs.length === 0 ? (
                  <p className="text-sm text-primary-200 italic py-8 text-center border border-dashed border-gray-200 rounded-sm">
                    No featured collections selected — defaults will be used
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-primary-400 mb-3">
                      Grid Preview — drag cards to rearrange
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[200px]">
                      {featuredSlugs.map((slug, position) => {
                        const col = allCollections.find((c) => c.slug === slug);
                        const isOddCount = featuredSlugs.length % 2 !== 0;
                        const isLastAlone =
                          isOddCount && position === featuredSlugs.length - 1;

                        let spanClass: string;
                        if (isLastAlone) {
                          spanClass = "md:col-span-3";
                        } else {
                          const pairIndex = Math.floor(position / 2);
                          const pairPosition = position % 2;
                          if (pairIndex % 2 === 0) {
                            spanClass =
                              pairPosition === 0
                                ? "md:col-span-1"
                                : "md:col-span-2";
                          } else {
                            spanClass =
                              pairPosition === 0
                                ? "md:col-span-2"
                                : "md:col-span-1";
                          }
                        }

                        return (
                          <div
                            key={slug}
                            onDragOver={handleDragOver}
                            onDrop={(e) => {
                              e.preventDefault();
                              handleCollectionDrop(position);
                            }}
                            onDragEnd={handleDragEnd}
                            className={`relative rounded-sm overflow-hidden min-h-[150px] sm:min-h-[180px] border-2 transition-all ${
                              dragIndex === position
                                ? "border-primary-400 opacity-70"
                                : "border-transparent hover:border-gray-200"
                            } ${spanClass}`}
                          >
                            {col ? (
                              <div
                                draggable
                                onDragStart={() => handleDragStart(position)}
                                className="relative h-full w-full cursor-grab active:cursor-grabbing select-none group"
                              >
                                {col.image?.url && (
                                  <img
                                    src={col.image.url}
                                    alt={col.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <h3 className="text-white font-medium text-sm sm:text-base drop-shadow-md truncate">
                                    {col.name}
                                  </h3>
                                </div>
                                <div className="absolute top-2 left-2 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded-full">
                                  #{position + 1}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCollection(slug)}
                                  className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                {dragIndex === position && (
                                  <div className="absolute inset-0 bg-primary-500/10 flex items-center justify-center">
                                    <GripVertical className="w-6 h-6 text-primary-500" />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full text-primary-200 text-sm p-4">
                                Not found
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Available to add */}
              <div>
                <p className="text-sm font-semibold text-primary-400 mb-2">
                  Add a collection{" "}
                  <span className="font-normal text-primary-200">
                    ({featuredSlugs.length} selected)
                  </span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {allCollections
                    .filter((c) => !featuredSlugs.includes(c.slug))
                    .map((col) => (
                      <button
                        key={col.id}
                        onClick={() => addCollection(col.slug)}
                        className="flex items-center gap-2 p-3 text-left border border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-colors rounded-sm"
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
                      All published collections are selected.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSaveCollections}
                  disabled={updateMutation.isPending || savedCollections}
                  leadingIcon={
                    updateMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : savedCollections ? (
                      <Check className="w-4 h-4" />
                    ) : undefined
                  }
                >
                  {updateMutation.isPending
                    ? "Saving…"
                    : savedCollections
                    ? "Saved!"
                    : "Save Collections"}
                </Button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
