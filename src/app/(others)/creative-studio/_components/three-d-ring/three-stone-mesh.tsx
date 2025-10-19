import React from 'react';
import { RingMesh } from './ring-mesh';

interface ThreeStoneMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  texture: any;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export function ThreeStoneMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  texture,
  position,
  rotation,
  scale,
}: ThreeStoneMeshProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RingMesh
        geometry={gemstoneGeometry}
        isGemstone
        texture={texture}
      />
      <RingMesh
        geometry={metalGeometry}
        material={metalMaterial}
      />
    </group>
  );
}
