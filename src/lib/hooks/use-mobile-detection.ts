"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = "high" | "medium" | "low";

interface MobileDetectionResult {
  isMobile: boolean;
  isLowPower: boolean;
  performanceTier: PerformanceTier;
}

/**
 * Hook to detect mobile devices and provide appropriate performance tier.
 * Uses multiple signals: touch capability, screen size, devicePixelRatio,
 * and hardware concurrency to determine optimal graphics settings.
 */
export function useMobileDetection(): MobileDetectionResult {
  const [result, setResult] = useState<MobileDetectionResult>({
    isMobile: false,
    isLowPower: false,
    performanceTier: "high",
  });

  useEffect(() => {
    const detectDevice = () => {
      // Check for touch capability
      const hasTouch = navigator.maxTouchPoints > 0;

      // Check screen size
      const isSmallScreen = window.innerWidth < 768;

      // Check for mobile user agent patterns
      const mobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      // Determine if mobile
      const isMobile = hasTouch && (isSmallScreen || mobileUA);

      // Check for low-power indicators
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const isLowCores = hardwareConcurrency <= 4;
      // High DPR (> 2) is characteristic of premium retina displays on powerful devices,
      // not low-power hardware. We only classify as low power if CPU core count is low.
      const isLowPower = isMobile && isLowCores;

      // Determine performance tier
      let performanceTier: PerformanceTier = "high";
      if (isLowPower) {
        performanceTier = "low";
      } else if (isMobile) {
        performanceTier = "medium";
      }

      setResult({ isMobile, isLowPower, performanceTier });
    };

    detectDevice();

    // Re-check on resize (tablet orientation changes)
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  return result;
}
