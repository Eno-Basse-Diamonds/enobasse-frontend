"use client";

import type { RingConfiguration, TabType } from '../../../../lib/types/creative-studio';
import { HEAD_STYLES_BY_GEMSTONE, GEMSTONES_BY_HEAD_STYLE } from '../../../../lib/utils/constants/creative-studio';
import { DiamondPreview } from './diamond-preview';
import { HeadStyleSelection } from './head-style-selection';
import { DiamondTypeSelection } from './diamond-type-selection';
import { ShankStyleSelection } from './shank-style-selection';
import { MetalSelection } from './metal-selection';
import { EngravingSelection } from './engraving-selection';
import { MobileConfigurationTabs } from './mobile-configuration-tabs';
import { RingSizeSelection } from './ring-size-selection';

interface ConfigurationFormProps {
  configuration: RingConfiguration;
  onConfigurationChange: (config: RingConfiguration) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function ConfigurationForm({
  configuration,
  onConfigurationChange,
  activeTab,
  onTabChange,
}: ConfigurationFormProps) {
  const updateConfiguration = (updates: Partial<RingConfiguration>) => {
    onConfigurationChange({ ...configuration, ...updates });
  };

  const availableHeadStyles = HEAD_STYLES_BY_GEMSTONE[configuration.gemstoneShape] || [];
  const availableGemstoneShapes = GEMSTONES_BY_HEAD_STYLE[configuration.headStyle] || [];

  return (
    <>
      <MobileConfigurationTabs activeTab={activeTab} setActiveTab={(tab: string) => onTabChange(tab as TabType)} />

      <DiamondPreview
        activeTab={activeTab}
        selectedPreviewShape={configuration.gemstoneShape}
        setSelectedPreviewShape={(shape) => updateConfiguration({ gemstoneShape: shape })}
        selectedPreviewSize="1 ct"
        setSelectedPreviewSize={() => {}}
        availableGemstoneShapes={availableGemstoneShapes}
      />

      <DiamondTypeSelection
        activeTab={activeTab}
        selectedDiamondType={configuration.diamondType}
        setSelectedDiamondType={(type) => updateConfiguration({ diamondType: type as any })}
      />

      <HeadStyleSelection
        activeTab={activeTab}
        selectedHeadStyle={configuration.headStyle}
        setSelectedHeadStyle={(style) => updateConfiguration({ headStyle: style })}
        availableHeadStyles={availableHeadStyles}
      />

      <ShankStyleSelection
        activeTab={activeTab}
        selectedShankStyle={configuration.shankStyle}
        setSelectedShankStyle={(style) => updateConfiguration({ shankStyle: style })}
      />

      <MetalSelection
        activeTab={activeTab}
        selectedMetalType={configuration.metalType}
        setSelectedMetalType={(type) => updateConfiguration({ metalType: type })}
        selectedKarat={configuration.karat}
        setSelectedKarat={(karat) => updateConfiguration({ karat })}
      />

      <RingSizeSelection
        activeTab={activeTab}
        selectedRingSize={configuration.ringSize}
        setSelectedRingSize={(size) => updateConfiguration({ ringSize: size })}
      />

      <EngravingSelection
        activeTab={activeTab}
        engravingText={configuration.engravingText}
        setEngravingText={(text) => updateConfiguration({ engravingText: text })}
        engravingFont={configuration.engravingFont}
        setEngravingFont={(font) => updateConfiguration({ engravingFont: font })}
      />

      <div className="space-y-3">
        <button className="w-full bg-primary-500 text-white py-3 px-6 rounded-sm hover:bg-primary-400 transition-colors font-medium">
          REQUEST A QUOTE
        </button>
      </div>
    </>
  );
}
