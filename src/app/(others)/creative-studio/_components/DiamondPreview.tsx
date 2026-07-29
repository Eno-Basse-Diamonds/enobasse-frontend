import { GEMSTONE_SHAPES, PREVIEW_SIZES } from "@/modules/creative-studio/constants";

import { OptionGrid } from "./OptionGrid";
import { SectionContainer } from "./SectionContainer";

interface DiamondPreviewProps {
  activeTab: string;
  selectedPreviewShape: string;
  setSelectedPreviewShape: (shape: string) => void;
  selectedPreviewSize: string;
  setSelectedPreviewSize: (size: string) => void;
  availableGemstoneShapes: string[];
}

/**
 * Diamond shape and size preview selector.
 *
 * @description Allows the user to choose a gemstone shape from available
 * options and select a preview carat size. Gated by the active mobile tab.
 * @param activeTab - Current active tab to determine visibility.
 * @param selectedPreviewShape - Currently selected gemstone shape ID.
 * @param setSelectedPreviewShape - Callback when shape changes.
 * @param selectedPreviewSize - Currently selected carat size label.
 * @param setSelectedPreviewSize - Callback when size changes.
 * @param availableGemstoneShapes - Array of shape IDs compatible with the
 * current head style.
 * @returns The diamond shape and size section UI.
 */
export function DiamondPreview({
  activeTab,
  selectedPreviewShape,
  setSelectedPreviewShape,
  selectedPreviewSize,
  setSelectedPreviewSize,
  availableGemstoneShapes,
}: DiamondPreviewProps) {
  const disabledShapes: string[] = [];

  return (
    <SectionContainer activeTab={activeTab} tabType="diamond" title="Diamond">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">Preview Shape</p>
          <OptionGrid
            options={GEMSTONE_SHAPES}
            selectedId={selectedPreviewShape}
            onSelect={setSelectedPreviewShape}
            disabledIds={disabledShapes}
            columns={5}
            imageSize={40}
          />
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-3">Size</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {PREVIEW_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedPreviewSize(size)}
                className={`px-3 py-2 rounded-sm text-sm ${
                  selectedPreviewSize === size
                    ? "border border-gray-300 bg-gray-50"
                    : "border border-transparent hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
