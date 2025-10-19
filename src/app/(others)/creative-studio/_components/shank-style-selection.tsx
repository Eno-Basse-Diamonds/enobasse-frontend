import { OptionGrid } from "./shared/option-grid";
import { SectionContainer } from "./shared/section-container";
import { SHANK_STYLES } from "../../../../lib/utils/constants/creative-studio";

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
    <SectionContainer activeTab={activeTab} tabType="shank" title="Shank">
      <div>
        <p className="text-sm text-gray-600 mb-4">Select Style</p>
        <OptionGrid
          options={SHANK_STYLES}
          selectedId={selectedShankStyle}
          onSelect={setSelectedShankStyle}
          columns={5}
          imageSize={40}
        />
      </div>
    </SectionContainer>
  );
}
