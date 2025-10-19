"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { ENGRAVING_FONTS } from "../../../../lib/utils/constants/creative-studio";
import { SectionContainer } from "./shared/section-container";

interface EngravingSelectionProps {
  activeTab: string;
  engravingText: string;
  setEngravingText: (text: string) => void;
  engravingFont: string;
  setEngravingFont: (font: string) => void;
}

export function EngravingSelection({
  activeTab,
  engravingText,
  setEngravingText,
  engravingFont,
  setEngravingFont,
}: EngravingSelectionProps) {
  const MAX_CHARS = 20;
  const [showFontOptions, setShowFontOptions] = useState(false);


  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setEngravingText(e.target.value);
    }
  };

  const handleFontSelect = (font: { name: string; fontFamily: string }) => {
    setEngravingFont(font.fontFamily);
    setShowFontOptions(false);
  };

  const clearEngraving = () => {
    setEngravingText("");
    setEngravingFont(ENGRAVING_FONTS[0].fontFamily);
  };

  const charactersRemaining = MAX_CHARS - engravingText.length;

  return (
    <SectionContainer activeTab={activeTab} tabType="engraving" title="Engraving">

      <div className="space-y-4">
        {/* Text Input */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Add Personal Engraving</p>
          <div className="relative">
            <input
              type="text"
              value={engravingText}
              onChange={handleTextChange}
              placeholder="Enter your text here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={MAX_CHARS}
            />
            {engravingText && (
              <button
                onClick={clearEngraving}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              {charactersRemaining}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Maximum {MAX_CHARS} characters
          </p>
        </div>

        {/* Font Selection */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Select Font Style</p>
          <div className="relative">
            <button
              onClick={() => setShowFontOptions(!showFontOptions)}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm text-left flex justify-between items-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span style={{ fontFamily: engravingFont }}>
                {ENGRAVING_FONTS.find(f => f.fontFamily === engravingFont)?.name || "Arial"}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${showFontOptions ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showFontOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg"
              >
                {ENGRAVING_FONTS.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleFontSelect(font)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-sm last:rounded-b-sm ${
                      engravingFont === font.fontFamily ? 'bg-primary-50 text-primary-600' : ''
                    }`}
                    style={{ fontFamily: font.fontFamily }}
                  >
                    {font.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Preview */}
        {engravingText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 p-4 rounded-sm border border-gray-200"
          >
            <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>

            <div className="relative h-24 flex items-center justify-center mb-3">
              <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10"
                style={{
                  backgroundImage: "url('https://res.cloudinary.com/enobasse/image/upload/v1756506783/ring-band_ycchj3.png')",
                }}
              ></div>
              <svg
                viewBox="0 0 200 80"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  id="engravingPath"
                  d="M0,60 Q100,20 200,60"
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
                <text
                  textAnchor="middle"
                  className="text-primary-600"
                  fontSize="12"
                  fontWeight="500"
                >
                  <textPath href="#engravingPath" startOffset="50%">
                    <tspan
                      style={{
                        fontFamily: engravingFont,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {engravingText}
                    </tspan>
                  </textPath>
                </text>
              </svg>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Note: Engraving text will not appear in the 3D preview
            </p>
          </motion.div>
        )}

        {/* Info Text */}
        {!engravingText && (
          <motion.p
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-500 text-center"
          >
            A 10x magnifying glass may be required to clearly read the engraving on your jewelry
          </motion.p>
        )}
      </div>
    </SectionContainer>
  );
}
