"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  CheckCircle,
  Gem,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import * as motion from "motion/react-client";

import { useAccountStore } from "@/modules/account/store";
import { useAccountByEmail } from "@/modules/admin/hooks";
import { sendCreativeStudioRequest } from "@/modules/creative-studio/api";
import {
  GEMSTONES_BY_HEAD_STYLE,
  HEAD_STYLES_BY_GEMSTONE,
} from "@/modules/creative-studio/constants";
import type { RingConfiguration, TabType } from "@/modules/creative-studio/types";
import { logger } from "@/shared/utils/logger";

import { DiamondPreview } from "./DiamondPreview";
import { DiamondTypeSelection } from "./DiamondTypeSelection";
import { EngravingSelection } from "./EngravingSelection";
import { HeadStyleSelection } from "./HeadStyleSelection";
import { MetalSelection } from "./MetalSelection";
import { MobileConfigurationTabs } from "./MobileConfigurationTabs";
import { Modal } from "./Modal";
import { RingSizeSelection } from "./RingSizeSelection";
import { ShankStyleSelection } from "./ShankStyleSelection";

interface ConfigurationFormProps {
  configuration: RingConfiguration;
  onConfigurationChange: (config: RingConfiguration) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  generatedImages?: Array<{ src: string; alt?: string }>;
}

/**
 * Configuration form for the creative studio.
 *
 * @description Orchestrates all ring-configuration selection widgets
 * (diamond preview, head, shank, metal, ring size, engraving) and the
 * mobile tab navigation. Manages the "Request a Quote" button and modal
 * submission flow including Cloudinary upload of generated preview images.
 * @param configuration - Current ring configuration state.
 * @param onConfigurationChange - Callback when configuration is updated.
 * @param activeTab - Currently active mobile tab identifier.
 * @param onTabChange - Callback when the active tab changes.
 * @param generatedImages - Rendered preview images from the 3D viewer.
 * @returns The full configuration sidebar UI.
 */
