import { create } from "zustand";

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

/**
 * Creative studio image cache store.
 *
 * @description Zustand store that caches generated creative studio images
 * with LRU eviction.
 * @returns The image cache store hook
 */
export const useCreativeStudioImageCache = create<CreativeStudioImageCacheState>()((set, get) => ({
  cache: {},
  maxEntries: 10,

  getCachedImages: (configKey: string) => {
    // Clean up legacy LocalStorage key to free up 5MB quota for other parts of the site (Cart, Wishlist, etc.)
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.removeItem("creative-studio-image-cache");
      } catch (e) {
        // Ignore errors
      }
    }

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
}));

/**
 * Builds a config key.
 *
 * @description Builds a config key string from gemstone, head, shank and
 * metal selections.
 * @param gemstoneShape - The gemstone shape
 * @param headStyle - The head style
 * @param shankStyle - The shank style
 * @param metalType - The metal type
 * @returns The config key string
 */
export const createConfigKey = (
  gemstoneShape: string,
  headStyle: string,
  shankStyle: string,
  metalType: string,
): string => {
  const shape = gemstoneShape || "default";
  const head = headStyle || "default";
  const shank = shankStyle || "default";
  const metal = metalType || "default";

  return `${shape}-${head}-${shank}-${metal}`;
};

/**
 * Creates a generated image object.
 *
 * @description Creates a GeneratedImage object with the current timestamp.
 * @param src - The image source URL
 * @param alt - The image alt text
 * @returns The GeneratedImage object
 */
export const createGeneratedImage = (src: string, alt: string): GeneratedImage => {
  return {
    src,
    alt: alt || "Generated product image",
    timestamp: Date.now(),
  };
};

/**
 * Clears expired cached images.
 *
 * @description Clears cached images older than 24 hours.
 */
export const clearExpiredImages = () => {
  useCreativeStudioImageCache.getState().clearOldEntries();
};

/**
 * Gets cache statistics.
 *
 * @description Gets current cache statistics (entry count and max entries).
 * @returns The cache statistics
 */
export const getCacheStatistics = () => {
  return useCreativeStudioImageCache.getState().getCacheStats();
};

/**
 * Checks if cache is full.
 *
 * @description Checks whether the image cache has reached its maximum entry
 * limit.
 * @returns Whether the cache is full
 */
export const isCacheFull = () => {
  const state = useCreativeStudioImageCache.getState();
  return Object.keys(state.cache).length >= state.maxEntries;
};

/**
 * Gets cached config keys.
 *
 * @description Gets the list of all cached config keys.
 * @returns The array of cached config keys
 */
export const getCachedConfigs = () => {
  const state = useCreativeStudioImageCache.getState();
  return Object.keys(state.cache);
};
