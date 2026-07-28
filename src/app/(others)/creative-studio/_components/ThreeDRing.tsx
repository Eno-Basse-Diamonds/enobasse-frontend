"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, invalidate, useFrame, useLoader } from "@react-three/fiber";
import { Box3, BufferGeometry, Group, Mesh, MeshPhysicalMaterial, Vector3 } from "three";
import { RGBELoader } from "three-stdlib";

import {
  ACCENT_GEM_SHAPES,
  ACCENT_SHAPE_BY_ANCHOR_PREFIX,
  FALLBACK_RING_SCALE,
  GEM_SCALE,
  METAL_MATERIALS,
  TARGET_RING_SIZE,
} from "@/modules/creative-studio/constants";
import { getModelPath } from "@/modules/creative-studio/utils";
import { PerformanceTier, useMobileDetection } from "@/shared/hooks/useMobileDetection";

import { HeadRenderer } from "./three-d-ring/HeadRenderer";
import { RingMesh } from "./three-d-ring/RingMesh";
import { ShankRenderer } from "./three-d-ring/ShankRenderer";
import {
  findFirstMeshGeometry,
  getAnchorTransform,
  getTransformedBoundingBox,
  makeTransformMatrix,
} from "./three-d-ring/anchor-utils";
import { GLTFResult } from "./three-d-ring/types";
import { useRingCapture } from "./three-d-ring/use-ring-capture";

const ACCENT_MODEL_PATHS = ACCENT_GEM_SHAPES.map((shape) => getModelPath("gemstone", shape));

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

  const environment = "/texture/studio-environment.hdr";

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
  }, [gemstoneData, headData, shankData, onImageGenerationStart, currentConfig, prevConfig]);

  return (
    <Canvas
      shadows={performanceTier === "high"}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      frameloop={isMobile ? "demand" : "always"}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 25, -40], fov: 33 }}
      gl={{ toneMappingExposure: 1.5, antialias: true }}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <Environment files={environment} />
      </Suspense>

      <directionalLight
        position={[30, 50, 30]}
        intensity={isMobile ? 1.2 : 1.6}
        castShadow={performanceTier === "high"}
        shadow-mapSize={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-30, 15, -25]} intensity={isMobile ? 0.3 : 0.5} />

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
        enablePan={isMobile ? false : true}
        enableRotate={true}
        minDistance={isMobile ? 45 : 40}
        maxDistance={isMobile ? 50 : 60}
        zoomSpeed={isMobile ? 0.5 : 0.8}
        rotateSpeed={isMobile ? 0.4 : 0.7}
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

  const metalMaterial = useMemo(() => {
    const base =
      METAL_MATERIALS[metalType as keyof typeof METAL_MATERIALS] || METAL_MATERIALS["white-gold"];
    if (!isMobile) return new MeshPhysicalMaterial(base);
    return new MeshPhysicalMaterial({
      ...base,
      roughness: base.roughness * 0.3,
      envMapIntensity: base.envMapIntensity * 1.4,
    });
  }, [metalType, isMobile]);

  const gemstoneGeometry = useMemo(() => findFirstMeshGeometry(gemstoneData.nodes), [gemstoneData]);

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
  const gemstoneScale = gemstoneAttachment.scale.map((s) => s * GEM_SCALE) as [
    number,
    number,
    number,
  ];

  // Head/shank combinations vary a lot in size and proportion, so the ring
  // is auto-fit and recentered per-configuration from its actual assembled
  // bounding box, rather than by one fixed scale tuned to a single
  // combination (which would over- or under-fill the frame for others).
  const { centerOffset, autoScale } = useMemo(() => {
    const box = new Box3();

    const shankBox = getTransformedBoundingBox(
      (shankData.nodes.Body as Mesh)?.geometry,
      makeTransformMatrix([0, 0, 0], [0, 0, 0, 1], [1, 1, 1]),
    );
    if (shankBox) box.union(shankBox);

    const headMatrix = makeTransformMatrix(
      headAttachment.position,
      headAttachment.quaternion,
      headAttachment.scale,
    );
    const headBox = getTransformedBoundingBox((headData.nodes.Body as Mesh)?.geometry, headMatrix);
    if (headBox) box.union(headBox);

    const gemstoneMatrix = headMatrix
      .clone()
      .multiply(
        makeTransformMatrix(
          gemstoneAttachment.position,
          gemstoneAttachment.quaternion,
          gemstoneScale,
        ),
      );
    const gemstoneBox = getTransformedBoundingBox(gemstoneGeometry, gemstoneMatrix);
    if (gemstoneBox) box.union(gemstoneBox);

    if (box.isEmpty()) {
      return {
        centerOffset: [0, 0, 0] as [number, number, number],
        autoScale: FALLBACK_RING_SCALE,
      };
    }

    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    return {
      centerOffset: [-center.x, -center.y, -center.z] as [number, number, number],
      autoScale: maxDimension > 0 ? TARGET_RING_SIZE / maxDimension : FALLBACK_RING_SCALE,
    };
  }, [shankData, headData, gemstoneGeometry, headAttachment, gemstoneAttachment, gemstoneScale]);

  // On mobile, frameloop="demand" means useFrame only runs when a frame is
  // actually rendered, which otherwise only happens via invalidate() calls,
  // user interaction, or prop changes. The invalidate() inside useFrame below
  // keeps an already-running rotation loop going, but can't *start* one —
  // when imagesReady/isUserInteracting flips to let rotation resume, nothing
  // else requests that first frame, so auto-rotation never kicks in. This
  // effect fires that bootstrap frame.
  useEffect(() => {
    if (isMobile && imagesReady && !isUserInteracting) {
      invalidate();
    }
  }, [isMobile, imagesReady, isUserInteracting]);

  useFrame((_, delta) => {
    if (groupRef.current && imagesReady && !isUserInteracting) {
      groupRef.current.rotation.y += delta * rotationSpeed;
      if (isMobile) {
        invalidate();
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={autoScale}>
      <group position={centerOffset}>
        {/* Shank */}
        <ShankRenderer
          shankData={shankData}
          metalMaterial={metalMaterial}
          texture={texture}
          performanceTier={performanceTier}
          gemScale={GEM_SCALE}
          accentGeometryByShapePrefix={accentGeometryByShapePrefix}
        />

        <group position={headAttachment.position} quaternion={headAttachment.quaternion}>
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
    </group>
  );
};
