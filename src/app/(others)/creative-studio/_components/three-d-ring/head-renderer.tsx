import React from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { MeshRefractionMaterial } from "@react-three/drei";
import { HEAD_3D_PROPERTIES } from "@/lib/utils/constants/creative-studio";
import { RingMesh } from "./ring-mesh";
import { HaloMesh, HiddenHaloMesh } from "./halo-mesh";
import { ThreeStoneMesh } from "./three-stone-mesh";
import { GLTFResult } from "./types";
import type { PerformanceTier } from "@/lib/hooks/use-mobile-detection";

interface HeadRendererProps {
  headStyle: string;
  gemstoneShape: string;
  headData: GLTFResult;
  threeStoneSideData?: GLTFResult;
  metalMaterial: MeshStandardMaterial;
  texture: any;
  performanceTier: PerformanceTier;
}

export const HeadRenderer: React.FC<HeadRendererProps> = ({
  headStyle,
  gemstoneShape,
  headData,
  threeStoneSideData,
  metalMaterial,
  texture,
  performanceTier,
}) => {
  const head = headStyle.toUpperCase();
  const gemstone = gemstoneShape.toUpperCase();
  const headProperties = HEAD_3D_PROPERTIES[head]?.[gemstone];

  // Use performance tier for reduced quality on mobile
  const getRefractionBounces = (): number => {
    switch (performanceTier) {
      case "high":
        return 4;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 4;
    }
  };

  return (
    <>
      {head !== "HIDDEN-HALO" && (
        <RingMesh
          geometry={(headData.nodes[head] as Mesh)?.geometry}
          material={metalMaterial}
          position={headProperties?.position as [number, number, number]}
          rotation={headProperties?.rotation as [number, number, number]}
          scale={headProperties?.scale}
          performanceTier={performanceTier}
        />
      )}

      {head === "HIDDEN-HALO" && (
        <HiddenHaloMesh
          gemstoneGeometry={
            (headData.nodes["HIDDEN-HALOGEMSTONES"] as Mesh)?.geometry
          }
          metalGeometry={(headData.nodes["HIDDEN-HALO"] as Mesh)?.geometry}
          haloMetalGeometry={
            (headData.nodes["HIDDEN-HALOMETAL"] as Mesh)?.geometry
          }
          metalMaterial={metalMaterial}
          texture={texture}
          position={[0, 0.2, 0]}
          scale={1}
          performanceTier={performanceTier}
        />
      )}

      {head === "CLASSIC-HALO" && (
        <group scale={0.95} position={[0, 0.6, 0]}>
          <HaloMesh
            gemstoneGeometry={
              (headData.nodes["CLASSIC-HALOGEMSTONES"] as Mesh)?.geometry
            }
            metalGeometry={
              (headData.nodes["CLASSIC-HALOMETAL"] as Mesh)?.geometry
            }
            metalMaterial={metalMaterial}
            texture={texture}
            performanceTier={performanceTier}
          />
        </group>
      )}

      {head === "DUAL-HALO" && (
        <group scale={0.75} position={[0, 2.7, 0]}>
          <HaloMesh
            gemstoneGeometry={
              (headData.nodes["DUAL-HALOGEMSTONES01"] as Mesh)?.geometry
            }
            metalGeometry={
              (headData.nodes["DUAL-HALOMETAL01"] as Mesh)?.geometry
            }
            metalMaterial={metalMaterial}
            texture={texture}
            performanceTier={performanceTier}
          />
          <HaloMesh
            gemstoneGeometry={
              (headData.nodes["DUAL-HALOGEMSTONES02"] as Mesh)?.geometry
            }
            metalGeometry={
              (headData.nodes["DUAL-HALOMETAL02"] as Mesh)?.geometry
            }
            metalMaterial={metalMaterial}
            texture={texture}
            position={[0, -0.612, 0]}
            performanceTier={performanceTier}
          />
        </group>
      )}

      {head === "THREE-STONE" &&
        gemstoneShape === "round" &&
        threeStoneSideData && (
          <ThreeStoneMesh
            gemstoneGeometry={
              (threeStoneSideData.nodes["THREE-STONESIDE002"] as Mesh)?.geometry
            }
            metalGeometry={
              (threeStoneSideData.nodes["THREE-STONESIDE002_1"] as Mesh)
                ?.geometry
            }
            metalMaterial={metalMaterial}
            texture={texture}
            position={[-2.395, 8.264, -0.025]}
            rotation={[0.018, 0, -0.098]}
            scale={2.961}
            performanceTier={performanceTier}
          />
        )}

      {head === "THREE-STONE" &&
        gemstoneShape === "princess" &&
        threeStoneSideData && (
          <group
            position={[-3.907, 7.551, 0] as [number, number, number]}
            rotation={[Math.PI / 2, 0.494, 0] as [number, number, number]}
            scale={0.642}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={
                (threeStoneSideData.nodes["THREE-STONESIDE001"] as Mesh)
                  ?.geometry
              }
            >
              <MeshRefractionMaterial
                envMap={texture}
                bounces={getRefractionBounces()}
                aberrationStrength={0.02}
                ior={3}
                fresnel={0}
                color="#e3e3e3"
                toneMapped={false}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={
                (threeStoneSideData.nodes["THREE-STONESIDE001_1"] as Mesh)
                  ?.geometry
              }
              material={metalMaterial}
            />
          </group>
        )}

      {head === "THREE-STONE" &&
        gemstoneShape === "oval" &&
        threeStoneSideData && (
          <group
            position={[-2.842, 0.307, 0] as [number, number, number]}
            rotation={[Math.PI / 2, 0.196, Math.PI] as [number, number, number]}
            scale={0.654}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={
                (threeStoneSideData.nodes["THREE-STONESIDE_2"] as Mesh)
                  ?.geometry
              }
            >
              <MeshRefractionMaterial
                envMap={texture}
                bounces={getRefractionBounces()}
                aberrationStrength={0.02}
                ior={3}
                fresnel={0}
                color="#e3e3e3"
                toneMapped={false}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={
                (threeStoneSideData.nodes["THREE-STONESIDE_1"] as Mesh)
                  ?.geometry
              }
              material={metalMaterial}
            />
          </group>
        )}
    </>
  );
};
