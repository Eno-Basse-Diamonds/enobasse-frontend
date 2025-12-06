import { RingMesh } from "./ring-mesh";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface ThreeStoneMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  texture: any;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  performanceTier: PerformanceTier;
}

export function ThreeStoneMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  texture,
  position,
  rotation,
  scale,
  performanceTier,
}: ThreeStoneMeshProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RingMesh
        geometry={gemstoneGeometry}
        isGemstone
        texture={texture}
        performanceTier={performanceTier}
      />
      <RingMesh
        geometry={metalGeometry}
        material={metalMaterial}
        performanceTier={performanceTier}
      />
    </group>
  );
}
