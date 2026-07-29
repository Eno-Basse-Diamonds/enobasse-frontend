import React from "react";

import { BufferGeometry, Mesh, MeshPhysicalMaterial } from "three";

import type { PerformanceTier } from "@/shared/hooks/useMobileDetection";
import { GLTFResult } from "@/shared/types/creativeStudio";
import { getDecorationAnchors } from "@/shared/utils/anchor";

import { AccentDiamonds } from "./AccentDiamonds";
import { RingMesh } from "./RingMesh";

interface HeadRendererProps {
  headData: GLTFResult;
  metalMaterial: MeshPhysicalMaterial;
  texture: any;
  performanceTier: PerformanceTier;
  gemScale: number;
  accentGeometryByShapePrefix: (prefix: string) => BufferGeometry | undefined;
}

/**
 * Head 3D model renderer.
 *
 * @description Renders the head (setting) mesh for the ring using a Metal
 * material and any accent diamonds found on the head's decoration anchors.
 * @param headData - Loaded GLTF data for the head model.
 * @param metalMaterial - MeshPhysicalMaterial configured for the selected
 * metal type.
 * @param texture - Environment / refraction texture map.
 * @param performanceTier - Device performance tier for quality adjustments.
 * @param gemScale - Global scale multiplier for accent diamonds.
 * @param accentGeometryByShapePrefix - Function returning geometry for a
 * given shape prefix.
 * @returns The head mesh and accent diamonds.
 */
export const HeadRenderer: React.FC<HeadRendererProps> = ({
  headData,
  metalMaterial,
  texture,
  performanceTier,
  gemScale,
  accentGeometryByShapePrefix,
}) => {
  const anchors = getDecorationAnchors(headData.nodes);

  return (
    <>
      <RingMesh
        geometry={(headData.nodes.Body as Mesh)?.geometry}
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
