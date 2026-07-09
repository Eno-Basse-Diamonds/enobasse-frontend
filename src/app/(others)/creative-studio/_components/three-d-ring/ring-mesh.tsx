import { memo } from "react";
import { MeshRefractionMaterial } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";
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
      return 2;
    case "low":
      return 1;
    default:
      return 4;
  }
}

function getAberrationStrength(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 0.05;
    case "medium":
      return 0.03;
    case "low":
      return 0;
    default:
      return 0.05;
  }
}

function getIOR(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 2.7;
    case "medium":
      return 2.3;
    case "low":
      return 2.2;
    default:
      return 2.7;
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
    // On low-tier devices, MeshRefractionMaterial is too expensive.
    // Use a lightweight MeshPhysicalMaterial with env map instead.
    if (performanceTier === "low") {
      return (
        <mesh
          geometry={geometry}
          position={position}
          rotation={rotation}
          scale={scale}
          castShadow={false}
          receiveShadow={false}
        >
          <meshPhysicalMaterial
            envMap={texture}
            envMapIntensity={1.5}
            metalness={0}
            roughness={0.05}
            transparent
            opacity={0.92}
            color="#e8ecf0"
          />
        </mesh>
      );
    }

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
          color="#c8d0d8"
          fastChroma={performanceTier !== "high"}
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
