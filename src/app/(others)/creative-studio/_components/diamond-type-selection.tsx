import { SectionContainer } from "./shared/section-container";

interface DiamondTypeSelectionProps {
  activeTab: string;
  selectedDiamondType: string;
  setSelectedDiamondType: (type: string) => void;
}

const OPTIONS = [
  { id: 'lab', name: 'Lab' },
  { id: 'natural', name: 'Natural' },
  { id: 'moissanite', name: 'Moissanite' },
];

export function DiamondTypeSelection({ activeTab, selectedDiamondType, setSelectedDiamondType }: DiamondTypeSelectionProps) {
  console.log()
  return (
    <SectionContainer activeTab={activeTab} tabType="diamond" title="Diamond Type">
      <div className="space-y-3">
        <p className="text-sm text-gray-600 mb-2">Choose Diamond Type</p>
        <div className="flex gap-2">
          {OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedDiamondType(opt.id)}
              className={`px-4 py-2 rounded-sm text-sm border ${
                selectedDiamondType === opt.id ? 'border-gray-300 bg-gray-50' : 'border-transparent hover:border-gray-300'
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
