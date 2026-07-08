"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, invalidate } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { BufferGeometry, Group, MeshStandardMaterial } from "three";
import { RGBELoader } from "three-stdlib";
import {
  useMobileDetection,
  PerformanceTier,
} from "@/lib/hooks/use-mobile-detection";
import {
  ACCENT_GEM_SHAPES,
  ACCENT_SHAPE_BY_ANCHOR_PREFIX,
  GEM_SCALE,
  METAL_MATERIALS,
  RING_SCENE_SCALE,
} from "../../../../lib/utils/constants/creative-studio";
import { getModelPath } from "@/lib/utils/creative-studio";
import { RingMesh } from "./three-d-ring/ring-mesh";
import { HeadRenderer } from "./three-d-ring/head-renderer";
import { ShankRenderer } from "./three-d-ring/shank-renderer";
import { useRingCapture } from "./three-d-ring/use-ring-capture";
import {
  findFirstMeshGeometry,
  getAnchorTransform,
} from "./three-d-ring/anchor-utils";
import { GLTFResult } from "./three-d-ring/types";

const ACCENT_MODEL_PATHS = ACCENT_GEM_SHAPES.map((shape) =>
  getModelPath("gemstone", shape),
);

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

  // Accent-diamond anchors can call for any of a handful of shapes
  // (see ACCENT_SHAPE_BY_ANCHOR_PREFIX), so all of them are preloaded up
  // front — independent of the selected center gemstone shape.
  const accentData = useGLTF(ACCENT_MODEL_PATHS) as GLTFResult[];

  const texture = useLoader(RGBELoader, environment);

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
        accentData={accentData}
        metalType={metalType}
        gemstoneShape={gemstoneShape}
        shankStyle={shankStyle}
        headStyle={headStyle}
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
  accentData: GLTFResult[];
  rotationSpeed?: number;
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
  accentData,
  gemstoneShape,
  metalType,
  shankStyle,
  headStyle,
  texture,
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

  const gemstoneGeometry = useMemo(
    () => findFirstMeshGeometry(gemstoneData.nodes),
    [gemstoneData],
  );

  const accentGeometryByShape = useMemo(() => {
    const byShape: Record<string, BufferGeometry | undefined> = {};
    ACCENT_GEM_SHAPES.forEach((shape, index) => {
      byShape[shape] = findFirstMeshGeometry(accentData[index].nodes);
    });
    return byShape;
  }, [accentData]);

  const accentGeometryByShapePrefix = useCallback(
    (prefix: string): BufferGeometry | undefined => {
      const shape = ACCENT_SHAPE_BY_ANCHOR_PREFIX[prefix] || "round";
      return accentGeometryByShape[shape];
    },
    [accentGeometryByShape],
  );

  // The head attaches at the shank's ConnectionAnchor, and the center
  // gemstone attaches at the head's MainAnchor — both socket transforms are
  // authored directly on the glTF nodes, so no per-combination tuning table
  // is needed to line pieces up.
  const headAttachment = useMemo(
    () => getAnchorTransform(shankData.nodes.ConnectionAnchor),
    [shankData],
  );
  const gemstoneAttachment = useMemo(
    () => getAnchorTransform(headData.nodes.MainAnchor),
    [headData],
  );
  const gemstoneScale = gemstoneAttachment.scale.map(
    (s) => s * GEM_SCALE,
  ) as [number, number, number];

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
    <group ref={groupRef} dispose={null} scale={RING_SCENE_SCALE}>
      {/* Shank */}
      <ShankRenderer
        shankData={shankData}
        metalMaterial={metalMaterial}
        texture={texture}
        performanceTier={performanceTier}
        gemScale={GEM_SCALE}
        accentGeometryByShapePrefix={accentGeometryByShapePrefix}
      />

      <group
        position={headAttachment.position}
        quaternion={headAttachment.quaternion}
      >
        {/* Head */}
        <HeadRenderer
          headData={headData}
          metalMaterial={metalMaterial}
          texture={texture}
          performanceTier={performanceTier}
          gemScale={GEM_SCALE}
          accentGeometryByShapePrefix={accentGeometryByShapePrefix}
        />

        {/* Gemstone */}
        <group
          position={gemstoneAttachment.position}
          quaternion={gemstoneAttachment.quaternion}
          scale={gemstoneScale}
        >
          <RingMesh
            geometry={gemstoneGeometry}
            isGemstone
            texture={texture}
            performanceTier={performanceTier}
          />
        </group>
      </group>
    </group>
  );
};
