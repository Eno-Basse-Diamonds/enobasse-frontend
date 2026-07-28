import { HEAD_STYLES } from "@/modules/creative-studio/constants";

import { OptionGrid } from "./shared/OptionGrid";
import { SectionContainer } from "./shared/SectionContainer";

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
  const disabledStyles = HEAD_STYLES.filter((style) => !availableHeadStyles.includes(style.id)).map(
    (style) => style.id,
  );

  return (
    <SectionContainer activeTab={activeTab} tabType="head" title="Head">
      <div>
        <p className="text-sm text-gray-600 mb-4">Select Style</p>
        <OptionGrid
          options={HEAD_STYLES}
          selectedId={selectedHeadStyle}
          onSelect={setSelectedHeadStyle}
          disabledIds={disabledStyles}
          columns={5}
          imageSize={70}
        />
      </div>
    </SectionContainer>
  );
}
