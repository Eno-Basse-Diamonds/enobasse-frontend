import React from 'react';
import { MeshRefractionMaterial } from '@react-three/drei';
import { Mesh } from 'three';
import type { ThreeDProperties } from '../../../../../lib/types/creative-studio';
import { METAL_MATERIALS } from '../../../../../lib/utils/constants/creative-studio';

interface RingMeshProps {
  geometry: any;
  material?: any;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  isGemstone?: boolean;
  texture?: any;
}

export function RingMesh({
  geometry,
  material,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  isGemstone = false,
  texture,
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
          bounces={4}
          aberrationStrength={0.02}
          ior={3}
          fresnel={0}
          color="#e3e3e3"
          toneMapped={false}
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
