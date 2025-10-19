import React from 'react';
import { RingMesh } from './ring-mesh';

interface HaloMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  texture: any;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

export function HaloMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  texture,
  position = [0, 0, 0],
  scale = 1,
}: HaloMeshProps) {
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

interface HiddenHaloMeshProps {
  gemstoneGeometry: any;
  metalGeometry: any;
  metalMaterial: any;
  haloMetalGeometry: any;
  texture: any;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

export function HiddenHaloMesh({
  gemstoneGeometry,
  metalGeometry,
  metalMaterial,
  haloMetalGeometry,
  texture,
  position = [0, 0, 0],
  scale = 1,
}: HiddenHaloMeshProps) {
  return (
    <group position={position} scale={scale}>
      <RingMesh
        geometry={metalGeometry}
        material={metalMaterial}
      />
      <RingMesh
        geometry={haloMetalGeometry}
        material={metalMaterial}
      />
      <RingMesh
        geometry={gemstoneGeometry}
        isGemstone
        texture={texture}
      />
    </group>
  );
}
