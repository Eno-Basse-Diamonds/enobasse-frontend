import { HEAD_STYLES, KARATS, METAL_TYPES, SHANK_STYLES } from "./constants";
import type { RingConfiguration } from "./types";

/**
 * Build a config key from gemstone, head, shank and metal selections.
 *
 * @description Concatenates the four identifiers into a single dash-separated
 * key used for caching or lookup of ring configurations.
 * @param gemstoneShape - The shape of the gemstone
 * @param headStyle - The head style identifier
 * @param shankStyle - The shank style identifier
 * @param metalType - The metal type identifier
 * @returns A dash-separated config key string
 */
export const createConfigKey = (
  gemstoneShape: string,
  headStyle: string,
  shankStyle: string,
  metalType: string,
): string => `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

/**
 * Get the human-readable metal name combining type and karat.
 *
 * @description Looks up the metal type and karat from their respective
 * constants and returns a formatted display name (e.g., "18K Yellow Gold").
 * Returns "Platinum" directly for platinum metal type.
 * @param metalType - The metal type identifier
 * @param karat - The karat identifier
 * @returns The formatted metal name string, or empty string if not found
 */
export const getFullMetalName = (metalType: string, karat: string): string => {
  if (metalType === "platinum") return "Platinum";

  const metal = METAL_TYPES.find((m) => m.id === metalType);
  const karatOption = KARATS.find((k) => k.id === karat);

  return karatOption && metal ? `${karatOption.name} ${metal.name}` : "";
};

/**
 * Generate a descriptive ring name from head and shank styles.
 *
 * @description Combines the shank and head display names into a human-readable
 * ring product name (e.g., "Solitaire Engagement Ring with Classic Head").
 * @param headStyle - The head style identifier
 * @param shankStyle - The shank style identifier
 * @returns The formatted ring name string
 */
export const getRingName = (headStyle: string, shankStyle: string): string => {
  const shank = SHANK_STYLES.find((s) => s.id === shankStyle);
  const head = HEAD_STYLES.find((h) => h.id === headStyle);

  return `${shank?.name || "Solitaire"} Engagement Ring with ${head?.name || "Classic"} Head`;
};

/**
 * Format a byte count into a human-readable string.
 *
 * @description Converts a raw byte count into a more readable format with
 * appropriate units (Bytes, KB, MB, GB).
 * @param bytes - The byte count to format
 * @returns A formatted string like "1.5 MB"
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Format a timestamp into a relative age string.
 *
 * @description Converts a Unix timestamp (ms) into a relative time string such
 * as "3h ago", "2d ago", or "Just now" for recent timestamps.
 * @param timestamp - The Unix timestamp in milliseconds
 * @returns A relative time string
 */
export const formatAge = (timestamp: number): string => {
  const now = Date.now();
  const ageMs = now - timestamp;
  const ageMinutes = Math.floor(ageMs / (1000 * 60));
  const ageHours = Math.floor(ageMinutes / 60);
  const ageDays = Math.floor(ageHours / 24);

  if (ageDays > 0) return `${ageDays}d ago`;
  if (ageHours > 0) return `${ageHours}h ago`;
  if (ageMinutes > 0) return `${ageMinutes}m ago`;
  return "Just now";
};

/**
 * Validate that a ring configuration has all required fields.
 *
 * @description Checks that gemstoneShape, headStyle, shankStyle, metalType,
 * and karat are all present (truthy) on the configuration object.
 * @param config - The ring configuration object to validate
 * @returns True if all required fields are present, false otherwise
 */
export const validateConfiguration = (config: RingConfiguration): boolean => {
  return !!(
    config.gemstoneShape &&
    config.headStyle &&
    config.shankStyle &&
    config.metalType &&
    config.karat
  );
};

// Asset folder/file names don't always match the style ids used in the UI.
const SHANK_FOLDER_ALIASES: Record<string, string> = {
  solitaire: "solitare",
  "alternating-baguette": "alterating-baguette",
};

/**
 * Get the 3D model file path for a given gemstone, head, or shank.
 *
 * @description Constructs the .gltf model path based on the asset type and
 * its identifier. For heads, the gemstone shape is also needed to resolve the
 * correct sub-path. Uses aliases for folder names that don't match style IDs.
 * @param type - The asset type: "gemstone", "head", or "shank"
 * @param id - The asset identifier
 * @param gemstoneShape - The gemstone shape (only used when type is "head")
 * @returns The model file path string, or empty string for unknown types
 */
export const getModelPath = (
  type: "gemstone" | "head" | "shank",
  id: string,
  gemstoneShape?: string,
): string => {
  const basePath = "/models";

  switch (type) {
    case "gemstone":
      return `${basePath}/gemstones/${id.toLowerCase()}.gltf`;
    case "head": {
      const shape = (gemstoneShape || "").toLowerCase();
      return `${basePath}/head/${id}/${shape}.gltf`;
    }
    case "shank": {
      const folder = SHANK_FOLDER_ALIASES[id] || id;
      return `${basePath}/shank/${folder}.gltf`;
    }
    default:
      return "";
  }
};

/**
 * Create a debounced version of a function.
 *
 * @description Returns a new function that delays invoking the provided
 * function until after `delay` milliseconds have elapsed since the last call.
 * Useful for rate-limiting expensive operations like search input handlers.
 * @param func - The function to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns A debounced version of the input function
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
