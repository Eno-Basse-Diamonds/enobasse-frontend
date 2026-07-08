import React from "react";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import { RingMesh } from "./ring-mesh";
import { AccentDiamonds } from "./accent-diamonds";
import { getDecorationAnchors } from "./anchor-utils";
import { GLTFResult } from "./types";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface HeadRendererProps {
  headData: GLTFResult;
  metalMaterial: MeshStandardMaterial;
  texture: any;
  performanceTier: PerformanceTier;
  gemScale: number;
  accentGeometryByShapePrefix: (prefix: string) => BufferGeometry | undefined;
}

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
