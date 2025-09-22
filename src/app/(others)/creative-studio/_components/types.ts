interface ThreeDProperties {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export interface GemstoneProperties extends ThreeDProperties {}
export interface HeadProperties extends ThreeDProperties {}
export interface ShankProperties extends ThreeDProperties {}
