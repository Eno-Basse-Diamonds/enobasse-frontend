import Image from "next/image";
import { GEMSTONE_SHAPES, PREVIEW_SIZES } from "../../../../lib/utils/constants/creative-studio";
import { OptionGrid } from "./shared/option-grid";
import { SectionContainer } from "./shared/section-container";

interface DiamondPreviewProps {
  activeTab: string;
  selectedPreviewShape: string;
  setSelectedPreviewShape: (shape: string) => void;
  selectedPreviewSize: string;
  setSelectedPreviewSize: (size: string) => void;
  availableGemstoneShapes: string[];
}

export function DiamondPreview({
  activeTab,
  selectedPreviewShape,
  setSelectedPreviewShape,
  selectedPreviewSize,
  setSelectedPreviewSize,
  availableGemstoneShapes,
}: DiamondPreviewProps) {
  const disabledShapes = GEMSTONE_SHAPES
    .filter(shape => !availableGemstoneShapes.includes(shape.id))
    .map(shape => shape.id);

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
