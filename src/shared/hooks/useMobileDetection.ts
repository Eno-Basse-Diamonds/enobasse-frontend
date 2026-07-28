"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "high" | "medium" | "low";

interface MobileDetectionResult {
  isMobile: boolean;
  isLowPower: boolean;
  performanceTier: PerformanceTier;
}

/**
 * Mobile device detection hook.
 *
 * @description Detects mobile devices and provides an appropriate performance
 * tier based on touch capability, screen size, and hardware concurrency.
 * @returns An object containing `isMobile`, `isLowPower`, and
 * `performanceTier`
 */
export function useMobileDetection(): MobileDetectionResult {
  const [result, setResult] = useState<MobileDetectionResult>({
    isMobile: false,
    isLowPower: false,
    performanceTier: "high",
  });

  useEffect(() => {
    const detectDevice = () => {
      const hasTouch = navigator.maxTouchPoints > 0;

      const isSmallScreen = window.innerWidth < 768;

      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

      const isMobile = hasTouch && (isSmallScreen || mobileUA);

      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const isLowCores = hardwareConcurrency <= 4;
      const isLowPower = isMobile && isLowCores;

      let performanceTier: PerformanceTier = "high";
      if (isLowPower) {
        performanceTier = "low";
      } else if (isMobile) {
        performanceTier = "medium";
      }

      setResult({ isMobile, isLowPower, performanceTier });
    };

    detectDevice();

    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  return result;
}
