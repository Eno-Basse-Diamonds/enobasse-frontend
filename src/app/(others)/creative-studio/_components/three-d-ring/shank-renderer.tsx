import React from "react";
import { BufferGeometry, Mesh, MeshPhysicalMaterial } from "three";
import { RingMesh } from "./ring-mesh";
import { AccentDiamonds } from "./accent-diamonds";
import { getDecorationAnchors } from "./anchor-utils";
import { GLTFResult } from "./types";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface ShankRendererProps {
  shankData: GLTFResult;
  metalMaterial: MeshPhysicalMaterial;
  texture: any;
  performanceTier: PerformanceTier;
  gemScale: number;
  accentGeometryByShapePrefix: (prefix: string) => BufferGeometry | undefined;
}

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
