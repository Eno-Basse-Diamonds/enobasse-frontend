"use client";

import { CreditCard, Building2 } from "lucide-react";

export type PaymentMethodType = "paystack" | "bank_transfer";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onMethodChange: (method: PaymentMethodType) => void;
}

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onMethodChange("paystack")}
          className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedMethod === "paystack"
              ? "border-[#D1A559] bg-[#D1A559]/5 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              selectedMethod === "paystack" ? "bg-[#D1A559]/20" : "bg-gray-100"
            }`}
          >
            <CreditCard
              className={`w-5 h-5 ${
                selectedMethod === "paystack"
                  ? "text-[#D1A559]"
                  : "text-gray-500"
              }`}
            />
          </div>
          <span
            className={`text-sm font-medium ${
              selectedMethod === "paystack" ? "text-[#502B3A]" : "text-gray-600"
            }`}
          >
            Pay with Card
          </span>
          <span className="text-xs text-gray-400 mt-1">
            Visa, Mastercard, etc.
          </span>
          {selectedMethod === "paystack" && (
            <div className="absolute top-2 right-2 w-4 h-4 bg-[#D1A559] rounded-full flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onMethodChange("bank_transfer")}
          className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedMethod === "bank_transfer"
              ? "border-[#D1A559] bg-[#D1A559]/5 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              selectedMethod === "bank_transfer"
                ? "bg-[#D1A559]/20"
                : "bg-gray-100"
            }`}
          >
            <Building2
              className={`w-5 h-5 ${
                selectedMethod === "bank_transfer"
                  ? "text-[#D1A559]"
                  : "text-gray-500"
              }`}
            />
          </div>
          <span
            className={`text-sm font-medium ${
              selectedMethod === "bank_transfer"
                ? "text-[#502B3A]"
                : "text-gray-600"
            }`}
          >
            Bank Transfer
          </span>
          <span className="text-xs text-gray-400 mt-1">Manual transfer</span>
          {selectedMethod === "bank_transfer" && (
            <div className="absolute top-2 right-2 w-4 h-4 bg-[#D1A559] rounded-full flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
