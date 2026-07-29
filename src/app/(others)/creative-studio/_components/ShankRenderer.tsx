import React from "react";

import { BufferGeometry, Mesh, MeshPhysicalMaterial } from "three";

import type { PerformanceTier } from "@/shared/hooks/useMobileDetection";
import { GLTFResult } from "@/shared/types/creativeStudio";
import { getDecorationAnchors } from "@/shared/utils/anchor";

import { AccentDiamonds } from "./AccentDiamonds";
import { RingMesh } from "./RingMesh";

interface ShankRendererProps {
  shankData: GLTFResult;
  metalMaterial: MeshPhysicalMaterial;
  texture: any;
  performanceTier: PerformanceTier;
  gemScale: number;
  accentGeometryByShapePrefix: (prefix: string) => BufferGeometry | undefined;
}

/**
 * Shank 3D model renderer.
 *
 * @description Renders the shank (band) mesh for the ring using a Metal
 * material and any accent diamonds found on the shank's decoration anchors.
 * @param shankData - Loaded GLTF data for the shank model.
 * @param metalMaterial - MeshPhysicalMaterial configured for the selected
 * metal type.
 * @param texture - Environment / refraction texture map.
 * @param performanceTier - Device performance tier for quality adjustments.
 * @param gemScale - Global scale multiplier for accent diamonds.
 * @param accentGeometryByShapePrefix - Function returning geometry for a
 * given shape prefix.
 * @returns The shank mesh and accent diamonds.
 */
export const ShankRenderer: React.FC<ShankRendererProps> = ({
  shankData,
  metalMaterial,
  texture,
  performanceTier,
  gemScale,
  accentGeometryByShapePrefix,
}) => {
  const anchors = getDecorationAnchors(shankData.nodes);

  return (
    <>
      <RingMesh
        geometry={(shankData.nodes.Body as Mesh)?.geometry}
        material={metalMaterial}
        performanceTier={performanceTier}
      />

      <AccentDiamonds
        anchors={anchors}
        geometryByShapePrefix={accentGeometryByShapePrefix}
        gemScale={gemScale}
        texture={texture}
        performanceTier={performanceTier}
      />
    </>
  );
};
