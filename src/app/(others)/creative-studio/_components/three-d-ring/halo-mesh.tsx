import { RingMesh } from "./ring-mesh";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface HaloMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  texture: any;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  performanceTier: PerformanceTier;
}

export function HaloMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  texture,
  position = [0, 0, 0],
  scale = 1,
  performanceTier,
}: HaloMeshProps) {
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

interface HiddenHaloMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  haloMetalGeometry: any;
  texture: any;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  performanceTier: PerformanceTier;
}

export function HiddenHaloMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  haloMetalGeometry,
  texture,
  position = [0, 0, 0],
  scale = 1,
  performanceTier,
}: HiddenHaloMeshProps) {
  return (
    <group position={position} scale={scale}>
      <RingMesh
        geometry={metalGeometry}
        material={metalMaterial}
        performanceTier={performanceTier}
      />
      <RingMesh
        geometry={haloMetalGeometry}
        material={metalMaterial}
        performanceTier={performanceTier}
      />
      <RingMesh
        geometry={gemstoneGeometry}
        isGemstone
        isHaloGemstone
        texture={texture}
        performanceTier={performanceTier}
      />
    </group>
  );
}
