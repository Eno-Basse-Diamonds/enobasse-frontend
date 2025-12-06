import React from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { getShankProperties } from "@/lib/utils/creative-studio";
import { RingMesh } from "./ring-mesh";
import { PaveMesh } from "./pave-mesh";
import { GLTFResult } from "./types";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface ShankRendererProps {
  shankStyle: string;
  headStyle: string;
  shankData: GLTFResult;
  metalMaterial: MeshStandardMaterial;
  texture: any;
  performanceTier: PerformanceTier;
}

export const ShankRenderer: React.FC<ShankRendererProps> = ({
  shankStyle,
  headStyle,
  shankData,
  metalMaterial,
  texture,
  performanceTier,
}) => {
  const shank = shankStyle.toUpperCase();
  const shankProperties = getShankProperties(shankStyle, headStyle);

  return (
    <>
      <RingMesh
        geometry={(shankData.nodes[shank] as Mesh)?.geometry}
        material={metalMaterial}
        position={shankProperties.position || [0, 0, 0]}
        rotation={shankProperties.rotation || [0, 0, 0]}
        scale={shankProperties.scale || 1}
        performanceTier={performanceTier}
      />

      {shank === "FRENCH-PAVE" && (
        <>
          <PaveMesh
            gemstoneGeometry={
              (shankData.nodes["FRENCH-PAVEGEMSTONES"] as Mesh)?.geometry
            }
            metalGeometry={
              (shankData.nodes["FRENCH-PAVESIDE-SETTINGS"] as Mesh)?.geometry
            }
            metalMaterial={metalMaterial}
            texture={texture}
            position={[0, -1.617, 0]}
            scale={1.028}
            performanceTier={performanceTier}
          />
          <RingMesh
            geometry={
              (shankData.nodes["FRENCH-PAVESIDE-SETTINGS"] as Mesh)?.geometry
            }
            material={metalMaterial}
            position={[0, -1.614, 0]}
            scale={[1.005, 1.005, 0.996]}
            performanceTier={performanceTier}
          />
        </>
      )}

      {shank === "BAGUETTE-CHANNEL" && (
        <RingMesh
          geometry={
            (shankData.nodes["BAGUETTE-CHANNELGEMSTONES"] as Mesh)?.geometry
          }
          position={[0, -1.518, 0]}
          isGemstone
          texture={texture}
          performanceTier={performanceTier}
        />
      )}
    </>
  );
};
