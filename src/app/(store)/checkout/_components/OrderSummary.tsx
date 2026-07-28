"use client";

import Link from "next/link";

import { CheckIcon, Loader2 } from "lucide-react";

import { useAccountStore } from "@/modules/account/store";
import { CartItem } from "@/modules/cart/types";
import { useCheckout } from "@/modules/checkout/hooks";
import { Button } from "@/shared/components/Button";
import { getCurrencySymbol, getItemLineTotal } from "@/shared/utils/money";

import { BankTransferDetails } from "./BankTransferDetails";
import { CartItemList } from "./CartItemList";
import { OrderTotals } from "./OrderTotals";
import { PaymentMethodSelector } from "./PaymentMethodSelector";

type OrderSummaryProps = {
  items: CartItem[];
  email: string;
  phone: string;
  billingAddress: Record<string, unknown>;
  disabled?: boolean;
  currency?: string;
  onPaymentSuccess: () => void;
};

export function OrderSummary({
  items,
  email,
  phone,
  billingAddress,
  disabled = false,
  currency = "USD",
  onPaymentSuccess,
}: OrderSummaryProps) {
  const { preferredCurrency } = useAccountStore();
  const displayCurrency = currency || preferredCurrency;

  const {
    isProcessing,
    paymentMethod,
    setPaymentMethod,
    paymentError,
    isConfirmed,
    isRedirecting,
    paystackLoaded,
    handlePaystackPayment,
    handleBankTransfer,
  } = useCheckout({
    items,
    email,
    phone,
    billingAddress,
    preferredCurrency: displayCurrency,
    onPaymentSuccess,
  });

  const subtotal = items.reduce((sum, item) => sum + getItemLineTotal(item), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const formattedPrice = (amount: number) => amount.toLocaleString();

  const handlePayNow = () => {
    if (paymentMethod === "paystack") {
      handlePaystackPayment();
    } else {
      handleBankTransfer();
    }
  };

  return (
    <>
      {isConfirmed ? (
        <form
          className="bg-white shadow p-4 sm:p-6 rounded-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-x-4 rounded-sm">
            <div className="flex-shrink-0 flex justify-center items-center bg-gradient-to-br from-green-200 to-emerald-200 rounded-full p-1 w-8 h-8">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-green-700 font-medium leading-relaxed mb-1 sm:mb-2">
                {paymentMethod === "paystack"
                  ? "Payment successful! Your order is confirmed."
                  : "Thank you! Your payment is being verified."}
              </p>
              <p className="text-green-600/90 text-sm font-normal">
                {paymentMethod === "paystack"
                  ? "You will be redirected to your orders shortly."
                  : "Our team will contact you within the next few minutes to confirm details."}
              </p>
            </div>
          </div>
        </form>
      ) : (
        <form
          className="bg-white shadow p-4 sm:p-6 rounded-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-xl font-semibold text-[#502B3A] mb-6">Order Summary</h2>

          <CartItemList items={items} currency={displayCurrency} />

          <OrderTotals subtotal={subtotal} totalItems={totalItems} currency={displayCurrency} />

          <PaymentMethodSelector selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

          {paymentMethod === "bank_transfer" && (
            <BankTransferDetails amount={subtotal} currency={displayCurrency} />
          )}

          {paymentError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{paymentError}</p>
            </div>
          )}

          <Button
            size="lg"
            className="w-full mt-2"
            onClick={handlePayNow}
            disabled={disabled || isProcessing || (paymentMethod === "paystack" && !paystackLoaded)}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : paymentMethod === "bank_transfer" ? (
              "I've completed the transfer"
            ) : paymentMethod === "paystack" && !paystackLoaded ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : (
              `Pay ${getCurrencySymbol(displayCurrency)}${formattedPrice(subtotal)}`
            )}
          </Button>

          <div className="mt-4 text-center text-sm text-[#502B3A]/70">
            or{" "}
            <Link href="/cart" className="font-medium text-[#502B3A] hover:text-[#D1A559]">
              Return to Cart
            </Link>
          </div>
        </form>
      )}

      {/* Loading Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-500 text-center px-4">
          <div className="relative flex flex-col items-center">
            <div className="mb-6 relative">
              <div className="h-16 w-16 border-4 border-[#D1A559]/20 border-t-[#D1A559] rounded-full animate-spin" />
              <CheckIcon className="absolute inset-0 m-auto h-6 w-6 text-[#D1A559] animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-[#502B3A] mb-2">Payment Confirmed</h2>
            <p className="text-[#502B3A]/70 max-w-xs animate-pulse">
              Please wait while we prepare your order and redirect you...
            </p>
            <div className="mt-8 flex gap-1 justify-center">
              <div
                className="w-1.5 h-1.5 bg-[#D1A559] rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="w-1.5 h-1.5 bg-[#D1A559] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-1.5 h-1.5 bg-[#D1A559] rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
