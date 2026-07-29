"use client";

import Image from "next/image";
import { useState } from "react";

import { Check, Copy, Globe } from "lucide-react";

import { getCurrencySymbol } from "@/shared/utils/money";

interface BankTransferDetailsProps {
  amount: number;
  currency: string;
  paymentReference: string;
}

const ACCOUNT_NAME = "Eno Bassé Jewellery";
const NGN_ACCOUNT = "0638724267";
const USD_ACCOUNT = "0670021982";
const ZELLE_EMAIL = "bob.eyakeno@yahoo.com";

export function BankTransferDetails({ amount, currency, paymentReference }: BankTransferDetailsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const formattedPrice = (val: number) =>
    typeof val === "number" && !isNaN(val) ? val.toLocaleString() : "0";

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="mb-6 rounded-sm border border-[#D1A559]/30 bg-[#502B3A]/5 p-4 sm:p-5">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D1A559]/20 pb-3">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#502B3A] uppercase">
            Bank Transfer Payment Instructions
          </span>
          <h4 className="text-base font-bold text-gray-900 mt-0.5">
            Transfer {getCurrencySymbol(currency)}
            {formattedPrice(amount)} to:
          </h4>
        </div>
        <span className="self-start sm:self-auto rounded bg-[#D1A559]/20 px-2 py-1 text-xs font-semibold text-[#502B3A]">
          Direct Wire / Zelle
        </span>
      </div>

      <div className="space-y-3">
        <div className="relative rounded-sm border border-gray-200 bg-white p-3.5 transition-all hover:border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
                  alt="GT Bank"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                GT Bank <span className="text-xs text-gray-500 font-normal">(NGN)</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded bg-gray-50 px-4 py-2 border border-gray-100">
            <div>
              <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                Account Number
              </span>
              <span className="font-mono text-base font-bold text-[#502B3A] tracking-wider">
                {NGN_ACCOUNT}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(NGN_ACCOUNT, "ngn")}
              className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-xs border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {copiedKey === "ngn" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-gray-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Account Name: <span className="font-medium text-gray-800">{ACCOUNT_NAME}</span>
          </p>
        </div>

        <div className="relative rounded-sm border border-gray-200 bg-white p-3.5 transition-all hover:border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
                  alt="GT Bank"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                GT Bank <span className="text-xs text-gray-500 font-normal">(USD)</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded bg-gray-50 px-4 py-2 border border-gray-100">
            <div>
              <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                Account Number
              </span>
              <span className="font-mono text-base font-bold text-[#502B3A] tracking-wider">
                {USD_ACCOUNT}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(USD_ACCOUNT, "usd")}
              className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-xs border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {copiedKey === "usd" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-gray-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Account Name: <span className="font-medium text-gray-800">{ACCOUNT_NAME}</span>
          </p>
        </div>

        <div className="relative rounded-sm border border-gray-200 bg-white p-3.5 transition-all hover:border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-100 text-purple-700">
                <Globe className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                International Account{" "}
                <span className="text-xs text-gray-500 font-normal">(Zelle)</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded bg-gray-50 px-4 py-2 border border-gray-100">
            <div>
              <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                Zelle Email
              </span>
              <span className="font-mono text-sm font-bold text-[#502B3A] tracking-wide">
                {ZELLE_EMAIL}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(ZELLE_EMAIL, "zelle")}
              className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-xs border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {copiedKey === "zelle" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-gray-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Account Name: <span className="font-medium text-gray-800">{ACCOUNT_NAME}</span>
          </p>
        </div>
      </div>

      {paymentReference && (
        <div className="mt-4 rounded-sm border border-[#D1A559]/40 bg-[#D1A559]/10 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[10px] text-[#502B3A] uppercase tracking-wider font-semibold">
                Your Order Reference
              </span>
              <span className="font-mono text-sm font-bold text-[#502B3A] tracking-wide">
                {paymentReference}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(paymentReference, "ref")}
              className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-xs border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {copiedKey === "ref" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-gray-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <p className="mt-3 text-[11px] text-gray-500 leading-relaxed italic">
        * Please include your full name and the order reference above in the payment
        description/memo when transferring.
      </p>
    </div>
  );
}
