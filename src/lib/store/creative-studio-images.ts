import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GeneratedImage {
  src: string;
  alt: string;
  timestamp: number;
}

export interface ImageCacheEntry {
  images: GeneratedImage[];
  timestamp: number;
  lastAccessed: number;
}

interface CreativeStudioImageCacheState {
  cache: Record<string, ImageCacheEntry>;
  maxEntries: number;

  getCachedImages: (configKey: string) => GeneratedImage[] | null;
  setCachedImages: (configKey: string, images: GeneratedImage[]) => void;
  clearCache: () => void;
  clearOldEntries: () => void;
  getCacheStats: () => { entries: number; maxEntries: number };
}

export const useCreativeStudioImageCache =
  create<CreativeStudioImageCacheState>()(
    persist(
      (set, get) => ({
        cache: {},
        maxEntries: 10,

        getCachedImages: (configKey: string) => {
          const entry = get().cache[configKey];
          if (!entry) return null;

          set((state) => ({
            cache: {
              ...state.cache,
              [configKey]: {
                ...entry,
                lastAccessed: Date.now(),
              },
            },
          }));

          return entry.images;
        },

        setCachedImages: (configKey: string, images: GeneratedImage[]) => {
          const now = Date.now();
          const state = get();
          const currentEntries = Object.keys(state.cache).length;

          if (currentEntries >= state.maxEntries && !state.cache[configKey]) {
            const entries = Object.entries(state.cache);
            entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);

            const [oldestKey] = entries[0];

            set((state) => {
              const newCache = { ...state.cache };
              delete newCache[oldestKey];
              newCache[configKey] = {
                images,
                timestamp: now,
                lastAccessed: now,
              };
              return { cache: newCache };
            });
          } else {
            set((state) => ({
              cache: {
                ...state.cache,
                [configKey]: {
                  images,
                  timestamp: now,
                  lastAccessed: now,
                },
              },
            }));
          }
        },

        clearCache: () => {
          set({ cache: {} });
        },

        clearOldEntries: () => {
          const now = Date.now();
          const maxImageAge = 24 * 60 * 60 * 1000; // 24 hours

          set((state) => {
            const newCache = { ...state.cache };

            Object.entries(newCache).forEach(([key, entry]) => {
              if (now - entry.timestamp > maxImageAge) {
                delete newCache[key];
              }
            });

            return {
              cache: newCache,
            };
          });
        },

        getCacheStats: () => {
          const state = get();
          const entries = Object.keys(state.cache).length;
          return {
            entries,
            maxEntries: state.maxEntries,
          };
        },
      }),
      {
        name: "creative-studio-image-cache",
      }
    )
  );

export const createConfigKey = (
  gemstoneShape: string,
  headStyle: string,
  shankStyle: string,
  metalType: string
): string => {
  const shape = gemstoneShape || "default";
  const head = headStyle || "default";
  const shank = shankStyle || "default";
  const metal = metalType || "default";

  return `${shape}-${head}-${shank}-${metal}`;
};

export const createGeneratedImage = (
  src: string,
  alt: string
): GeneratedImage => {
  return {
    src,
    alt: alt || "Generated product image",
    timestamp: Date.now(),
  };
};

export const clearExpiredImages = () => {
  useCreativeStudioImageCache.getState().clearOldEntries();
};

export const getCacheStatistics = () => {
  return useCreativeStudioImageCache.getState().getCacheStats();
};

export const isCacheFull = () => {
  const state = useCreativeStudioImageCache.getState();
  return Object.keys(state.cache).length >= state.maxEntries;
};

export const getCachedConfigs = () => {
  const state = useCreativeStudioImageCache.getState();
  return Object.keys(state.cache);
};
