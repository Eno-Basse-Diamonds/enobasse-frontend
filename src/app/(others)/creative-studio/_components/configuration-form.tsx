"use client";

import type {
  RingConfiguration,
  TabType,
} from "../../../../lib/types/creative-studio";
import {
  HEAD_STYLES_BY_GEMSTONE,
  GEMSTONES_BY_HEAD_STYLE,
} from "../../../../lib/utils/constants/creative-studio";
import { DiamondPreview } from "./diamond-preview";
import { HeadStyleSelection } from "./head-style-selection";
import { DiamondTypeSelection } from "./diamond-type-selection";
import { ShankStyleSelection } from "./shank-style-selection";
import { MetalSelection } from "./metal-selection";
import { EngravingSelection } from "./engraving-selection";
import { MobileConfigurationTabs } from "./mobile-configuration-tabs";
import { RingSizeSelection } from "./ring-size-selection";
import { useState } from "react";
import { sendCreativeStudioRequest } from "@/lib/api/creative-studio";
import { Modal } from "./shared/modal";

interface ConfigurationFormProps {
  configuration: RingConfiguration;
  onConfigurationChange: (config: RingConfiguration) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  generatedImages?: Array<{ src: string; alt?: string }>;
}

export function ConfigurationForm({
  configuration,
  onConfigurationChange,
  activeTab,
  onTabChange,
  generatedImages = [],
}: ConfigurationFormProps) {
  const updateConfiguration = (updates: Partial<RingConfiguration>) => {
    onConfigurationChange({ ...configuration, ...updates });
  };

  const availableHeadStyles =
    HEAD_STYLES_BY_GEMSTONE[configuration.gemstoneShape] || [];
  const availableGemstoneShapes =
    GEMSTONES_BY_HEAD_STYLE[configuration.headStyle] || [];

  return (
    <>
      <MobileConfigurationTabs
        activeTab={activeTab}
        setActiveTab={(tab: string) => onTabChange(tab as TabType)}
      />

      <DiamondPreview
        activeTab={activeTab}
        selectedPreviewShape={configuration.gemstoneShape}
        setSelectedPreviewShape={(shape) =>
          updateConfiguration({ gemstoneShape: shape })
        }
        selectedPreviewSize={configuration.previewSize}
        setSelectedPreviewSize={(s) => updateConfiguration({ previewSize: s })}
        availableGemstoneShapes={availableGemstoneShapes}
      />

      <DiamondTypeSelection
        activeTab={activeTab}
        selectedDiamondType={configuration.diamondType}
        setSelectedDiamondType={(type) =>
          updateConfiguration({ diamondType: type as any })
        }
      />

      <HeadStyleSelection
        activeTab={activeTab}
        selectedHeadStyle={configuration.headStyle}
        setSelectedHeadStyle={(style) =>
          updateConfiguration({ headStyle: style })
        }
        availableHeadStyles={availableHeadStyles}
      />

      <ShankStyleSelection
        activeTab={activeTab}
        selectedShankStyle={configuration.shankStyle}
        setSelectedShankStyle={(style) =>
          updateConfiguration({ shankStyle: style })
        }
      />

      <MetalSelection
        activeTab={activeTab}
        selectedMetalType={configuration.metalType}
        setSelectedMetalType={(type) =>
          updateConfiguration({ metalType: type })
        }
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
        setEngravingText={(text) =>
          updateConfiguration({ engravingText: text })
        }
        engravingFont={configuration.engravingFont}
        setEngravingFont={(font) =>
          updateConfiguration({ engravingFont: font })
        }
      />

      <RequestQuoteButton
        configuration={configuration}
        generatedImages={generatedImages}
      />
    </>
  );
}

function RequestQuoteButton({
  configuration,
  generatedImages,
}: {
  configuration: RingConfiguration;
  generatedImages: Array<{ src: string; alt?: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const CLOUD_NAME = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);
      const UPLOAD_PRESET = "creative-studio";

      const uploadDataUrlToCloudinary = async (dataUrl: string) => {
        if (!dataUrl.startsWith("data:")) return dataUrl;

        const res = await fetch(dataUrl);
        const blob = await res.blob();

        const form = new FormData();
        form.append("file", blob);
        form.append("upload_preset", UPLOAD_PRESET);

        const resp = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
          method: "POST",
          body: form,
        });

        const json = await resp.json();
        if (!resp.ok) {
          throw new Error(json?.error?.message || "Cloudinary upload failed");
        }

        return json.secure_url as string;
      };

      const uploadedImageUrls = await Promise.all(
        generatedImages.map((g) => uploadDataUrlToCloudinary(g.src))
      );

      await sendCreativeStudioRequest({
        name,
        email,
        phone,
        message,
        messageConfig: configuration,
        generatedImages: uploadedImageUrls,
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setOpen(false);
    } catch (err) {
      console.error("Error sending ring request", err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-primary-500 text-white py-3 px-6 rounded-sm hover:bg-primary-400 transition-colors font-medium"
      >
        REQUEST A QUOTE
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Request a Quote"
      >
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-scroll">
          <div>
            <label className="block text-sm text-primary-500 mb-1">
              Full name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-primary-500 mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-primary-500 mb-1">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-primary-500 mb-1">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm"
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary-500 text-white rounded-sm"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </Modal>

      {success && (
        <div className="mt-3 text-sm text-green-600">
          Request sent — we will contact you soon.
        </div>
      )}
    </>
  );
}
