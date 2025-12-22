import { useState, useEffect, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import {
  useCreativeStudioImageCache,
  createConfigKey,
  createGeneratedImage,
} from "@/lib/store/creative-studio-images";

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
  const { camera, gl, scene } = useThree();
  const [imagesGenerated, setImagesGenerated] = useState(false);
  const [prevConfig, setPrevConfig] = useState("");

  const { getCachedImages, setCachedImages } = useCreativeStudioImageCache();

  const productConfig = `${gemstoneShape}-${headStyle}-${shankStyle}-${metalType}`;

  useEffect(() => {
    if (productConfig !== prevConfig) {
      setImagesGenerated(false);
      setPrevConfig(productConfig);
    }
  }, [productConfig, prevConfig]);

  const captureImage = useCallback(
    (angle: "front" | "top" | "side"): { src: string; alt: string } => {
      gl.render(scene, camera);
      const dataURL = gl.domElement.toDataURL("image/png");
      return {
        src: dataURL,
        alt: `${angle} view of ${gemstoneShape} ring with ${headStyle} head, ${shankStyle} shank in ${metalType}`,
      };
    },
    [gl, scene, camera, gemstoneShape, headStyle, shankStyle, metalType],
  );

  const generateImages = useCallback(async () => {
    if (imagesGenerated) return;

    const configKey = createConfigKey(
      gemstoneShape,
      headStyle,
      shankStyle,
      metalType,
    );

    const images: { src: string; alt: string }[] = [];

    const originalPosition = camera.position.clone();
    const originalRotation = camera.rotation.clone();
    const originalQuaternion = camera.quaternion.clone();

    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    try {
      // Side view
      camera.position.set(20, 25, 30);
      camera.lookAt(0, 0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      images.push(captureImage("side"));

      // Top view
      camera.position.set(0, 40, 0);
      camera.lookAt(0, 0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      images.push(captureImage("top"));

      // Front view
      camera.position.set(0, 25, -40);
      camera.lookAt(0, 0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
      images.push(captureImage("front"));

      const generatedImages = images.map((img) =>
        createGeneratedImage(img.src, img.alt),
      );
      setCachedImages(configKey, generatedImages);

      if (onImagesGenerated) {
        onImagesGenerated(images);
      }

      setImagesGenerated(true);
    } finally {
      camera.position.copy(originalPosition);
      camera.rotation.copy(originalRotation);
      camera.quaternion.copy(originalQuaternion);

      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    }
  }, [
    imagesGenerated,
    gemstoneShape,
    headStyle,
    shankStyle,
    metalType,
    camera,
    controlsRef,
    captureImage,
    setCachedImages,
    onImagesGenerated,
  ]);

  useEffect(() => {
    if (sceneReady && !imagesGenerated && onImagesGenerated) {
      const configKey = createConfigKey(
        gemstoneShape,
        headStyle,
        shankStyle,
        metalType,
      );

      const cachedImages = getCachedImages(configKey);
      if (cachedImages) {
        onImagesGenerated(cachedImages);
        setImagesGenerated(true);
        return;
      }

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
    generateImages,
  ]);

  return { imagesGenerated };
}
