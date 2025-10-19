import { METAL_TYPES, KARATS } from "../../../../lib/utils/constants/creative-studio";
import { SectionContainer } from "./shared/section-container";

interface MetalSelectionProps {
  activeTab: string;
  selectedMetalType: string;
  setSelectedMetalType: (type: string) => void;
  selectedKarat: string;
  setSelectedKarat: (karat: string) => void;
}

export function MetalSelection({
  activeTab,
  selectedMetalType,
  setSelectedMetalType,
  selectedKarat,
  setSelectedKarat,
}: MetalSelectionProps) {
  return (
    <SectionContainer activeTab={activeTab} tabType="metal" title="Select Metal">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-3">Metal Type</p>
          <div className="grid grid-cols-4 gap-2">
            {METAL_TYPES.map((metal) => (
              <button
                key={metal.id}
                onClick={() => setSelectedMetalType(metal.id)}
                className={`w-8 h-8 rounded-full border-2 bg-${metal.id} ${
                  selectedMetalType === metal.id
                    ? "border-primary-500"
                    : "border-gray-300"
                }`}
                title={metal.name}
              />
            ))}
          </div>
        </div>

        {selectedMetalType !== "platinum" && (
          <div>
            <p className="text-sm text-gray-600 mb-3">Karat</p>
            <div className="grid grid-cols-2 gap-2">
              {KARATS.map((karat) => (
                <button
                  key={karat.id}
                  onClick={() => setSelectedKarat(karat.id)}
                  className={`px-4 py-2 rounded-sm text-sm ${
                    selectedKarat === karat.id
                      ? "border border-gray-300 bg-gray-50"
                      : "border border-transparent hover:border-gray-300"
                  }`}
                >
                  {karat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
