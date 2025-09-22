import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { headStyles } from "@/lib/utils/constants/creative-studio";

interface HeadStyleSelectionProps {
  activeTab: string;
  selectedHeadStyle: string;
  setSelectedHeadStyle: (style: string) => void;
  availableHeadStyles: string[];
}

export function HeadStyleSelection({
  activeTab,
  selectedHeadStyle,
  setSelectedHeadStyle,
  availableHeadStyles,
}: HeadStyleSelectionProps) {
  return (
    <div
      className={
        activeTab === "head" || !activeTab ? "block" : "hidden lg:block"
      }
    >
      <h3 className="font-semibold text-lg text-primary-500 font-primary mb-4">
        Head
      </h3>
      <p className="text-sm text-gray-600 mb-4">Select Style</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {headStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedHeadStyle(style.id)}
            className={`p-3 rounded-sm text-center flex flex-col items-center ${
              selectedHeadStyle === style.id
                ? "border border-gray-300 bg-gray-50"
                : "border border-transparent hover:border-gray-300"
            }
            ${
              !availableHeadStyles.includes(style.id)
                ? "cursor-not-allowed opacity-50 border-none"
                : ""
            }`}
            disabled={!availableHeadStyles.includes(style.id)}
          >
            <NextImage
              src={style.image}
              alt={style.name}
              height={70}
              width={70}
            />
            <p className="text-xs">{style.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
