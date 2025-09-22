"use client";

import { useState, useEffect } from "react";
import { WishlistIcon } from "@/components/icons/wishlist";
import { PageHeading } from "@/components/page-heading";
import {
  headStylesByGemstone,
  gemstonesByHeadStyle,
  shankStyles,
  headStyles,
  metalTypes,
  karats,
} from "@/lib/utils/constants/creative-studio";
import { MobileConfigurationTabs } from "./_components/mobile-configuration-tabs";
import { DiamondPreview } from "./_components/diamond-preview";
import { HeadStyleSelection } from "./_components/head-style-selection";
import { ShankStyleSelection } from "./_components/shank-style-selection";
import { MetalSelection } from "./_components/metal-selection";
import { ProductDetails } from "./_components/product-details";
import { ProductGallery } from "./_components/product-gallery";
import "./styles.scss";

export default function RingConfiguratorPage() {
  const [selectedPreviewShape, setSelectedPreviewShape] = useState("round");
  const [selectedPreviewSize, setSelectedPreviewSize] = useState("1 ct");
  const [selectedHeadStyle, setSelectedHeadStyle] = useState("4-prong-nouveau");
  const [selectedShankStyle, setSelectedShankStyle] = useState("solitaire");
  const [selectedMetalType, setSelectedMetalType] = useState("white-gold");
  const [selectedKarat, setSelectedKarat] = useState("14k");
  const [activeTab, setActiveTab] = useState("diamond");
  const [showProductDetails, setShowProductDetails] = useState(false);

  const productImages = [
    {
      src: "https://ion.bluenile.com/sets/Jewelry/Photoshoot/Bluenile/BrioPackshot/Custom/BNS01xBNH15/BNS01xBNH15_CSH/BNS01xBNH15_M1_CSH_DIM_wht_0100CT_W_W/BNS01xBNH15_M1_CSH_DIM_wht_0100CT_W_W.001.jpg",
      alt: "Upright View",
    },
    {
      src: "https://ion.bluenile.com/sets/Jewelry/Photoshoot/Bluenile/BrioPackshot/Custom/BNS01xBNH15/BNS01xBNH15_CSH/BNS01xBNH15_M1_CSH_DIM_wht_0100CT_W_W/BNS01xBNH15_M1_CSH_DIM_wht_0100CT_W_W.002.jpg",
      alt: "Front View",
    },
    {
      src: "https://ion.bluenile.com/sets/Jewelry/Photoshoot/Bluenile/BrioPackshot/Custom/BNS01xBNH15/BNS01xBNH15_CSH/BNS01xBNH15_M1_CSH_DIM_wht_0100CT_W_W/BNS01xBNH15_M1_CSH_DIM_wht_0100CT_W_W.003.jpg",
      alt: "Side View",
    },
  ];

  const getFullMetalName = () => {
    const metal = metalTypes.find((m) => m.id === selectedMetalType);
    const karat = karats.find((k) => k.id === selectedKarat);

    if (selectedMetalType === "platinum") {
      return "Platinum";
    }

    return `${karat?.name} ${metal?.name}`;
  };

  const availableHeadStyles =
    headStylesByGemstone[
      selectedPreviewShape as keyof typeof headStylesByGemstone
    ] || [];

  const availableGemstoneShapes =
    gemstonesByHeadStyle[
      selectedHeadStyle as keyof typeof gemstonesByHeadStyle
    ] || [];

  const getRingName = () => {
    const shank = shankStyles.find((s) => s.id === selectedShankStyle);
    const head = headStyles.find((h) => h.id === selectedHeadStyle);

    return `${shank?.name || "Solitaire"} Engagement Ring with ${head?.name || "Classic"} Head`;
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (showProductDetails && e.target.classList.contains("backdrop")) {
        setShowProductDetails(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProductDetails]);

  return (
    <div className="min-h-screen my-12">
      <PageHeading title="Creative Studio" />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
          <div className="space-y-6 self-start lg:sticky lg:top-[10rem]">
            <ProductGallery
              gemstoneShape={selectedPreviewShape}
              headStyle={selectedHeadStyle}
              shankStyle={selectedShankStyle}
              metalType={selectedMetalType}
              productImages={productImages}
            />
            <ProductDetails metalName={getFullMetalName()} />
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div className="mb-10">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-medium text-primary-500 font-primary">
                    {getRingName()}
                  </h1>
                  <div className="mt-4 lg:mt-6">
                    <p className="text-lg lg:text-xl font-medium text-primary-500">
                      Price available upon request
                    </p>
                    <p className="font-medium text-gray-600 mt-2">
                      You can request a quote using the link below or by calling
                      by phone.
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <WishlistIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Configuration Tabs */}
            <MobileConfigurationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <DiamondPreview
              activeTab={activeTab}
              selectedPreviewShape={selectedPreviewShape}
              setSelectedPreviewShape={setSelectedPreviewShape}
              selectedPreviewSize={selectedPreviewSize}
              setSelectedPreviewSize={setSelectedPreviewSize}
              availableGemstoneShapes={availableGemstoneShapes}
            />

            <HeadStyleSelection
              activeTab={activeTab}
              selectedHeadStyle={selectedHeadStyle}
              setSelectedHeadStyle={setSelectedHeadStyle}
              availableHeadStyles={availableHeadStyles}
            />

            <ShankStyleSelection
              activeTab={activeTab}
              selectedShankStyle={selectedShankStyle}
              setSelectedShankStyle={setSelectedShankStyle}
            />


            <MetalSelection
              activeTab={activeTab}
              selectedMetalType={selectedMetalType}
              setSelectedMetalType={setSelectedMetalType}
              selectedKarat={selectedKarat}
              setSelectedKarat={setSelectedKarat}
            />

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-primary-500 text-white py-3 px-6 rounded-sm hover:bg-primary-400 transition-colors font-medium">
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Product Details Button */}
      <div className="lg:hidden fixed bottom-4 left-4 z-10">
        <button
          className="bg-white rounded-full p-3 shadow-lg"
          onClick={() => setShowProductDetails(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      {/* Product Details Modal */}
      {showProductDetails && (
        <ProductDetails
          metalName={getFullMetalName()}
          isModal
          onClose={() => setShowProductDetails(false)}
        />
      )}
    </div>
  );
}
