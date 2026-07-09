"use client";

import React, { useState, useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { CloseIcon } from "@/components/icons/close";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Product } from "@/lib/types/products";
import { API_URL } from "@/lib/utils/constants/api-url";
import { useAlertStore } from "@/lib/store/alert";
import { logger } from "@/lib/utils/logger";
import { useSession } from "next-auth/react";
import { useAccountStore } from "@/lib/store/account";
import { useAccountByEmail } from "@/lib/hooks/use-accounts";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variantImage?: string;
  amoraOptions?: {
    selectedLetters: string[];
    includeChain: boolean;
    calculatedPrice: number;
  };
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  product,
  variantImage,
  amoraOptions,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const addAlert = useAlertStore((state) => state.addAlert);
  const { data: session } = useSession();
  const { isHydrated, billingAddress: savedBillingAddress } = useAccountStore();
  const { data: dbAccount } = useAccountByEmail(session?.user?.email);
  const hasInitializedRef = useRef(false);

  const showAlert = (type: "success" | "error", message: string) => {
    addAlert({
      type,
      title: type === "success" ? "Success!" : "Something went wrong!",
      message,
      duration: type === "success" ? 5000 : 7000,
      dismissible: true,
    });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "email", // email | phone
    diamondType: "natural", // natural | lab | both
    currency: "USD", // USD | NGN
    priceRange: "",
    deliveryDate: "",
    modifications: "",
  });

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      document.body.style.overflow = "auto";
      hasInitializedRef.current = false;
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Autofill form data when the modal is opened
  useEffect(() => {
    if (isOpen && isHydrated && !hasInitializedRef.current && (session === undefined || dbAccount !== undefined)) {
      setFormData((prev) => {
        const email = session?.user?.email || savedBillingAddress?.email || prev.email;
        let firstName = savedBillingAddress?.firstName || prev.firstName;
        let lastName = savedBillingAddress?.lastName || prev.lastName;
        let phone = savedBillingAddress?.phone || prev.phone;

        if (dbAccount) {
          if (dbAccount.name) {
            const parts = dbAccount.name.trim().split(/\s+/);
            firstName = parts[0] || firstName;
            lastName = parts.slice(1).join(" ") || lastName;
          }
          phone = dbAccount.phone || phone;
        }

        hasInitializedRef.current = true;

        return {
          ...prev,
          email,
          phone,
          firstName,
          lastName,
        };
      });
    }
  }, [isOpen, isHydrated, session, dbAccount, savedBillingAddress]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { currency, ...submitData } = formData;
      const response = await fetch(`${API_URL}/contact/quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submitData,
          priceRange: formData.priceRange
            ? `${formData.currency === "USD" ? "$" : "₦"}${formData.priceRange}`
            : "",
          productName: product.name,
          productSku: product.variants[0]?.sku,
          productImageUrl: variantImage || product.images?.[0]?.url || "",
          amoraOptions: amoraOptions,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errMsg = errData?.message
          ? (Array.isArray(errData.message) ? errData.message.join(", ") : errData.message)
          : "Failed to submit quote request";
        throw new Error(errMsg);
      }

      showAlert("success", "Quote request sent successfully!");
      onClose();
    } catch (error) {
      logger.error("Error submitting quote request:", error);
      const message = error instanceof Error ? error.message : "Failed to send quote request. Please try again.";
      showAlert("error", message);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;
  if (!isMounted && !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] rounded-sm my-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            {/* Left Side - Image & Info */}
            <div className="w-full md:w-3/5 bg-gray-50 p-8 flex-col justify-center items-center border-r border-gray-100 hidden md:flex">
              <div className="relative w-full aspect-square max-w-[300px] mb-6">
                <Image
                  src={
                    variantImage || product.images[0]?.url || "/placeholder.png"
                  }
                  alt={product.name}
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-2/5 p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-primary text-[#502B3A] mb-3">
                  Customize Request
                </h2>
                <p className="text-[#502B3A]/80 text-sm leading-relaxed max-w-2xl">
                  The majority of our pieces are custom made from top to bottom.
                  We take great pride in unique and exquisite designs. We can
                  customize any piece to your specific taste as well. Please
                  fill out the form below and we will contact you right away
                  with a quote and time estimate. All items in our design
                  gallery can be custom made to the same specifications as well.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name *"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Last Name *"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  label="Email *"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Phone Number *"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <div className="space-y-6">
                  <div>
                    <label className="block font-primary font-medium text-sm sm:text-base text-[#502B3A] mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === "email"}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                        />
                        <span className="text-[#502B3A] text-sm font-medium">
                          Email
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={formData.contactMethod === "phone"}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                        />
                        <span className="text-[#502B3A] text-sm font-medium">
                          Phone
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-primary font-medium text-sm sm:text-base text-[#502B3A] mb-2">
                      Diamond Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="diamondType"
                          value="natural"
                          checked={formData.diamondType === "natural"}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                        />
                        <span className="text-[#502B3A] text-sm font-medium">
                          Natural Diamonds
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="diamondType"
                          value="lab"
                          checked={formData.diamondType === "lab"}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                        />
                        <span className="text-[#502B3A] text-sm font-medium">
                          Lab Grown Diamonds
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="diamondType"
                          value="both"
                          checked={formData.diamondType === "both"}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                        />
                        <span className="text-[#502B3A] text-sm font-medium">
                          Both
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block font-primary font-medium text-sm sm:text-base text-[#502B3A] mb-2">
                    Preferred Currency
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="currency"
                        value="USD"
                        checked={formData.currency === "USD"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                      />
                      <span className="text-[#502B3A] text-sm font-medium">
                        USD ($)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="currency"
                        value="NGN"
                        checked={formData.currency === "NGN"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#D1A559] focus:ring-[#D1A559] border-gray-300"
                      />
                      <span className="text-[#502B3A] text-sm font-medium">
                        Naira (₦)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <label className="block font-primary font-medium text-sm sm:text-base text-[#502B3A] mb-1 sm:mb-2">
                    Preferred Price Range
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {formData.currency === "USD" ? "$" : "₦"}
                    </span>
                    <input
                      type="text"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      className="rounded-sm block w-full py-3 pl-8 pr-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="block">
                  <label className="block font-primary font-medium text-sm sm:text-base text-[#502B3A] mb-1 sm:mb-2">
                    When Do You Want it Delivered?
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="rounded-sm block w-full py-3 px-3 sm:px-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base"
                  />
                </div>

                <div className="block">
                  <label className="block font-primary font-medium text-sm sm:text-base text-[#502B3A] mb-1 sm:mb-2">
                    How would you like to modify this item?
                  </label>
                  <textarea
                    name="modifications"
                    value={formData.modifications}
                    onChange={handleChange}
                    rows={4}
                    className="rounded-sm block w-full py-3 px-3 sm:px-4 bg-[#D1A55933]/20 focus:ring-1 focus:ring-[#D1A559] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="text-xs text-[#502B3A]/60 leading-relaxed">
                  Please note that this communication may be monitored or
                  recorded by us or our service providers. By selecting
                  &quot;Send Message&quot; you agree to our{" "}
                  <a href="/terms-and-conditions" className="underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-black text-white hover:bg-gray-800"
                  loading={loading}
                  disabled={loading}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
