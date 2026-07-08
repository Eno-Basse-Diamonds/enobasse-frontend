import { memo } from "react";
import { MeshRefractionMaterial } from "@react-three/drei";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface RingMeshProps {
  geometry: any;
  material?: any;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  isGemstone?: boolean;
  isHaloGemstone?: boolean;
  texture?: any;
  performanceTier?: PerformanceTier;
}

function getRefractionBounces(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 4;
  }
}

// Real diamond has a high dispersion index (~0.044 vs ~0.01-0.02 for glass),
// which is what produces its characteristic rainbow "fire" — a subtle
// aberrationStrength here reads as glassy, not diamond-like.
function getAberrationStrength(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 0.04;
    case "medium":
      return 0.03;
    case "low":
      return 0.03; // Disable on low-power devices
    default:
      return 0.04;
  }
}

// A real diamond's IOR is 2.417; kept close to that (rather than pushed to
// 3, which warps facets into an unnaturally swirly look) for a believable
// refraction pattern.
function getIOR(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 2.6;
    case "medium":
      return 2.42;
    case "low":
      return 2.2;
    default:
      return 2.6;
  }
}

function RingMeshComponent({
  geometry,
  material,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  isGemstone = false,
  isHaloGemstone = false,
  texture,
  performanceTier = "high",
}: RingMeshProps) {
  if (isGemstone) {
    return (
      <mesh
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      >
        <MeshRefractionMaterial
          envMap={texture}
          bounces={getRefractionBounces(performanceTier)}
          aberrationStrength={getAberrationStrength(performanceTier)}
          ior={getIOR(performanceTier)}
          fresnel={1}
          color="#f7f7f7"
          toneMapped
        />
      </mesh>
    );
  }

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  );
}

// Memoize to prevent unnecessary re-renders
export const RingMesh = memo(RingMeshComponent);
