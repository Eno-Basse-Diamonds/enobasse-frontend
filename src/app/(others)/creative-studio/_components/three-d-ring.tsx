"use client";

import { Suspense, useRef } from "react";
import { Canvas, ObjectMap, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, MeshPhysicalMaterial, Color } from "three";
import { RGBELoader } from "three-stdlib";
import {
  gemstone3DProperties,
  head3DProperties,
  shank3DProperties,
} from "@/lib/utils/constants/creative-studio";

interface ThreeDRingProps {
  gemstoneShape: string;
  headStyle: string;
  shankStyle: string;
  metalType: string;
  rotationSpeed?: number;
}

export const ThreeDRing: React.FC<ThreeDRingProps> = ({
  gemstoneShape,
  headStyle,
  shankStyle,
  metalType,
}) => {
  const environment = "/texture/metal3.hdr";

  const gemstonePath = `/3d-models/Gemstone/${gemstoneShape.toUpperCase()}.glb`;
  const gemstoneData = useGLTF(gemstonePath);

  const headPath = `/3d-models/Head/${gemstoneShape.toUpperCase()}/${headStyle.toUpperCase()}.glb`;
  const headData = useGLTF(headPath);

  const shankPath = `/3d-models/Shank/${shankStyle.toUpperCase()}.glb`;
  const shankData = useGLTF(shankPath);

  const texture = useLoader(RGBELoader, environment);

  let threeStoneSideData: ObjectMap | undefined = undefined;

  if (headStyle === "three-stone") {
    const sideHeadPath = `/3d-models/Head/${gemstoneShape.toUpperCase()}/${headStyle.toUpperCase()}.SIDE.glb`;
    threeStoneSideData = useGLTF(sideHeadPath);
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 25, -40], fov: 33 }}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <Environment files={environment} />
      </Suspense>

      <RotatingRing
        headData={headData}
        gemstoneData={gemstoneData}
        shankData={shankData}
        metalType={metalType}
        gemstoneShape={gemstoneShape}
        shankStyle={shankStyle}
        headStyle={headStyle}
        threeStoneSideData={threeStoneSideData}
        texture={texture}
      />

      <OrbitControls />
    </Canvas>
  );
};

interface RotatingRingProps {
  gemstoneShape: string;
  metalType: string;
  headStyle: string;
  shankStyle: string;
  headData: ObjectMap;
  gemstoneData: ObjectMap;
  shankData: ObjectMap;
  rotationSpeed?: number;
  threeStoneSideData?: ObjectMap;
  texture: any;
}

