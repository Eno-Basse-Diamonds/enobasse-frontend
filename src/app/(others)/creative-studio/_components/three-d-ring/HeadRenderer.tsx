import React from "react";

import { BufferGeometry, Mesh, MeshPhysicalMaterial } from "three";

import type { PerformanceTier } from "@/shared/hooks/useMobileDetection";

import { AccentDiamonds } from "./AccentDiamonds";
import { RingMesh } from "./RingMesh";
import { getDecorationAnchors } from "./anchor-utils";
import { GLTFResult } from "./types";

interface HeadRendererProps {
  headData: GLTFResult;
  metalMaterial: MeshPhysicalMaterial;
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
