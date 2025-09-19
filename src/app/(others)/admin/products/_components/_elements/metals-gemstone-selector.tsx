"use client";

import { useState } from "react";
import Image from "next/image";
import { gemstones } from "@/lib/utils/constants/gemstones";
import { metalOptions } from "@/lib/utils/constants/metal-options";

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
  const [metalDetails, setMetalDetails] = useState<Record<string, { purity: string; weight: string }>>({});
  const [gemstoneDetails, setGemstoneDetails] = useState<Record<string, { weight: string }>>({});

  const handleMetalSelect = (metalName: string) => {
    const isSelected = selectedMetals.some(m => m.type === metalName);

    if (isSelected) {
      onMetalsChange(selectedMetals.filter(m => m.type !== metalName));

      setMetalDetails(prev => {
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
    const isSelected = selectedGemstones.some(g => g.type === gemstoneName);

    if (isSelected) {
      onGemstonesChange(selectedGemstones.filter(g => g.type !== gemstoneName));

      setGemstoneDetails(prev => {
        const newDetails = { ...prev };
        delete newDetails[gemstoneName];
        return newDetails;
      });
    } else {
      const newGemstone: Gemstone = { type: gemstoneName };
      onGemstonesChange([...selectedGemstones, newGemstone]);
    }
  };

  const updateMetalDetail = (metalName: string, field: 'purity' | 'weight', value: string) => {
    setMetalDetails(prev => ({
      ...prev,
      [metalName]: {
        ...prev[metalName],
        [field]: value
      }
    }));

    const updatedMetals = selectedMetals.map(metal =>
      metal.type === metalName
        ? {
            ...metal,
            [field === 'purity' ? 'purity' : 'weightGrams']: value
          }
        : metal
    );
    onMetalsChange(updatedMetals);
  };

  const updateGemstoneDetail = (gemstoneName: string, weight: string) => {
    setGemstoneDetails(prev => ({
      ...prev,
      [gemstoneName]: { weight }
    }));

    const updatedGemstones = selectedGemstones.map(gemstone =>
      gemstone.type === gemstoneName
        ? { ...gemstone, weightCarat: weight }
        : gemstone
    );
    onGemstonesChange(updatedGemstones);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-primary-500 mb-4">Metals</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metalOptions.map((metal) => {
            const isSelected = selectedMetals.some(m => m.type === metal.name);
            const details = metalDetails[metal.name] || { purity: '', weight: '' };

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
                      <input
                        type="text"
                        value={details.purity}
                        onChange={(e) => updateMetalDetail(metal.name, 'purity', e.target.value)}
                        placeholder="18K"
                        className="w-full p-2 text-xs border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Weight (grams)
                      </label>
                      <input
                        type="number"
                        value={details.weight}
                        onChange={(e) => updateMetalDetail(metal.name, 'weight', e.target.value)}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gemstones.map((gemstone) => {
            const isSelected = selectedGemstones.some(g => g.type === gemstone.name);
            const details = gemstoneDetails[gemstone.name] || { weight: '' };

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
                    <label className="block text-xs text-gray-600 mb-1">
                      Weight (carats)
                    </label>
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
                  • {metal.type} {metal.purity && `(${metal.purity})`} {metal.weightGrams && `- ${metal.weightGrams}g`}
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
