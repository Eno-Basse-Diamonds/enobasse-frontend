import type {
  RingConfiguration,
  ThreeDProperties,
} from "../types/creative-studio";
import {
  METAL_TYPES,
  KARATS,
  HEAD_STYLES,
  SHANK_STYLES,
  SHANK_3D_PROPERTIES,
} from "./constants/creative-studio";

export const createConfigKey = (
  gemstoneShape: string,
  headStyle: string,
  shankStyle: string,
  metalType: string,
): string => `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

export const getFullMetalName = (metalType: string, karat: string): string => {
  if (metalType === "platinum") return "Platinum";

  const metal = METAL_TYPES.find((m) => m.id === metalType);
  const karatOption = KARATS.find((k) => k.id === karat);

  return karatOption && metal ? `${karatOption.name} ${metal.name}` : "";
};

export const getRingName = (headStyle: string, shankStyle: string): string => {
  const shank = SHANK_STYLES.find((s) => s.id === shankStyle);
  const head = HEAD_STYLES.find((h) => h.id === headStyle);

  return `${shank?.name || "Solitaire"} Engagement Ring with ${head?.name || "Classic"} Head`;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

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

export const validateConfiguration = (config: RingConfiguration): boolean => {
  return !!(
    config.gemstoneShape &&
    config.headStyle &&
    config.shankStyle &&
    config.metalType &&
    config.karat
  );
};

export const getModelPath = (
  type: "gemstone" | "head" | "shank",
  id: string,
  gemstoneShape?: string,
): string => {
  const basePath = "/3d-models";

  switch (type) {
    case "gemstone":
      return `${basePath}/Gemstone/${id.toUpperCase()}.glb`;
    case "head":
      return `${basePath}/Head/${gemstoneShape?.toUpperCase()}/${id.toUpperCase()}.glb`;
    case "shank":
      return `${basePath}/Shank/${id.toUpperCase()}.glb`;
    default:
      return "";
  }
};

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

export const getShankProperties = (
  shankStyle: string,
  headStyle?: string,
): ThreeDProperties => {
  const shank = shankStyle.toUpperCase();
  const properties = SHANK_3D_PROPERTIES[shank];

  if (!properties) {
    return {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: 1,
    };
  }

  const isSimpleProperties =
    "position" in properties ||
    "rotation" in properties ||
    "scale" in properties;

  if (isSimpleProperties) {
    return properties as ThreeDProperties;
  }

  const nestedProperties = properties as Record<string, ThreeDProperties>;
  const head = headStyle?.toUpperCase();

  if (head && nestedProperties[head]) {
    return nestedProperties[head];
  }

  if (nestedProperties.default) {
    return nestedProperties.default;
  }

  return {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
  };
};
