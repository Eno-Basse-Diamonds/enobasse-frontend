import { SectionContainer } from "./SectionContainer";

interface DiamondTypeSelectionProps {
  activeTab: string;
  selectedDiamondType: string;
  setSelectedDiamondType: (type: string) => void;
}

const OPTIONS = [
  { id: "lab", name: "Lab" },
  { id: "natural", name: "Natural" },
  { id: "moissanite", name: "Moissanite" },
];

/**
 * Diamond type selection (lab / natural / moissanite).
 *
 * @description Renders a row of buttons to choose between lab-grown,
 * natural, and moissanite diamond types. Gated by the active mobile tab.
 * @param activeTab - Current active tab to determine visibility.
 * @param selectedDiamondType - Currently selected diamond type ID.
 * @param setSelectedDiamondType - Callback when type changes.
 * @returns The diamond type selector UI.
 */
export function DiamondTypeSelection({
  activeTab,
  selectedDiamondType,
  setSelectedDiamondType,
}: DiamondTypeSelectionProps) {
  return (
    <SectionContainer activeTab={activeTab} tabType="diamond" title="Diamond Type">
      <div className="space-y-3">
        <p className="text-sm text-gray-600 mb-2">Choose Diamond Type</p>
        <div className="flex gap-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedDiamondType(opt.id)}
              className={`px-4 py-2 rounded-sm text-sm border ${
                selectedDiamondType === opt.id
                  ? "border-gray-300 bg-gray-50"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
