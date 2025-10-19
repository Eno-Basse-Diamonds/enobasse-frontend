"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useOrdersStore } from "@/lib/store/orders";
import { getCurrencySymbol } from "@/lib/utils/money";
import { useAccountStore } from "@/lib/store/account";
import { useSession } from "next-auth/react";
import { Button } from "@/components/button";
import { CloseIcon } from "@/components/icons/close";
import { CheckIcon } from "lucide-react";

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
  amount: number;
  currencySymbol: string;
  items: any;
  billingAddress?: Record<string, unknown>;
  email?: string;
  phone?: string;
}

export const PaymentConfirmationModal: React.FC<
  PaymentConfirmationModalProps
> = ({
  isOpen,
  onClose,
  onPaymentConfirmed,
  amount,
  currencySymbol,
  items,
  billingAddress,
  email,
  phone,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { createOrder } = useOrdersStore();
  const { preferredCurrency } = useAccountStore();
  const { data: session } = useSession();

  const displayCurrencySymbol =
    currencySymbol || getCurrencySymbol(preferredCurrency);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsProcessing(true);

    try {
      await createOrder({
        items: items,
        total: amount,
        billingAddress: billingAddress as any,
        accountEmail: session?.user?.email || undefined,
        customerInfo: { email: email || "", phone: phone || "" },
        currency: preferredCurrency,
      });

      setIsConfirmed(true);
      setTimeout(() => {
        onPaymentConfirmed();
      }, 6000);
    } catch (error) {
      alert("Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-5xl w-full p-6 md:p-8 relative overflow-y-auto rounded-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-primary">
            Pay {displayCurrencySymbol}
            {amount.toLocaleString()}
          </h2>
          <p className="text-gray-600">
            Please transfer the payment to one of our bank accounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* GT Bank NGN */}
          <div className="border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
                  alt="GT Bank"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold">GT Bank</span>
              <div className="w-6 h-6 relative">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511302/ngn_zgy73q.webp"
                  alt="NGN"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-lg font-mono bg-gray-50 p-2 rounded-sm">
              0638724267
            </p>
            <p className="text-sm text-gray-600 mt-1">Eno Bassé Jewellery</p>
          </div>

          {/* GT Bank USD */}
          <div className="border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
                  alt="GT Bank"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold">GT Bank</span>
              <div className="w-6 h-6 relative">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511303/usd_cvttar.png"
                  alt="USD"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-lg font-mono bg-gray-50 p-2 rounded-sm">
              0670021982
            </p>
            <p className="text-sm text-gray-600 mt-1">Eno Bassé Jewellery</p>
          </div>

          {/* Zelle International */}
          <div className="border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="https://res.cloudinary.com/enobasse/image/upload/v1756511215/zelle_z2wzsv.png"
                  alt="Zelle"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold">
                Zelle (International Account)
              </span>
            </div>
            <p className="text-lg font-mono bg-gray-50 p-2 rounded-sm">
              bob.eyakeno@yahoo.com
            </p>
            <p className="text-sm text-gray-600 mt-1">Eno Bassé Jewellery</p>
          </div>
        </div>

        {!isConfirmed ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Have you completed the transfer?
            </p>
            <Button
              size="lg"
              onClick={handleConfirm}
              disabled={isProcessing}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              {isProcessing
                ? "Processing..."
                : "Yes, I've transferred the money"}
            </Button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 p-6 flex flex-row w-fit mx-auto gap-x-4 rounded-sm">
            <div className="flex justify-center items-center bg-gradient-to-br from-green-200 to-emerald-200 rounded-full p-1 w-6 h-6 md:p-auto md:w-8 md:h-8">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-green-700 font-medium leading-relaxed mb-2">
                Thank you! Your payment is being verified.
              </p>
              <p className="text-green-600/90 text-sm font-normal">
                Our team will contact you within the next few minutes to confirm
                details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
