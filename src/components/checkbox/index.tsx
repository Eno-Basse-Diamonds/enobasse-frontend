"use client";

import React, { useState } from "react";
import { Metal, Gemstone } from "@/lib/types/products";
import * as motion from "motion/react-client";

interface MetalOptionsProps {
  metalOptions: Metal[];
  selectedMetal?: Metal;
  onSelectMetal?: (metal: Metal) => void;
}

type MetalType = "White Gold" | "Yellow Gold" | "Rose Gold" | "Platinum";

export const MetalTypeSelector: React.FC<MetalOptionsProps> = ({
  metalOptions,
  selectedMetal,
  onSelectMetal,
}) => {
  const [hoveredMetal, setHoveredMetal] = useState<Metal | null>(null);

  const metalColors: Record<MetalType, { border: string; bg: string }> = {
    "White Gold": { border: "border-[#D8D8D8]", bg: "bg-[#D8D8D8]/30" },
    "Yellow Gold": { border: "border-[#EDC789]", bg: "bg-[#EDC789]/30" },
    "Rose Gold": { border: "border-[#E1A79F]", bg: "bg-[#E1A79F]/30" },
    Platinum: { border: "border-[#757575]", bg: "bg-[#757575]/30" },
  };

  const displayedMetal = hoveredMetal || selectedMetal;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <motion.h3
          className="text-sm font-light text-[#502B3A] mb-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Metal Type:{" "}
          <motion.span
            className="font-medium"
            key={`${displayedMetal?.purity}-${displayedMetal?.type}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {displayedMetal?.purity} {displayedMetal?.type}
          </motion.span>
        </motion.h3>
        <div className="flex flex-wrap gap-3">
          {metalOptions.map((metal) => {
            const colors = metalColors[metal.type as MetalType] || {
              border: "border-gray-300",
              bg: "bg-gray-100/30",
            };
            const isActive = selectedMetal?.type === metal.type;

            return (
              <motion.div
                key={`${metal.purity} ${metal.type}`}
                className={`relative rounded-full p-[2px] ${
                  isActive
                    ? `${colors.border} border-2`
                    : "border-transparent border-2"
                }`}
                onMouseEnter={() => setHoveredMetal(metal)}
                onMouseLeave={() => setHoveredMetal(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className={`size-8 flex items-center justify-center rounded-full text-xs text-[#502B3A] ${
                    isActive
                      ? `${colors.bg}`
                      : `bg-white border-2 ${colors.border}`
                  }`}
                  onClick={() => onSelectMetal?.(metal)}
                  initial={false}
                  animate={{
                    scale: isActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {metal.purity}
                </motion.button>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border-[0.5px] rounded-full"
                    style={{
                      borderColor: colors?.border
                        ? colors.border.includes("border-[")
                          ? colors.border
                              .split("border-[")[1]
                              ?.replace("]", "") || "#000"
                          : colors.border
                        : "#000",
                    }}
                    layoutId="metalSelection"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface GemstoneOptionsProps {
  gemstoneOptions: Gemstone[];
  selectedGemstone?: Gemstone;
  onSelectGemstone?: (gemstone: Gemstone) => void;
}

export const GemstoneSelector: React.FC<GemstoneOptionsProps> = ({
  gemstoneOptions,
  selectedGemstone: externalSelectedGemstone,
  onSelectGemstone,
}) => {
  const [internalSelectedGemstone, setInternalSelectedGemstone] = useState(
    gemstoneOptions[0]
  );
  const [hoveredGemstone, setHoveredGemstone] = useState<Gemstone | null>(null);

  const selectedGemstone = externalSelectedGemstone || internalSelectedGemstone;

  const gemstoneColors: Record<string, { border: string; bg: string }> = {
    Diamond: { border: "border-[#D1CFCD]", bg: "bg-[#D1CFCD]/30" },
    Sapphire: { border: "border-[#439AE6]", bg: "bg-[#439AE6]/30" },
    Ruby: { border: "border-[#910A34]", bg: "bg-[#910A34]/30" },
    Emerald: { border: "border-[#308C61]", bg: "bg-[#308C61]/30" },
  };

  const displayedGemstone = hoveredGemstone || selectedGemstone;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <motion.h3
          className="text-sm font-light text-[#502B3A] mb-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Gemstone:{" "}
          <motion.span
            className="font-medium"
            key={displayedGemstone.type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {displayedGemstone.weightCarat}ct {displayedGemstone.type}
          </motion.span>
        </motion.h3>
        <div className="flex flex-wrap gap-3">
          {gemstoneOptions.map((gemstone) => {
            const colors = gemstoneColors[gemstone.type];
            const isActive = selectedGemstone === gemstone;

            return (
              <motion.div
                key={`${gemstone.type} ${gemstone.weightCarat}`}
                className={`relative rounded-full p-[2px] ${
                  isActive
                    ? `${colors.border} border-2`
                    : "border-transparent border-2"
                }`}
                onMouseEnter={() => setHoveredGemstone(gemstone)}
                onMouseLeave={() => setHoveredGemstone(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className={`size-8 flex items-center justify-center rounded-full text-xs text-[#502B3A] ${
                    isActive
                      ? `${colors.bg}`
                      : `bg-white border-2 ${colors.border}`
                  }`}
                  onClick={() =>
                    onSelectGemstone
                      ? onSelectGemstone(gemstone)
                      : setInternalSelectedGemstone(gemstone)
                  }
                  initial={false}
                  animate={{
                    scale: isActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {gemstone.weightCarat}
                </motion.button>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border-[0.5px] rounded-full"
                    style={{
                      borderColor: colors.border
                        .split("border-[")[1]
                        .replace("]", ""),
                    }}
                    layoutId="gemstoneSelection"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
