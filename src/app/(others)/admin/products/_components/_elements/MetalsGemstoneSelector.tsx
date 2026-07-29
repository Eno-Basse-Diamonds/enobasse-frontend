"use client";

import Image from "next/image";
import { useState } from "react";

import { GEMSTONES } from "@/shared/constants/gemstones";
import { METAL_OPTIONS } from "@/shared/constants/metals";

interface Metal {
  type: string;
  purity?: string;
  weightGrams?: string;
}

interface Gemstone {
  type: string;
  weightCarat?: string;
}

interface MetalsGemstonesSelectorProps {
  selectedMetals: Metal[];
  selectedGemstones: Gemstone[];
  onMetalsChange: (metals: Metal[]) => void;
  onGemstonesChange: (gemstones: Gemstone[]) => void;
}

export function MetalsGemstonesSelector({
  selectedMetals,
  selectedGemstones,
  onMetalsChange,
  onGemstonesChange,
}: MetalsGemstonesSelectorProps) {
  const [metalDetails, setMetalDetails] = useState<
    Record<string, { purity: string; weight: string }>
  >({});
  const [gemstoneDetails, setGemstoneDetails] = useState<Record<string, { weight: string }>>({});

  const handleMetalSelect = (metalName: string) => {
    const isSelected = selectedMetals.some((m) => m.type === metalName);

    if (isSelected) {
      onMetalsChange(selectedMetals.filter((m) => m.type !== metalName));

      setMetalDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[metalName];
        return newDetails;
      });
    } else {
      const newMetal: Metal = { type: metalName };
      onMetalsChange([...selectedMetals, newMetal]);
    }
  };

  const handleGemstoneSelect = (gemstoneName: string) => {
    const isSelected = selectedGemstones.some((g) => g.type === gemstoneName);

    if (isSelected) {
      onGemstonesChange(selectedGemstones.filter((g) => g.type !== gemstoneName));

      setGemstoneDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[gemstoneName];
        return newDetails;
      });
    } else {
      const newGemstone: Gemstone = { type: gemstoneName };
      onGemstonesChange([...selectedGemstones, newGemstone]);
    }
  };

  const updateMetalDetail = (metalName: string, field: "purity" | "weight", value: string) => {
    const safeValue = value ?? "";
    setMetalDetails((prev) => ({
      ...prev,
      [metalName]: {
        purity: field === "purity" ? safeValue : (prev[metalName]?.purity ?? ""),
        weight: field === "weight" ? safeValue : (prev[metalName]?.weight ?? ""),
      },
    }));

    const updatedMetals = selectedMetals.map((metal) =>
      metal.type === metalName
        ? {
            ...metal,
            [field === "purity" ? "purity" : "weightGrams"]: safeValue,
          }
        : metal,
    );
    onMetalsChange(updatedMetals);
  };

  const updateGemstoneDetail = (gemstoneName: string, weight: string) => {
    const safeWeight = weight ?? "";
    setGemstoneDetails((prev) => ({
      ...prev,
      [gemstoneName]: { weight: safeWeight },
    }));

    const updatedGemstones = selectedGemstones.map((gemstone) =>
      gemstone.type === gemstoneName ? { ...gemstone, weightCarat: safeWeight } : gemstone,
    );
    onGemstonesChange(updatedGemstones);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-primary-500 mb-4">Metals</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {METAL_OPTIONS.map((metal) => {
            const isSelected = selectedMetals.some((m) => m.type === metal.name);
            const selectedMetal = selectedMetals.find((m) => m.type === metal.name);
            const details = {
              purity: selectedMetal?.purity ?? metalDetails[metal.name]?.purity ?? "",
              weight: selectedMetal?.weightGrams ?? metalDetails[metal.name]?.weight ?? "",
            };

            return (
              <div key={metal.name} className="border p-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleMetalSelect(metal.name)}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-300"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 relative">
                      <Image
                        src={metal.image.src}
                        alt={metal.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{metal.name}</span>
                  </div>
                </label>

                {isSelected && (
                  <div className="mt-3 space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Purity (e.g., 18K, 24K)
                      </label>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {["14K", "18K", "22K", "24K", "PT950"].map((purity) => (
                          <button
                            key={purity}
                            type="button"
                            onClick={() => updateMetalDetail(metal.name, "purity", purity)}
                            className={`px-1.5 py-0.5 text-[10px] font-medium border rounded transition-colors ${
                              details.purity === purity
                                ? "bg-primary-500 text-white border-primary-500"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {purity}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={details.purity}
                        onChange={(e) => updateMetalDetail(metal.name, "purity", e.target.value)}
                        placeholder="18K"
                        className="w-full p-2 text-xs border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Weight (grams)</label>
                      <input
                        type="number"
                        value={details.weight}
                        onChange={(e) => updateMetalDetail(metal.name, "weight", e.target.value)}
                        placeholder="0.0"
                        step="0.1"
                        className="w-full p-2 text-xs border border-gray-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-primary-500 mb-4">Gemstones</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GEMSTONES.map((gemstone) => {
            const isSelected = selectedGemstones.some((g) => g.type === gemstone.name);
            const selectedGemstone = selectedGemstones.find((g) => g.type === gemstone.name);
            const details = {
              weight: selectedGemstone?.weightCarat ?? gemstoneDetails[gemstone.name]?.weight ?? "",
            };

            return (
              <div key={gemstone.name} className="border p-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleGemstoneSelect(gemstone.name)}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-300"
                  />
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full border ${gemstone.color} bg-current opacity-60`}
                    />
                    <span className="text-sm font-medium">{gemstone.name}</span>
                  </div>
                </label>

                {isSelected && (
                  <div className="mt-3">
                    <label className="block text-xs text-gray-600 mb-1">Weight (carats)</label>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {["0.5", "1.0", "1.5", "2.0", "3.0"].map((carat) => (
                        <button
                          key={carat}
                          type="button"
                          onClick={() => updateGemstoneDetail(gemstone.name, carat)}
                          className={`px-1.5 py-0.5 text-[10px] font-medium border rounded transition-colors ${
                            details.weight === carat
                              ? "bg-primary-500 text-white border-primary-500"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {carat}ct
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={details.weight}
                      onChange={(e) => updateGemstoneDetail(gemstone.name, e.target.value)}
                      placeholder="0.0"
                      step="0.01"
                      className="w-full p-2 text-xs border border-gray-300"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {(selectedMetals.length > 0 || selectedGemstones.length > 0) && (
        <div className="bg-gray-50 p-4">
          <h5 className="font-semibold text-primary-500 mb-2">Selected Materials</h5>

          {selectedMetals.length > 0 && (
            <div className="mb-3">
              <h6 className="text-sm font-medium text-gray-700 mb-1">Metals:</h6>
              {selectedMetals.map((metal, index) => (
                <div key={index} className="text-sm text-gray-600">
                  • {metal.type} {metal.purity && `(${metal.purity})`}{" "}
                  {metal.weightGrams && `- ${metal.weightGrams}g`}
                </div>
              ))}
            </div>
          )}

          {selectedGemstones.length > 0 && (
            <div>
              <h6 className="text-sm font-medium text-gray-700 mb-1">Gemstones:</h6>
              {selectedGemstones.map((gemstone, index) => (
                <div key={index} className="text-sm text-gray-600">
                  • {gemstone.type} {gemstone.weightCarat && `- ${gemstone.weightCarat}ct`}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
