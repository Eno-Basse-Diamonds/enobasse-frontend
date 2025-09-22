import { metalTypes, karats } from "@/lib/utils/constants/creative-studio";

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
    <div
      className={
        activeTab === "metal" || !activeTab ? "block" : "hidden lg:block"
      }
    >
      <h3 className="font-semibold text-lg text-primary-500 font-primary mb-4">
        Select Metal
      </h3>

      {/* Metal Type Selection */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">Metal Type</p>
        <div className="grid grid-cols-4 gap-2">
          {metalTypes.map((metal) => (
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

      {/* Karat Selection (only show for gold types) */}
      {selectedMetalType !== "platinum" && (
        <div>
          <p className="text-sm text-gray-600 mb-3">Karat</p>
          <div className="grid grid-cols-2 gap-2">
            {karats.map((karat) => (
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
  );
}
