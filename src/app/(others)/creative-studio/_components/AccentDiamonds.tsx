import React from "react";

import { BufferGeometry, Object3D } from "three";

import type { PerformanceTier } from "@/shared/hooks/useMobileDetection";
import { getAnchorShapePrefix, getAnchorTransform } from "@/shared/utils/anchor";

import { RingMesh } from "./RingMesh";

interface AccentDiamondsProps {
  anchors: Object3D[];
  geometryByShapePrefix: (prefix: string) => BufferGeometry | undefined;
  gemScale: number;
  texture: any;
  performanceTier: PerformanceTier;
}

/**
 * Accent diamond renderer.
 *
 * @description Renders accent diamond meshes at each anchor position with
 * the appropriate geometry, scale, and rotation derived from the anchor's
 * world transform.
 * @param anchors - Decoration anchor objects from the glTF scene.
 * @param geometryByShapePrefix - Function that returns the geometry for a
 * given shape prefix string.
 * @param gemScale - Global scale multiplier applied to accent diamonds.
 * @param texture - Environment / refraction texture map.
 * @param performanceTier - Device performance tier for quality adjustments.
 * @returns A group of accent diamond meshes.
 */
export const AccentDiamonds: React.FC<AccentDiamondsProps> = ({
  anchors,
  geometryByShapePrefix,
  gemScale,
  texture,
  performanceTier,
}) => {
  return (
    <>
      {anchors.map((anchor) => {
        const geometry = geometryByShapePrefix(getAnchorShapePrefix(anchor));
        if (!geometry) return null;

        const { position, quaternion, scale } = getAnchorTransform(anchor);

        return (
          <group
            key={anchor.uuid}
            position={position}
            quaternion={quaternion}
            scale={scale.map((s) => s * gemScale) as [number, number, number]}
          >
            <RingMesh
              geometry={geometry}
              isGemstone
              texture={texture}
              performanceTier={performanceTier}
            />
          </group>
        );
      })}
    </>
  );
};
