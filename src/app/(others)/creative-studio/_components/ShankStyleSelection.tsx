import { SHANK_STYLES } from "@/modules/creative-studio/constants";

import { OptionGrid } from "./OptionGrid";
import { SectionContainer } from "./SectionContainer";

interface ShankStyleSelectionProps {
  activeTab: string;
  selectedShankStyle: string;
  setSelectedShankStyle: (style: string) => void;
}

/**
 * Shank style selector.
 *
 * @description Displays available shank (band) styles in a grid. Gated by
 * the active mobile tab.
 * @param activeTab - Current active tab to determine visibility.
 * @param selectedShankStyle - Currently selected shank style ID.
 * @param setSelectedShankStyle - Callback when shank style changes.
 * @returns The shank style grid UI.
 */
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