export function ConfigurationForm({
  configuration,
  onConfigurationChange,
  activeTab,
  onTabChange,
  generatedImages = [],
}: ConfigurationFormProps) {
  const updateConfiguration = (updates: Partial<RingConfiguration>) => {
    const nextConfig = { ...configuration, ...updates };
    if (!nextConfig.engravingText) {
      nextConfig.engravingFont = "";
    } else if (!nextConfig.engravingFont) {
      nextConfig.engravingFont = "Arial, sans-serif";
    }
    onConfigurationChange(nextConfig);
  };

  const availableHeadStyles = HEAD_STYLES_BY_GEMSTONE[configuration.gemstoneShape] || [];
  const availableGemstoneShapes = GEMSTONES_BY_HEAD_STYLE[configuration.headStyle] || [];

  const handleGemstoneShapeChange = (shape: string) => {
    const updates: Partial<RingConfiguration> = { gemstoneShape: shape };

    // Auto-select a compatible head style if the current head style is not compatible with the new gemstone shape
    const compatibleHeadStyles = HEAD_STYLES_BY_GEMSTONE[shape] || [];
    if (
      compatibleHeadStyles.length > 0 &&
      !compatibleHeadStyles.includes(configuration.headStyle)
    ) {
      updates.headStyle = compatibleHeadStyles[0];
    }

    updateConfiguration(updates);
  };

  return (
    <>
      <MobileConfigurationTabs
        activeTab={activeTab}
        setActiveTab={(tab: string) => onTabChange(tab as TabType)}
      />

      <DiamondPreview
        activeTab={activeTab}
        selectedPreviewShape={configuration.gemstoneShape}
        setSelectedPreviewShape={handleGemstoneShapeChange}
        selectedPreviewSize={configuration.previewSize}
        setSelectedPreviewSize={(s) => updateConfiguration({ previewSize: s })}
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

      <RequestQuoteButton configuration={configuration} generatedImages={generatedImages} />
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

  const { data: session } = useSession();
  const { isHydrated, billingAddress: savedBillingAddress } = useAccountStore();
  const { data: dbAccount } = useAccountByEmail(session?.user?.email);
  const hasInitializedRef = useRef(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSuccess(false);
      setError(null);
      hasInitializedRef.current = false;
    }, 300);
  };

  // Autofill form data when user is logged in
  useEffect(() => {
    if (
      open &&
      isHydrated &&
      !hasInitializedRef.current &&
      (session === undefined || dbAccount !== undefined)
    ) {
      const autofillEmail = session?.user?.email || savedBillingAddress?.email || "";
      let autofillName = session?.user?.name || "";
      let autofillPhone = savedBillingAddress?.phone || "";

      if (savedBillingAddress) {
        if (savedBillingAddress.firstName && savedBillingAddress.lastName) {
          autofillName = `${savedBillingAddress.firstName} ${savedBillingAddress.lastName}`.trim();
        }
      }

      if (dbAccount) {
        if (dbAccount.name) {
          autofillName = dbAccount.name || autofillName;
        }
        autofillPhone = dbAccount.phone || autofillPhone;
      }

      if (autofillName) setName(autofillName);
      if (autofillEmail) setEmail(autofillEmail);
      if (autofillPhone) setPhone(autofillPhone);

      hasInitializedRef.current = true;
    }
  }, [open, isHydrated, session, dbAccount, savedBillingAddress]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
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
        generatedImages.map((g) => uploadDataUrlToCloudinary(g.src)),
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
    } catch (err) {
      logger.error("Error sending ring request", err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-primary-500 hover:bg-primary-400 text-white py-3 px-6 rounded-sm transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2"
      >
        REQUEST A QUOTE
      </button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        title="Bespoke Design Inquiry"
        className="sm:max-w-5xl"
      >
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-6 px-4 space-y-6"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-secondary-100/50 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-secondary-500" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute -top-1 -right-1 text-secondary-500"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-primary-500 font-semibold tracking-wide">
                Inquiry Received
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you! Your custom ring configuration has been successfully submitted. An Eno
                Bassé private jeweler will review your design and follow up with a bespoke quote
                shortly.
              </p>
            </div>

            <div className="w-full max-w-md bg-gray-50 rounded-sm p-4 border border-gray-100 text-left space-y-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                Submitted Design Summary
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 font-medium">Gemstone:</span>{" "}
                  <span className="text-gray-700 capitalize font-medium">
                    {configuration.gemstoneShape} ({configuration.previewSize})
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Metal:</span>{" "}
                  <span className="text-gray-700 capitalize font-medium">
                    {configuration.karat} {configuration.metalType.replace(/-/g, " ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Head Type:</span>{" "}
                  <span className="text-gray-700 capitalize font-medium">
                    {configuration.headStyle.replace(/-/g, " ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Shank Style:</span>{" "}
                  <span className="text-gray-700 capitalize font-medium">
                    {configuration.shankStyle.replace(/-/g, " ")}
                  </span>
                </div>
                {configuration.engravingText && (
                  <div className="col-span-2 border-t border-gray-100 pt-2 mt-1">
                    <span className="text-gray-400 font-medium block mb-0.5">Engraving:</span>
                    <span
                      className="text-secondary-500 font-medium block italic"
                      style={{ fontFamily: configuration.engravingFont || "inherit" }}
                    >
                      "{configuration.engravingText}"
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-primary-500 text-white rounded-sm hover:bg-primary-400 transition-colors font-medium text-sm tracking-wide shadow-sm"
            >
              Back to Studio
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left Column: Design Summary & Thumbnail */}
            <div className="md:col-span-2 bg-gray-50/50 p-4 rounded-sm border border-gray-100/80 flex flex-col justify-between h-full min-h-[340px]">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 mb-3 flex items-center gap-1.5">
                  <Gem className="w-3.5 h-3.5 text-secondary-500" />
                  Your Design
                </h4>

                {generatedImages[0]?.src ? (
                  <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-2 mb-4 shadow-sm group">
                    <img
                      src={generatedImages[0].src}
                      alt="Custom ring render"
                      className="object-contain max-h-64 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-1.5 right-2 text-[9px] text-gray-300 font-mono tracking-wider uppercase bg-white/75 px-1 rounded-sm">
                      3D Render
                    </span>
                  </div>
                ) : (
                  <div className="aspect-square w-full rounded-sm bg-white border border-dashed border-gray-200 flex flex-col items-center justify-center p-4 mb-4 text-center">
                    <Gem className="w-8 h-8 text-gray-300 mb-2 animate-pulse" />
                    <p className="text-xs text-gray-400">Preparing preview render...</p>
                  </div>
                )}

                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between py-1 border-b border-gray-100/50">
                    <span className="font-medium text-gray-400">Gemstone</span>
                    <span className="text-primary-500 font-semibold capitalize">
                      {configuration.gemstoneShape} ({configuration.previewSize})
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100/50">
                    <span className="font-medium text-gray-400">Diamond Type</span>
                    <span className="text-primary-500 font-semibold capitalize">
                      {configuration.diamondType === "lab"
                        ? "Lab-grown"
                        : configuration.diamondType}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100/50">
                    <span className="font-medium text-gray-400">Setting Style</span>
                    <span
                      className="text-primary-500 font-semibold capitalize truncate max-w-[120px]"
                      title={configuration.headStyle}
                    >
                      {configuration.headStyle.replace(/-/g, " ")}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100/50">
                    <span className="font-medium text-gray-400">Shank Style</span>
                    <span
                      className="text-primary-500 font-semibold capitalize truncate max-w-[120px]"
                      title={configuration.shankStyle}
                    >
                      {configuration.shankStyle.replace(/-/g, " ")}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100/50">
                    <span className="font-medium text-gray-400">Metal & Karat</span>
                    <span className="text-primary-500 font-semibold capitalize">
                      {configuration.karat} {configuration.metalType.replace(/-/g, " ")}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100/50">
                    <span className="font-medium text-gray-400">Ring Size</span>
                    <span className="text-primary-500 font-semibold">
                      Size {configuration.ringSize}
                    </span>
                  </div>
                  {configuration.engravingText && (
                    <div className="mt-2.5 p-2 bg-white rounded-sm border border-gray-100">
                      <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">
                        Engraving
                      </span>
                      <span
                        className="text-xs font-semibold text-secondary-500 block truncate"
                        style={{ fontFamily: configuration.engravingFont || "inherit" }}
                      >
                        "{configuration.engravingText}"
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 text-center font-secondary">
                Eno Bassé Creative Studio
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <h3 className="text-lg font-serif font-semibold text-primary-500 tracking-wide">
                  Design Consultation
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Enter your details below. A bridal concierge will review your selections and
                  prepare a bespoke quote.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-sm text-xs flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Victoria Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 rounded-sm text-sm outline-none transition-all bg-white hover:border-gray-300 font-secondary"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 rounded-sm text-sm outline-none transition-all bg-white hover:border-gray-300 font-secondary"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Phone Number{" "}
                    <span className="text-[10px] text-gray-400 lowercase normal-case">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 rounded-sm text-sm outline-none transition-all bg-white hover:border-gray-300 font-secondary"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Special Requests{" "}
                    <span className="text-[10px] text-gray-400 lowercase normal-case">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-3 text-gray-400">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                    </div>
                    <textarea
                      placeholder="E.g., custom metal combinations, specific diamond clarity grades, or alternative gemstone sizes..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 rounded-sm text-sm outline-none transition-all bg-white hover:border-gray-300 font-secondary min-h-[75px] max-h-[120px]"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 border border-gray-200 rounded-sm text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors uppercase tracking-wider font-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-primary-500 hover:bg-primary-400 text-white rounded-sm font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group uppercase tracking-widest font-secondary"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Quote
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>

      {success && (
        <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-sm text-xs text-green-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          <span>Inquiry successfully submitted — check your email for confirmation.</span>
        </div>
      )}
    </>
  );
}
