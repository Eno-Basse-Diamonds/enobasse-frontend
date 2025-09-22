import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { shankStyles } from "@/lib/utils/constants/creative-studio";

interface ShankStyleSelectionProps {
  activeTab: string;
  selectedShankStyle: string;
  setSelectedShankStyle: (style: string) => void;
}

export function ShankStyleSelection({
  activeTab,
  selectedShankStyle,
  setSelectedShankStyle,
}: ShankStyleSelectionProps) {
  return (
    <div
      className={
        activeTab === "shank" || !activeTab ? "block" : "hidden lg:block"
      }
    >
      <h3 className="font-semibold text-lg text-primary-500 font-primary mb-4">
        Shank
      </h3>
      <p className="text-sm text-gray-600 mb-4">Select Style</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {shankStyles.slice(0, 15).map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedShankStyle(style.id)}
            className={`p-3 rounded-sm border flex flex-col items-center gap-2 text-center ${
              selectedShankStyle === style.id
                ? "border-gray-300 bg-gray-50"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <NextImage
              src={style.image}
              alt={style.name}
              height={40}
              width={40}
            />
            <p className="text-xs">{style.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
