"use client";

import React, { useState, useEffect, useRef } from "react";
import { PlusIcon, CloseIcon } from "@/components/icons";
import * as motion from "motion/react-client";
import { useAnimation, AnimatePresence } from "motion/react";

export const Engraving: React.FC<{
  engraving: { text: string; fontStyle: string } | undefined;
  setEngraving: (val: { text: string; fontStyle: string } | undefined) => void;
}> = ({ engraving, setEngraving }) => {
  const [showEngravingModal, setShowEngravingModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowEngravingModal(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowEngravingModal(false);
    };

    if (showEngravingModal) {
      setIsMounted(true);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      const header = document.querySelector("header");
      if (header) header.style.zIndex = "0";
    } else {
      const header = document.querySelector("header");
      if (header) header.style.zIndex = "20";
      const timer = setTimeout(() => setIsMounted(false), 50);
      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [showEngravingModal]);

  const handleRemoveEngraving = () => {
    setEngraving(undefined);
  };

  return (
    <>
      {engraving ? (
        <motion.div
          className="flex items-center justify-between gap-3 py-2 px-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setShowEngravingModal(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -1 }}
          role="button"
          aria-label={`Edit engraving: ${engraving.text}`}
          tabIndex={0}
        >
          <span
            className="text-sm font-medium text-primary-800 flex-grow truncate"
            style={{ fontFamily: engraving.fontStyle }}
            title={engraving.text}
          >
            {engraving.text}
          </span>

          <motion.button
            className="flex items-center justify-center p-1 text-primary-800 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveEngraving();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Remove engraving"
          >
            <CloseIcon className="w-4 h-4" />
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          className="engraving__button"
          onClick={() => setShowEngravingModal(true)}
          whileHover={{
            color: "#3A1E2B",
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div whileHover={{ rotate: 90 }}>
            <PlusIcon className="w-5 h-5" />
          </motion.div>
          Add Engraving
        </motion.button>
      )}

      <AnimatePresence>
        {isMounted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowEngravingModal(false)}
            />

            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative z-10 w-full max-w-md p-6 bg-white shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Add Engraving
                  </h3>
                  <motion.button
                    onClick={() => setShowEngravingModal(false)}
                    className="text-gray-500 hover:text-primary-800"
                    whileHover={{
                      scale: 1.1,
                      color: "#502B3A",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CloseIcon className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <EngravingPanel
                    engraving={engraving}
                    setEngraving={setEngraving}
                    closeModal={() => setShowEngravingModal(false)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const EngravingPanel: React.FC<{
  engraving: { text: string; fontStyle: string } | undefined;
  setEngraving: (val: { text: string; fontStyle: string }) => void;
  closeModal: () => void;
}> = ({ engraving, setEngraving, closeModal }) => {
  const MAX_CHARS = 20;
  const [engravingText, setEngravingText] = useState(engraving?.text || "");
  const [selectedFont, setSelectedFont] = useState({
    name: engraving?.fontStyle || "Arial",
    fontFamily: engraving?.fontStyle || "Arial, sans-serif",
  });
  const charsLeftControls = useAnimation();

  useEffect(() => {
    setEngravingText(engraving?.text || "");
    setSelectedFont({
      name: engraving?.fontStyle || "Arial",
      fontFamily: engraving?.fontStyle || "Arial, sans-serif",
    });
  }, [engraving]);

  const fonts = [
    { name: "Arial", fontFamily: "Arial, sans-serif" },
    { name: "Times New Roman", fontFamily: '"Times New Roman", serif' },
    { name: "Courier New", fontFamily: '"Courier New", monospace' },
    { name: "Georgia", fontFamily: "Georgia, serif" },
    { name: "Verdana", fontFamily: "Verdana, sans-serif" },
    { name: "Dancing Script", fontFamily: '"Dancing Script", cursive' },
  ];

  const handleSaveEngraving = () => {
    setEngraving({ text: engravingText, fontStyle: selectedFont.fontFamily });
    closeModal();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_CHARS) {
      setEngravingText(e.target.value);
      if (e.target.value.length > engravingText.length) {
        charsLeftControls.start({
          scale: [1, 1.1, 1],
          color: ["#502B3A60", "#D1A559", "#502B3A60"],
          transition: { duration: 0.3 },
        });
      }
    }
  };

  return (
    <div className="engraving-panel">
      <div className="engraving-panel__section">
        <label className="engraving-panel__label">Enter Your Engraving</label>
        <input
          type="text"
          className="engraving-panel__input"
          placeholder="Enter your engraving text here..."
          value={engravingText}
          onChange={handleTextChange}
          maxLength={MAX_CHARS}
        />
        <p className="engraving-panel__char-count">
          Characters Left:
          <motion.span
            className="engraving-panel__char-count-number"
            animate={charsLeftControls}
          >
            {MAX_CHARS - engravingText.length}
          </motion.span>
        </p>
      </div>

      <div className="engraving-panel__section">
        <label className="engraving-panel__label">Choose Font</label>
        <div className="engraving-panel__font-grid">
          {fonts.map((font) => (
            <motion.button
              key={font.name}
              className={`engraving-panel__font-button ${
                engraving?.fontStyle === font.fontFamily ||
                selectedFont.name === font.name
                  ? "engraving-panel__font-button--selected"
                  : ""
              }`}
              style={{ fontFamily: font.fontFamily }}
              onClick={() => setSelectedFont(font)}
              whileHover={{
                scale: 1.05,
                borderColor: "#D1A559",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Aa
            </motion.button>
          ))}
        </div>
      </div>

      <EngravingPreview
        text={engravingText}
        fontFamily={selectedFont.fontFamily}
      />

      <motion.p
        className="engraving-panel__disclaimer"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        A 10x magnifying glass may be required to clearly read the engraving on
        your jewelry
      </motion.p>

      <motion.button
        className={`engraving-panel__save-button ${
          !engravingText ? "engraving-panel__save-button--disabled" : ""
        }`}
        onClick={handleSaveEngraving}
        disabled={!engravingText}
        whileHover={
          engravingText
            ? {
                scale: 1.02,
                backgroundColor: "#3A1E2B",
              }
            : {}
        }
        whileTap={engravingText ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Save Engraving
      </motion.button>
    </div>
  );
};

interface EngravingPreviewProps {
  text: string;
  fontFamily: string;
}

const EngravingPreview: React.FC<EngravingPreviewProps> = ({
  text,
  fontFamily,
}) => {
  return (
    <div className="engraving-preview">
      <h3 className="engraving-preview__title">Engraving Preview</h3>

      <motion.div
        className="engraving-preview__container"
        whileHover={{ scale: 1.01 }}
      >
        <motion.div
          className="engraving-preview__background"
          style={{ backgroundImage: "url('/images/ring-band.png')" }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
          }}
        ></motion.div>
        <motion.svg
          viewBox="0 0 248 120"
          className="engraving-preview__svg"
          preserveAspectRatio="xMidYMid meet"
          whileHover={{ borderColor: "#D1A559" }}
        >
          <path
            id="engravingPath"
            d="M0,80 Q124,34 248,80"
            fill="transparent"
            stroke="none"
          ></path>
          <text
            textAnchor="middle"
            className="engraving-preview__text"
            fontSize="14"
            fontWeight="500"
          >
            <textPath href="#engravingPath" startOffset="50%">
              <tspan
                style={{
                  fontFamily: fontFamily,
                  letterSpacing: "0.5px",
                }}
              >
                {text || "Your engraving text here"}
              </tspan>
            </textPath>
          </text>
        </motion.svg>
      </motion.div>
    </div>
  );
};
