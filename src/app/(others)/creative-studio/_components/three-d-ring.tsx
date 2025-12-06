"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, invalidate } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { RGBELoader } from "three-stdlib";
import {
  useMobileDetection,
  PerformanceTier,
} from "@/lib/hooks/use-mobile-detection";
import {
  GEMSTONE_3D_PROPERTIES,
  METAL_MATERIALS,
} from "../../../../lib/utils/constants/creative-studio";
import { getModelPath } from "@/lib/utils/creative-studio";
import { RingMesh } from "./three-d-ring/ring-mesh";
import { HeadRenderer } from "./three-d-ring/head-renderer";
import { ShankRenderer } from "./three-d-ring/shank-renderer";
import { useRingCapture } from "./three-d-ring/use-ring-capture";
import { GLTFResult } from "./three-d-ring/types";

interface ThreeDRingProps {
  gemstoneShape: string;
  headStyle: string;
  shankStyle: string;
  metalType: string;
  onImagesGenerated?: (images: Array<{ src: string; alt: string }>) => void;
  onImageGenerationStart?: () => void;
  imagesReady?: boolean;
}

export function ThreeDRing({
  gemstoneShape,
  headStyle,
  shankStyle,
  metalType,
  onImagesGenerated,
  onImageGenerationStart,
  imagesReady = false,
}: ThreeDRingProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const [prevConfig, setPrevConfig] = useState("");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const controlsRef = useRef<any>(null);

  // Mobile performance optimization
  const { isMobile, performanceTier } = useMobileDetection();

  const currentConfig = `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

  const environment = "/texture/metal3.hdr";

  const gemstonePath = getModelPath("gemstone", gemstoneShape);
  const gemstoneData = useGLTF(gemstonePath) as GLTFResult;

  const headPath = getModelPath("head", headStyle, gemstoneShape);
  const headData = useGLTF(headPath) as GLTFResult;

  const shankPath = getModelPath("shank", shankStyle);
  const shankData = useGLTF(shankPath) as GLTFResult;

  const texture = useLoader(RGBELoader, environment);

  let threeStoneSideData: GLTFResult | undefined = undefined;

  if (headStyle === "three-stone") {
    const sideHeadPath = `/3d-models/Head/${gemstoneShape.toUpperCase()}/${headStyle.toUpperCase()}.SIDE.glb`;
    threeStoneSideData = useGLTF(sideHeadPath) as GLTFResult;
  }

  useEffect(() => {
    if (gemstoneData && headData && shankData) {
      setSceneReady(true);
    }

    if (currentConfig !== prevConfig) {
      if (onImageGenerationStart) {
        onImageGenerationStart();
      }
      setPrevConfig(currentConfig);
    }
  }, [
    gemstoneData,
    headData,
    shankData,
    onImageGenerationStart,
    currentConfig,
    prevConfig,
  ]);

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      frameloop={isMobile ? "demand" : "always"}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 25, -40], fov: 33 }}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <Environment files={environment} />
      </Suspense>

      <RotatingRing
        key={currentConfig}
        headData={headData}
        gemstoneData={gemstoneData}
        shankData={shankData}
        metalType={metalType}
        gemstoneShape={gemstoneShape}
        shankStyle={shankStyle}
        headStyle={headStyle}
        threeStoneSideData={threeStoneSideData}
        texture={texture}
        sceneReady={sceneReady}
        onImagesGenerated={onImagesGenerated}
        imagesReady={imagesReady}
        controlsRef={controlsRef}
        isUserInteracting={isUserInteracting}
        performanceTier={performanceTier}
        isMobile={isMobile}
      />

      <OrbitControls
        ref={controlsRef}
        enabled={true}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={40}
        maxDistance={60}
        zoomSpeed={0.8}
        rotateSpeed={0.7}
        onStart={() => setIsUserInteracting(true)}
        onEnd={() => setIsUserInteracting(false)}
      />
    </Canvas>
  );
}

interface RotatingRingProps {
  gemstoneShape: string;
  metalType: string;
  headStyle: string;
  shankStyle: string;
  headData: GLTFResult;
  gemstoneData: GLTFResult;
  shankData: GLTFResult;
  rotationSpeed?: number;
  threeStoneSideData?: GLTFResult;
  texture: any;
  sceneReady: boolean;
  onImagesGenerated?: (images: { src: string; alt: string }[]) => void;
  imagesReady?: boolean;
  controlsRef: React.RefObject<any>;
  isUserInteracting: boolean;
  performanceTier: PerformanceTier;
  isMobile: boolean;
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
  sceneReady,
  onImagesGenerated,
  imagesReady = false,
  rotationSpeed = 0.3,
  controlsRef,
  isUserInteracting,
  performanceTier,
  isMobile,
}) => {
  const groupRef = useRef<Group>(null);

  useRingCapture({
    gemstoneShape,
    headStyle,
    shankStyle,
    metalType,
    sceneReady,
    controlsRef,
    onImagesGenerated,
  });

  // Memoize material to prevent recreation on each render
  const metalMaterial = useMemo(
    () =>
      new MeshStandardMaterial(
        METAL_MATERIALS[metalType as keyof typeof METAL_MATERIALS] ||
          METAL_MATERIALS["white-gold"]
      ),
    [metalType]
  );

  const gemstone = gemstoneShape.toUpperCase();
  const gemstoneProperties = GEMSTONE_3D_PROPERTIES[gemstone];

  useFrame((_, delta) => {
    if (groupRef.current && imagesReady && !isUserInteracting) {
      groupRef.current.rotation.y += delta * rotationSpeed;
      // On mobile with demand frameloop, we need to manually invalidate
      if (isMobile) {
        invalidate();
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Gemstone */}
      <RingMesh
        geometry={
          (gemstoneData.nodes[gemstoneShape.toUpperCase()] as Mesh)?.geometry
        }
        position={gemstoneProperties.position as [number, number, number]}
        rotation={gemstoneProperties.rotation as [number, number, number]}
        scale={gemstoneProperties.scale}
        isGemstone
        texture={texture}
        performanceTier={performanceTier}
      />

      {/* Head */}
      <HeadRenderer
        headStyle={headStyle}
        gemstoneShape={gemstoneShape}
        headData={headData}
        threeStoneSideData={threeStoneSideData}
        metalMaterial={metalMaterial}
        texture={texture}
        performanceTier={performanceTier}
      />

      {/* Shank */}
      <ShankRenderer
        shankStyle={shankStyle}
        headStyle={headStyle}
        shankData={shankData}
        metalMaterial={metalMaterial}
        texture={texture}
        performanceTier={performanceTier}
      />
    </group>
  );
};
