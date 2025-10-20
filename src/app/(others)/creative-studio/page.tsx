"use client";

import { useState } from "react";
import { PageHeading } from "@/components/page-heading";
import type { RingConfiguration, TabType } from "../../../lib/types/creative-studio";
import { DEFAULT_CONFIGURATION } from "../../../lib/utils/constants/creative-studio";
import { ConfigurationForm } from "./_components/configuration-form";
import { ProductInfo } from "./_components/product-info";
import { ProductDetails } from "./_components/product-details";
import { ProductGallery } from "./_components/product-gallery";
import { Modal } from "./_components/shared/modal";
import { getFullMetalName } from "@/lib/utils/creative-studio";
import "./styles.scss";

export default function RingConfiguratorPage() {
  const [configuration, setConfiguration] = useState<RingConfiguration>(DEFAULT_CONFIGURATION);
  const [activeTab, setActiveTab] = useState<TabType>("diamond");
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{ src: string; alt?: string }>>([]);

  return (
    <div className="min-h-screen my-12">
      <PageHeading title="Creative Studio" />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
          <div className="space-y-6 self-start lg:sticky lg:top-[10rem]">
            <ProductGallery
              gemstoneShape={configuration.gemstoneShape}
              headStyle={configuration.headStyle}
              shankStyle={configuration.shankStyle}
              metalType={configuration.metalType}
              onImagesUpdate={(imgs) => setGeneratedImages(imgs)}
            />
            <ProductDetails
              metalName={getFullMetalName(configuration.metalType, configuration.karat)}
              engravingText={configuration.engravingText}
              engravingFont={configuration.engravingFont}
            />
          </div>

          <div className="flex flex-col gap-y-5">
            <ProductInfo configuration={configuration} />

            <ConfigurationForm
              configuration={configuration}
              onConfigurationChange={setConfiguration}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              generatedImages={generatedImages}
            />
          </div>
        </div>
      </div>

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

      <Modal
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        title="Product Details"
      >
        <ProductDetails
          metalName={getFullMetalName(configuration.metalType, configuration.karat)}
          engravingText={configuration.engravingText}
          engravingFont={configuration.engravingFont}
        />
      </Modal>
    </div>
  );
}
