"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Canvas,
  ObjectMap,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { RGBELoader } from "three-stdlib";
import {
  GEMSTONE_3D_PROPERTIES,
  HEAD_3D_PROPERTIES,
  SHANK_3D_PROPERTIES,
  METAL_MATERIALS,
} from "../../../../lib/utils/constants/creative-studio";
import { getModelPath, getShankProperties } from "@/lib/utils/creative-studio";
import { RingMesh } from "./three-d-ring/ring-mesh";
import { HaloMesh, HiddenHaloMesh } from "./three-d-ring/halo-mesh";
import { ThreeStoneMesh } from "./three-d-ring/three-stone-mesh";
import { PaveMesh } from "./three-d-ring/pave-mesh";
import {
  useCreativeStudioImageCache,
  createConfigKey,
  createGeneratedImage,
} from "@/lib/store/creative-studio-images";

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

  const currentConfig = `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

  const environment = "/texture/metal3.hdr";

  const gemstonePath = getModelPath("gemstone", gemstoneShape);
  const gemstoneData = useGLTF(gemstonePath);

  const headPath = getModelPath("head", headStyle, gemstoneShape);
  const headData = useGLTF(headPath);

  const shankPath = getModelPath("shank", shankStyle);
  const shankData = useGLTF(shankPath);

  const texture = useLoader(RGBELoader, environment);

  let threeStoneSideData: ObjectMap | undefined = undefined;

  if (headStyle === "three-stone") {
    const sideHeadPath = `/3d-models/Head/${gemstoneShape.toUpperCase()}/${headStyle.toUpperCase()}.SIDE.glb`;
    threeStoneSideData = useGLTF(sideHeadPath);
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
      shadows
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
  headData: any;
  gemstoneData: any;
  shankData: any;
  rotationSpeed?: number;
  threeStoneSideData?: any;
  texture: any;
  sceneReady: boolean;
  onImagesGenerated?: (images: { src: string; alt: string }[]) => void;
  imagesReady?: boolean;
  controlsRef: React.RefObject<any>;
  isUserInteracting: boolean;
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
}) => {
  const groupRef = useRef<Group>(null);
  const { camera, gl, scene } = useThree();
  const [imagesGenerated, setImagesGenerated] = useState(false);
  const [prevConfig, setPrevConfig] = useState("");

  // Image cache store - simplified interface
  const { getCachedImages, setCachedImages } = useCreativeStudioImageCache();

  // Create a unique key for this product configuration
  const productConfig = `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

  // Reset imagesGenerated when configuration changes
  useEffect(() => {
    if (productConfig !== prevConfig) {
      setImagesGenerated(false);
      setPrevConfig(productConfig);
    }
  }, [productConfig, prevConfig]);

  // Generate images when scene is ready and configuration is new
  useEffect(() => {
    if (sceneReady && !imagesGenerated && onImagesGenerated) {
      const configKey = createConfigKey(
        gemstoneShape,
        headStyle,
        shankStyle,
        metalType
      );

      // Check if images are already cached
      const cachedImages = getCachedImages(configKey);
      if (cachedImages) {
        // Use cached images
        onImagesGenerated(cachedImages);
        setImagesGenerated(true);
        return;
      }

      // Small delay to ensure everything is rendered
      const timeoutId = setTimeout(() => {
        generateImages();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    sceneReady,
    imagesGenerated,
    onImagesGenerated,
    productConfig,
    gemstoneShape,
    headStyle,
    shankStyle,
    metalType,
    getCachedImages,
  ]);

  const generateImages = async () => {
    if (imagesGenerated) return;

    const configKey = createConfigKey(
      gemstoneShape,
      headStyle,
      shankStyle,
      metalType
    );

    const images: { src: string; alt: string }[] = [];

    // Store original camera position and rotation
    const originalPosition = camera.position.clone();
    const originalRotation = camera.rotation.clone();
    const originalQuaternion = camera.quaternion.clone();

    // Temporarily disable orbit controls to prevent user interference
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    try {
      // Side view
      camera.position.set(20, 25, 30);
      camera.lookAt(0, 0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const sideImage = captureImage("side");
      images.push(sideImage);

      // Top view
      camera.position.set(0, 40, 0);
      camera.lookAt(0, 0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const topImage = captureImage("top");
      images.push(topImage);

      // Front view
      camera.position.set(0, 25, -40);
      camera.lookAt(0, 0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const frontImage = captureImage("front");
      images.push(frontImage);

      // Convert to GeneratedImage format and cache
      const generatedImages = images.map((img) =>
        createGeneratedImage(img.src, img.alt)
      );
      setCachedImages(configKey, generatedImages);

      // Call the callback with generated images
      if (onImagesGenerated) {
        onImagesGenerated(images);
      }

      setImagesGenerated(true);
    } finally {
      // Always restore original camera position and controls
      camera.position.copy(originalPosition);
      camera.rotation.copy(originalRotation);
      camera.quaternion.copy(originalQuaternion);

      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    }
  };

  const captureImage = (
    angle: "front" | "top" | "side"
  ): { src: string; alt: string } => {
    // Render the scene with current camera position
    gl.render(scene, camera);

    // Capture as data URL
    const dataURL = gl.domElement.toDataURL("image/png");

    return {
      src: dataURL,
      alt: `${angle} view of ${gemstoneShape} ring with ${headStyle} head, ${shankStyle} shank in ${metalType}`,
    };
  };

  const metalMaterial = new MeshStandardMaterial(
    METAL_MATERIALS[metalType as keyof typeof METAL_MATERIALS] ||
      METAL_MATERIALS["white-gold"]
  );

  const gemstone = gemstoneShape.toUpperCase();
  const gemstoneProperties = GEMSTONE_3D_PROPERTIES[gemstone];

  const shank = shankStyle.toUpperCase();
  const shankProperties = getShankProperties(shankStyle, headStyle);

  const head = headStyle.toUpperCase();
  const headProperties = HEAD_3D_PROPERTIES[head]?.[gemstone];

  useFrame((_, delta) => {
    if (groupRef.current && imagesReady && !isUserInteracting) {
      groupRef.current.rotation.y += delta * rotationSpeed;
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
      />

      {/* Head */}
      {head !== "HIDDEN-HALO" && (
        <RingMesh
          geometry={(headData.nodes[head] as Mesh)?.geometry}
          material={metalMaterial}
          position={headProperties?.position as [number, number, number]}
          rotation={headProperties?.rotation as [number, number, number]}
          scale={headProperties?.scale}
        />
      )}

      {head === "HIDDEN-HALO" && (
        <>
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
          />
        </>
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
                bounces={4}
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
                bounces={4}
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

      {/* Shank */}

      <RingMesh
        geometry={(shankData.nodes[shank] as Mesh)?.geometry}
        material={metalMaterial}
        position={shankProperties.position || [0, 0, 0]}
        rotation={shankProperties.rotation || [0, 0, 0]}
        scale={shankProperties.scale || 1}
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
          />
          <RingMesh
            geometry={
              (shankData.nodes["FRENCH-PAVESIDE-SETTINGS"] as Mesh)?.geometry
            }
            material={metalMaterial}
            position={[0, -1.614, 0]}
            scale={[1.005, 1.005, 0.996]}
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
        />
      )}
    </group>
  );
};
