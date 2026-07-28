import { useCallback, useEffect, useRef, useState } from "react";

import { useFrame, useThree } from "@react-three/fiber";

import {
  createConfigKey,
  createGeneratedImage,
  useCreativeStudioImageCache,
} from "@/modules/creative-studio/store";

interface UseRingCaptureProps {
  gemstoneShape: string;
  headStyle: string;
  shankStyle: string;
  metalType: string;
  sceneReady: boolean;
  controlsRef: React.RefObject<any>;
  onImagesGenerated?: (images: { src: string; alt: string }[]) => void;
}

export function useRingCapture({
  gemstoneShape,
  headStyle,
  shankStyle,
  metalType,
  sceneReady,
  controlsRef,
  onImagesGenerated,
}: UseRingCaptureProps) {
  const { camera, gl, scene, invalidate } = useThree();
  const [imagesGenerated, setImagesGenerated] = useState(false);
  const [prevConfig, setPrevConfig] = useState("");
  const frameCountRef = useRef(0);
  const isGeneratingRef = useRef(false);

  const { getCachedImages, setCachedImages } = useCreativeStudioImageCache();

  const productConfig = `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

  useEffect(() => {
    if (productConfig !== prevConfig) {
      setImagesGenerated(false);
      setPrevConfig(productConfig);
      frameCountRef.current = 0;
      isGeneratingRef.current = false;
    }
  }, [productConfig, prevConfig]);

  const captureImage = useCallback(
    (cam: any, angle: "front" | "top" | "side"): { src: string; alt: string } => {
      gl.render(scene, cam);
      const dataURL = gl.domElement.toDataURL("image/png");
      return {
        src: dataURL,
        alt: `${angle} view of ${gemstoneShape} ring with ${headStyle} head, ${shankStyle} shank in ${metalType}`,
      };
    },
    [gl, scene, gemstoneShape, headStyle, shankStyle, metalType],
  );

  const generateImages = useCallback(() => {
    if (imagesGenerated || isGeneratingRef.current) return;

    isGeneratingRef.current = true;

    const configKey = createConfigKey(gemstoneShape, headStyle, shankStyle, metalType);

    const images: { src: string; alt: string }[] = [];

    // Save main camera original state
    const originalPosition = camera.position.clone();
    const originalRotation = camera.rotation.clone();
    const originalQuaternion = camera.quaternion.clone();

    // Temporarily disable OrbitControls to prevent conflicts
    const controlsWasEnabled = controlsRef.current?.enabled;
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    try {
      const captureView = (position: [number, number, number], angle: "front" | "top" | "side") => {
        // Move the actual main camera
        camera.position.set(...position);
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld(true);
        return captureImage(camera, angle);
      };

      // Capture the three views synchronously without moving the camera on screen
      images.push(captureView([20, 25, 30], "side"));
      images.push(captureView([0, 40, 0], "top"));
      images.push(captureView([0, 25, -40], "front"));

      const generatedImages = images.map((img) => createGeneratedImage(img.src, img.alt));
      setCachedImages(configKey, generatedImages);

      if (onImagesGenerated) {
        onImagesGenerated(images);
      }

      setImagesGenerated(true);
    } catch (error) {
      console.error("Error generating preview images:", error);
      isGeneratingRef.current = false;
    } finally {
      // Restore the main camera to its original state
      camera.position.copy(originalPosition);
      camera.rotation.copy(originalRotation);
      camera.quaternion.copy(originalQuaternion);
      camera.updateMatrixWorld(true);

      // Re-enable controls if they were enabled
      if (controlsRef.current && controlsWasEnabled !== undefined) {
        controlsRef.current.enabled = controlsWasEnabled;
      }

      // Re-render the original view so the canvas displays correctly
      gl.render(scene, camera);
    }
  }, [
    imagesGenerated,
    gemstoneShape,
    headStyle,
    shankStyle,
    metalType,
    camera,
    gl,
    scene,
    controlsRef,
    captureImage,
    setCachedImages,
    onImagesGenerated,
  ]);

  useFrame(() => {
    if (!sceneReady || imagesGenerated || isGeneratingRef.current || !onImagesGenerated) return;

    const configKey = createConfigKey(gemstoneShape, headStyle, shankStyle, metalType);

    const cachedImages = getCachedImages(configKey);
    if (cachedImages) {
      onImagesGenerated(cachedImages);
      setImagesGenerated(true);
      return;
    }

    frameCountRef.current += 1;
    // Wait for 30 frames (about 0.5s at 60fps) to ensure all textures, PMREM,
    // and shaders are fully compiled/uploaded before rendering screenshots.
    if (frameCountRef.current < 30) {
      invalidate();
    } else {
      generateImages();
    }
  });

  return { imagesGenerated };
}
