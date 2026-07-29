import { RING_SIZES } from "@/modules/services/constants";

import { SectionContainer } from "./SectionContainer";

interface RingSizeSelectionProps {
  activeTab: string;
  selectedRingSize: number;
  setSelectedRingSize: (size: number) => void;
}

/**
 * Ring size selector.
 *
 * @description Displays a grid of available ring size buttons. Gated by the
 * active mobile tab. Sizes are sourced from shared services constants.
 * @param activeTab - Current active tab to determine visibility.
 * @param selectedRingSize - Currently selected ring size number.
 * @param setSelectedRingSize - Callback when ring size changes.
 * @returns The ring size grid UI.
 */
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
          {RING_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedRingSize(size)}
              className={`px-3 py-2 rounded-sm text-sm border ${
                selectedRingSize === size
                  ? "border-gray-300 bg-gray-50"
                  : "border-transparent hover:border-gray-300"
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
