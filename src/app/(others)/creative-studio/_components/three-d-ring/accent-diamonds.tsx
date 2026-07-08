import React from "react";
import { BufferGeometry, Object3D } from "three";
import { RingMesh } from "./ring-mesh";
import {
  getAnchorShapePrefix,
  getAnchorTransform,
} from "./anchor-utils";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface AccentDiamondsProps {
  anchors: Object3D[];
  geometryByShapePrefix: (prefix: string) => BufferGeometry | undefined;
  gemScale: number;
  texture: any;
  performanceTier: PerformanceTier;
}

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
