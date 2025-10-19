import { SectionContainer } from "./shared/section-container";
import { ringSizes } from "../../../../lib/utils/constants/ring-sizes";

interface RingSizeSelectionProps {
  activeTab: string;
  selectedRingSize: number;
  setSelectedRingSize: (size: number) => void;
}

export function RingSizeSelection({
  activeTab,
  selectedRingSize,
  setSelectedRingSize,
}: RingSizeSelectionProps) {
  return (
    <SectionContainer activeTab={activeTab} tabType="metal" title="Ring Size">
      <div className="space-y-3">
        <p className="text-sm text-gray-600 mb-2">Select Ring Size</p>
        <div className="grid grid-cols-5 gap-2">
          {ringSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedRingSize(size)}
              className={`px-3 py-2 rounded-sm text-sm border ${
                selectedRingSize === size
                  ? 'border-gray-300 bg-gray-50'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