const RotatingRing: React.FC<RotatingRingProps> = ({
  headData,
  gemstoneData,
  shankData,
  gemstoneShape,
  metalType,
  shankStyle,
  headStyle,
  texture,
  threeStoneSideData,
  rotationSpeed = 0.3,
}) => {
  const groupRef = useRef<Group>(null);

  const getMetalMaterial = (type: string) => {
    const materials = {
      "white-gold": { color: "#DBDBDB", metalness: 0.95, roughness: 0.1 },
      "yellow-gold": { color: "#FFD280", metalness: 0.95, roughness: 0.1 },
      "rose-gold": { color: "#FFBAA3", metalness: 0.95, roughness: 0.1 },
      platinum: { color: "#E5E4E2", metalness: 0.95, roughness: 0.1 },
    };

    return new MeshStandardMaterial(
      materials[type as keyof typeof materials] || materials["white-gold"]
    );
  };

  const metalMaterial = getMetalMaterial(metalType);

  const gemstone = gemstoneShape.toUpperCase();
  type GemstoneKey = keyof typeof gemstone3DProperties;
  const gemstoneProperties = gemstone3DProperties[gemstone as GemstoneKey];

  const shank = shankStyle.toUpperCase();
  type ShankKey = keyof typeof shank3DProperties;
  const shankProperties = shank3DProperties[shank as ShankKey];

  const head = headStyle.toUpperCase();
  type HeadKey = keyof typeof head3DProperties;
  const headProperties =
    head3DProperties[head as HeadKey][gemstone as GemstoneKey];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Gemstone */}
      <mesh
        castShadow
        receiveShadow
        geometry={
          (gemstoneData.nodes[gemstoneShape.toUpperCase()] as Mesh)?.geometry
        }
        position={gemstoneProperties.position as [number, number, number]}
        rotation={
          ((gemstoneProperties as any).rotation as [
            number,
            number,
            number,
          ]) || [0, 0, 0]
        }
        scale={gemstoneProperties.scale}
      >
        <MeshRefractionMaterial
          envMap={texture}
          bounces={4}
          aberrationStrength={0.04}
          ior={3}
          fresnel={0}
          color="#e3e3e3"
          toneMapped={false}
        />
      </mesh>

      {/* Head */}
      <mesh
        castShadow
        receiveShadow
        geometry={(headData.nodes[head] as Mesh)?.geometry}
        material={metalMaterial}
        position={(headProperties as any).position as [number, number, number]}
        rotation={
          ((headProperties as any).rotation as [number, number, number]) || [
            0, 0, 0,
          ]
        }
        scale={(headProperties as any).scale}
      />

      {head === "CLASSIC-HALO" && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={
              (headData.nodes["CLASSIC-HALOGEMSTONES"] as Mesh)?.geometry
            }
          >
            <MeshRefractionMaterial
              envMap={texture}
              bounces={1}
              aberrationStrength={0.01}
              ior={2}
              color="white"
              toneMapped={false}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={(headData.nodes["CLASSIC-HALOMETAL"] as Mesh)?.geometry}
            material={metalMaterial}
          />
        </>
      )}

      {head === "DUAL-HALO" && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={
              (headData.nodes["DUAL-HALOGEMSTONES01"] as Mesh)?.geometry
            }
          >
            <MeshRefractionMaterial
              envMap={texture}
              bounces={1}
              aberrationStrength={0.01}
              ior={2}
              color="white"
              toneMapped={false}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={(headData.nodes["DUAL-HALOMETAL01"] as Mesh)?.geometry}
            material={metalMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              (headData.nodes["DUAL-HALOGEMSTONES02"] as Mesh)?.geometry
            }
            position={[0, -0.612, 0] as [number, number, number]}
          >
            <MeshRefractionMaterial
              envMap={texture}
              bounces={1}
              aberrationStrength={0.01}
              ior={2}
              color="white"
              toneMapped={false}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={(headData.nodes["DUAL-HALOMETAL02"] as Mesh)?.geometry}
            material={metalMaterial}
            position={[0, -0.612, 0] as [number, number, number]}
          />
        </>
      )}

      {head === "THREE-STONE" &&
        gemstoneShape === "round" &&
        threeStoneSideData && (
          <group
            position={[-2.395, 8.264, -0.025] as [number, number, number]}
            rotation={[0.018, 0, -0.098] as [number, number, number]}
            scale={2.961}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={
                (threeStoneSideData.nodes["THREE-STONESIDE002"] as Mesh)
                  ?.geometry
              }
            >
              <MeshRefractionMaterial
                envMap={texture}
                bounces={1}
                aberrationStrength={0.01}
                ior={2}
                color="white"
                toneMapped={false}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={
                (threeStoneSideData.nodes["THREE-STONESIDE002_1"] as Mesh)
                  ?.geometry
              }
              material={metalMaterial}
            />
          </group>
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
                bounces={1}
                aberrationStrength={0.01}
                ior={2}
                color="white"
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
                bounces={1}
                aberrationStrength={0.01}
                ior={2}
                color="white"
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

      {/* Shank */}
      <mesh
        castShadow
        receiveShadow
        geometry={(shankData.nodes[shank] as Mesh)?.geometry}
        material={metalMaterial}
        position={
          ((shankProperties as any)?.position as [number, number, number]) || [
            0, 0, 0,
          ]
        }
        rotation={
          ((shankProperties as any)?.rotation as [number, number, number]) || [
            0, 0, 0,
          ]
        }
        scale={(shankProperties as any)?.scale || 1}
      />

      {shank === "FRENCH-PAVE" && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={
              (shankData.nodes["FRENCH-PAVEGEMSTONES"] as Mesh)?.geometry
            }
            position={[0, -1.617, 0] as [number, number, number]}
            scale={1.028}
          >
            <MeshRefractionMaterial
              envMap={texture}
              bounces={1}
              aberrationStrength={0.01}
              ior={2}
              color="white"
              toneMapped={false}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={
              (shankData.nodes["FRENCH-PAVESIDE-SETTINGS"] as Mesh)?.geometry
            }
            material={metalMaterial}
            position={[0, -1.614, 0] as [number, number, number]}
            scale={[1.005, 1.005, 0.996] as [number, number, number]}
          />
        </>
      )}

      {shank === "BAGUETTE-CHANNEL" && (
        <mesh
          castShadow
          receiveShadow
          geometry={
            (shankData.nodes["BAGUETTE-CHANNELGEMSTONES"] as Mesh)?.geometry
          }
          material={
            (shankData.nodes["BAGUETTE-CHANNELGEMSTONES"] as Mesh)?.material
          }
          position={[0, -1.518, 0] as [number, number, number]}
        >
          <MeshRefractionMaterial
            envMap={texture}
            bounces={1}
            aberrationStrength={0.01}
            ior={2}
            color="white"
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
};
