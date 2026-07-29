import { HEAD_STYLES } from "@/modules/creative-studio/constants";

import { OptionGrid } from "./OptionGrid";
import { SectionContainer } from "./SectionContainer";

interface HeadStyleSelectionProps {
  activeTab: string;
  selectedHeadStyle: string;
  setSelectedHeadStyle: (style: string) => void;
  availableHeadStyles: string[];
}

/**
 * Head style selector.
 *
 * @description Displays available head (setting) styles in a grid. Options
 * incompatible with the current gemstone shape are shown as disabled.
 * Gated by the active mobile tab.
 * @param activeTab - Current active tab to determine visibility.
 * @param selectedHeadStyle - Currently selected head style ID.
 * @param setSelectedHeadStyle - Callback when head style changes.
 * @param availableHeadStyles - Array of style IDs compatible with the
 * current gemstone shape.
 * @returns The head style grid UI.
 */
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
