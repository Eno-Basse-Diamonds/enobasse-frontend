import { RingMesh } from "./ring-mesh";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface PaveMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  texture: any;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  performanceTier: PerformanceTier;
}

export function PaveMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  texture,
  position = [0, 0, 0],
  scale = 1,
  performanceTier,
}: PaveMeshProps) {
  return (
    <group position={position} scale={scale}>
      <RingMesh
        geometry={gemstoneGeometry}
        isGemstone
        isHaloGemstone
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
