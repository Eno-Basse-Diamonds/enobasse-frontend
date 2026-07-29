import { memo } from "react";

import { MeshRefractionMaterial } from "@react-three/drei";

import type { PerformanceTier } from "@/shared/hooks/useMobileDetection";

interface RingMeshProps {
  geometry: any;
  material?: any;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  isGemstone?: boolean;
  isHaloGemstone?: boolean;
  texture?: any;
  performanceTier?: PerformanceTier;
}

function getRefractionBounces(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 4;
  }
}

function getAberrationStrength(tier: PerformanceTier): number {
  switch (tier) {
    case "high":
      return 0.008;
    case "medium":
      return 0.005;
    case "low":
      return 0;
    default:
      return 0.008;
  }
}

function isIOSDevice(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1))
  );
}

function addDiamondFacetContrast(shader: { fragmentShader: string }) {
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <tonemapping_fragment>",
    `
      #include <tonemapping_fragment>

      // Jewelry photography relies on dark reflection cards and camera body occlusion
      // to create the distinctive dark triangular facet reflections ("hearts & arrows").
      // Calculate luminance and apply a non-linear contrast response to preserve peak highlights
      // while darkening internal facet refractions.
      vec3 gemColor = gl_FragColor.rgb;
      float gemLum = dot(gemColor, vec3(0.2126, 0.7152, 0.0722));

      // High-contrast S-curve to separate brilliant highlights from dark facet reflections
      float contrastedLum = smoothstep(0.25, 0.92, gemLum);
      float darkFacetFactor = pow(gemLum, 1.6);

      vec3 darkReflection = gemColor * 0.12;
      vec3 brightFacet = gemColor * (contrastedLum / max(gemLum, 0.001));

      gl_FragColor.rgb = mix(darkReflection, brightFacet, clamp(darkFacetFactor * 1.3, 0.0, 1.0));
    `,
  );
}

/**
 * 3D ring mesh component.
 *
 * @description Renders either a metal mesh with a MeshPhysicalMaterial or a
 * gemstone mesh with MeshRefractionMaterial (diamond refractive properties).
 * Applies a diamond facet contrast shader for gemstones and adapts quality
 * (bounces, aberration) to the performance tier. IOS devices always render
 * gemstones at high quality regardless of tier.
 * @param geometry - Three.js BufferGeometry for the mesh.
 * @param material - MeshPhysicalMaterial for metal rendering (ignored when
 * isGemstone is true).
 * @param position - World position offset (default [0,0,0]).
 * @param rotation - Euler rotation (default [0,0,0]).
 * @param scale - Uniform or per-axis scale (default 1).
 * @param castShadow - Whether the mesh casts shadows (default true).
 * @param receiveShadow - Whether the mesh receives shadows (default true).
 * @param isGemstone - When true, uses MeshRefractionMaterial instead of the
 * provided material.
 * @param isHaloGemstone - Reserved for halo gemstone rendering.
 * @param texture - RGBELoader environment texture for refraction.
 * @param performanceTier - Device performance tier (high/medium/low).
 * @returns A Three.js mesh element.
 */
function RingMeshComponent({
  geometry,
  material,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  isGemstone = false,
  isHaloGemstone = false,
  texture,
  performanceTier = "high",
}: RingMeshProps) {
  if (isGemstone) {
    const gemstoneQualityTier: PerformanceTier = isIOSDevice() ? "high" : performanceTier;

    return (
      <mesh
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      >
        <MeshRefractionMaterial
          envMap={texture}
          bounces={getRefractionBounces(gemstoneQualityTier)}
          aberrationStrength={getAberrationStrength(gemstoneQualityTier)}
          ior={2.417}
          fresnel={0.25}
          color="#ffffff"
          fastChroma={gemstoneQualityTier === "medium"}
          onBeforeCompile={addDiamondFacetContrast}
          customProgramCacheKey={() => "diamond-facet-contrast-v3"}
          toneMapped
        />
      </mesh>
    );
  }

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  );
}

// Memoize to prevent unnecessary re-renders
export const RingMesh = memo(RingMeshComponent);
