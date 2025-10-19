import { HEAD_STYLES } from "../../../../lib/utils/constants/creative-studio";
import { OptionGrid } from "./shared/option-grid";
import { SectionContainer } from "./shared/section-container";

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
  const disabledStyles = HEAD_STYLES
    .filter(style => !availableHeadStyles.includes(style.id))
    .map(style => style.id);

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
