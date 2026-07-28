"use client";

import React, { useState } from "react";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface LetterSelectionProps {
  selectedLetters: string[];
  onChange: (letters: string[]) => void;
  availability?: Record<string, boolean>;
  maxLetters?: number;
}

const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "&", "♥", "✝"];

export const MOCK_AVAILABILITY: Record<string, boolean> = {
  A: true,
  B: true,
  C: true,
  D: true,
  E: true,
  F: true,
  G: true,
  H: true,
  I: true,
  J: true,
  K: true,
  L: true,
  M: true,
  N: false,
  O: true, // N mock OOS
  P: true,
  Q: true,
  R: true,
  S: true,
  T: true,
  U: true,
  V: true,
  W: true,
  X: false,
  Y: false,
  Z: false, // X, Y, Z mock OOS
  "&": true,
  "♥": true,
  "✝": true,
};

export const LetterSelection: React.FC<LetterSelectionProps> = ({
  selectedLetters,
  onChange,
  availability = MOCK_AVAILABILITY,
  maxLetters = 3,
}) => {
  const [showMinWarning, setShowMinWarning] = useState(false);

  const handleAddLetter = (letter: string) => {
    if (selectedLetters.length < maxLetters) {
      onChange([...selectedLetters, letter]);
    }
  };

  const handleRemoveLetter = (index: number) => {
    if (selectedLetters.length > 1) {
      const newSelection = [...selectedLetters];
      newSelection.splice(index, 1);
      onChange(newSelection);
    } else {
      // Show warning that at least one letter is required
      setShowMinWarning(true);
      setTimeout(() => setShowMinWarning(false), 3000);
    }
  };

  const isAvailable = (letter: string) => availability[letter] !== false;

  return (
    <div className="mb-6 space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        {/* Label and selected letters on same line */}
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-sm font-medium text-[#502B3A]">Selected Letters:</label>
          {selectedLetters.map((letter, index) => (
            <motion.div
              key={`${letter}-${index}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`
                flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                ${!isAvailable(letter) ? "bg-[#D1A559] text-white" : "bg-[#502B3A] text-white"}
              `}
            >
              <span>{letter}</span>
              <button
                type="button"
                onClick={() => handleRemoveLetter(index)}
                className="ml-0.5 w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-[10px]"
                aria-label={`Remove ${letter}`}
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
        <span className="text-xs text-[#502B3A]/60">
          {selectedLetters.length}/{maxLetters}
        </span>
      </div>

      {/* Minimum selection warning */}
      <AnimatePresence>
        {showMinWarning && (
          <motion.p
            className="text-xs text-red-500 font-medium"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            At least one letter must be selected.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Alphabet grid - click to add */}
      <div className="grid grid-cols-7 md:grid-cols-10 gap-3">
        {ALPHABET.map((letter) => {
          const letterAvailable = isAvailable(letter);
          const isFull = selectedLetters.length >= maxLetters;

          return (
            <motion.button
              key={letter}
              type="button"
              onClick={() => handleAddLetter(letter)}
              className={[
                "w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full border transition-colors",
                "bg-white text-[#502B3A] border-[#502B3A]/20 hover:border-[#502B3A] hover:bg-[#502B3A]/5",
                !letterAvailable ? "bg-gray-50 text-gray-400 border-dashed" : "",
                isFull ? "opacity-50 cursor-not-allowed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isFull}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Helper text for OOS selections */}
      {selectedLetters.some((l) => availability[l] === false) && (
        <motion.p
          className="text-xs text-[#D1A559] font-medium"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Note: One or more selected items are out of stock. You can request this item.
        </motion.p>
      )}
    </div>
  );
};
