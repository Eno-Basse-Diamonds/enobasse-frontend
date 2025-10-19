import React from 'react';
import { RingMesh } from './ring-mesh';

interface PaveMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  texture: any;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

export function PaveMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  texture,
  position = [0, 0, 0],
  scale = 1,
}: PaveMeshProps) {
  return (
    <group position={position} scale={scale}>
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
