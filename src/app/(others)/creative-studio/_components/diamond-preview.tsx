import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { previewShapes, previewSizes } from "@/lib/utils/constants/creative-studio";

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
  return (
    <div
      className={
        activeTab === "diamond" || !activeTab ? "block" : "hidden lg:block"
      }
    >
      <h3 className="font-semibold text-lg text-primary-500 font-primary mb-4">
        Diamond Preview
      </h3>
      <p className="text-sm text-gray-600 mb-4">Preview Shape</p>

      {/* Shape Selection */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {previewShapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => setSelectedPreviewShape(shape.id)}
            className={`p-3 rounded-sm text-center flex flex-col items-center gap-2 ${
              selectedPreviewShape === shape.id
                ? "border border-gray-300 bg-gray-50"
                : "border border-transparent hover:border-gray-300"
            } ${
              !availableGemstoneShapes.includes(shape.id)
                ? "cursor-not-allowed opacity-50 border-none"
                : ""
            }`}
            disabled={!availableGemstoneShapes.includes(shape.id)}
          >
            <NextImage
              src={shape.image}
              alt={shape.name}
              height={40}
              width={40}
            />
            <p className="text-xs">{shape.name}</p>
          </button>
        ))}
      </div>

      {/* Size Selection */}
      <p className="text-sm text-gray-600 mb-3">Preview Size</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {previewSizes.map((size) => (
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
  );
}
