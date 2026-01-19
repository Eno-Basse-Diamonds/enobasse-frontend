"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckoutCartItem } from "./checkout-cart-item";
import { CartItem } from "@/lib/types/carts";
import { getCurrencySymbol } from "@/lib/utils/money";
import { ringSizes } from "@/lib/utils/constants/ring-sizes";
import { useAccountStore } from "@/lib/store/account";
import { createOrder } from "@/lib/api/orders";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { Button } from "@/components/button";
import { Building2, Loader2, CheckIcon, Wallet } from "lucide-react";
import { convertCurrency } from "@/lib/api/exchange-rate";
import { useAlertStore } from "@/lib/store/alert";
import { trackPurchase } from "@/lib/analytics/gtag";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

type PaymentMethodType = "paystack" | "bank_transfer";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("paystack");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const orderProcessedRef = useRef<string | null>(null);
  const hasProcessedPaymentRef = useRef(false);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    // Load Paystack script manually to avoid Next.js Script hoisting issues
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const { preferredCurrency } = useAccountStore();

  const { clear: clearCart } = useCartStore();
  const { data: session } = useSession();

  const displayCurrency = currency || preferredCurrency;
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const subtotal = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const formattedPrice = (amount: number) => {
    return amount.toLocaleString();
  };

  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `ENO-${timestamp}-${randomPart}`.toUpperCase();
  };

  const handlePaymentSuccess = async (transaction: any, source: string) => {
    // First check: simple boolean to catch rapid duplicate calls
    if (hasProcessedPaymentRef.current) {
      console.log(
        `Payment already processed. Ignoring duplicate callback from ${source}.`,
      );
      return;
    }
    hasProcessedPaymentRef.current = true;

    const reference = transaction?.reference || transaction?.ref || "unknown";

    // Second check: transaction reference to catch component remounts
    if (orderProcessedRef.current === reference) {
      console.log(
        `Order for reference ${reference} already processed (source: ${source}). Skipping.`,
      );
      return;
    }

    // Mark as processed immediately to prevent race conditions
    orderProcessedRef.current = reference;
    console.log(
      `Processing successful payment from ${source} for reference: ${reference}`,
    );

    document.body.style.overflow = "auto";
    setIsRedirecting(true);

    try {
      const orderItems = items.map((item) => ({
        productVariant: item.productVariant,
        productSlug: item.productSlug,
        productCategory: item.productCategory,
        quantity: item.quantity,
        size: item.size,
        engraving: item.engraving,
        price: item.productVariant.price,
        currency: item.productVariant.currency,
      }));

      await createOrder({
        items: orderItems,
        total: subtotal,
        billingAddress: billingAddress as any,
        accountEmail: session?.user?.email || undefined,
        customerInfo: { email: email || "", phone: phone || "" },
        currency: preferredCurrency,
        paymentMethod: "paystack",
        paymentStatus: "paid",
        paymentReference: reference,
      });

      clearCart(session?.user?.email || undefined);

      trackPurchase(reference, items, preferredCurrency, "paystack");

      setIsConfirmed(true);
      setIsProcessing(false);

      setTimeout(() => {
        onPaymentSuccess();
      }, 3000);
    } catch (err) {
      console.error(`Order creation failed after payment (${source}):`, err);
      // If we failed to create the order, we might want to allow a retry or
      // handle it specifically. For now, we clear the ref so a retry (if
      // triggered by another callback) could potentially work
      orderProcessedRef.current = null;

      setIsRedirecting(false);
      setPaymentError(
        "Payment successful but failed to create order. Please contact support.",
      );
      setIsProcessing(false);
    }
  };

  const handlePaystackPayment = async () => {
    if (isProcessing || isInitializingRef.current) return;
    if (!email) {
      setPaymentError("Email is required for payment");
      return;
    }

    if (!paystackLoaded || !window.PaystackPop) {
      setPaymentError("Payment system not ready. Please wait and try again.");
      return;
    }

    if (!paystackPublicKey) {
      console.error(
        "Paystack Public Key is missing! Ensure NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is set in your .env and the project is rebuilt.",
      );
      setPaymentError(
        process.env.NODE_ENV === "development"
          ? "Paystack Public Key is missing. Check your environment configuration."
          : "Payment not configured correctly. Please contact support.",
      );
      return;
    }

    // Lock immediately to prevent double clicks
    isInitializingRef.current = true;
    setIsProcessing(true);
    setPaymentError(null);

    try {
      let paymentAmount = subtotal;
      if (preferredCurrency === "USD" || !preferredCurrency) {
        paymentAmount = await convertCurrency(subtotal, "USD", "NGN");
      }

      const amountInKobo = Math.round(paymentAmount * 100);

      const paystackOptions = {
        key: paystackPublicKey,
        email: email,
        amount: amountInKobo,
        currency: "NGN",
        ref: generateReference(),
        metadata: {
          items: items.map((item: any) => ({
            name: item.productVariant?.name || item.productSlug,
            quantity: item.quantity,
          })),
          phone,
          billingAddress,
          originalAmount: subtotal,
          originalCurrency: preferredCurrency || "USD",
        },
        onClose: () => {
          document.body.style.overflow = "auto";
          setIsProcessing(false);
          isInitializingRef.current = false;
        },
        onSuccess: (transaction: any) => {
          handlePaymentSuccess(transaction, "onSuccess");
        },
        onError: (error: any) => {
          setIsProcessing(false);
          isInitializingRef.current = false;
          setPaymentError("Payment failed. Please try again.");
          document.body.style.overflow = "auto";
        },
      };

      // Handle v1 or v2
      if (typeof window.PaystackPop.setup === "function") {
        // v1 implementation
        const handler = window.PaystackPop.setup(paystackOptions);
        document.body.style.overflow = "hidden";
        handler.openIframe();
      } else {
        // v2 implementation
        const paystack = new window.PaystackPop();
        document.body.style.overflow = "hidden";
        paystack.newTransaction(paystackOptions);
      }
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Failed to initialize payment. Please try again.",
      );
      setIsProcessing(false);
      isInitializingRef.current = false;
    }
  };

  const handleBankTransferConfirm = async () => {
    setIsProcessing(true);

    try {
      const orderItems = items.map((item) => ({
        productVariant: item.productVariant,
        productSlug: item.productSlug,
        productCategory: item.productCategory,
        quantity: item.quantity,
        size: item.size,
        engraving: item.engraving,
        price: item.productVariant.price,
        currency: item.productVariant.currency,
      }));

      await createOrder({
        items: orderItems,
        total: subtotal,
        billingAddress: billingAddress as any,
        accountEmail: session?.user?.email || undefined,
        customerInfo: { email: email || "", phone: phone || "" },
        currency: preferredCurrency,
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
      });

      clearCart(session?.user?.email || undefined);

      setIsConfirmed(true);
      setIsProcessing(false);
      setTimeout(() => {
        onPaymentSuccess();
      }, 6000);
    } catch (error) {
      setPaymentError("Failed to create order. Please try again.");
      setIsProcessing(false);
    }
  };

  const addAlert = useAlertStore((state) => state.addAlert);

  const handlePayNow = () => {
    if (!session) {
      addAlert({
        type: "error",
        title: "Login Required",
        message:
          "Please sign in or create an account to complete your purchase.",
        duration: 7000,
        dismissible: true,
      });
      return;
    }

    if (paymentMethod === "paystack") {
      handlePaystackPayment();
    } else {
      setShowBankDetails(true);
    }
  };

  return (
    <>
      {isConfirmed ? (
        <form
          className="bg-white shadow p-6 rounded-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/60 p-6 flex flex-row gap-x-4 rounded-sm">
            <div className="flex justify-center items-center bg-gradient-to-br from-green-200 to-emerald-200 rounded-full p-1 w-6 h-6 md:w-8 md:h-8">
              <CheckIcon className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-green-700 font-medium leading-relaxed mb-2">
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
          className="bg-white shadow p-6 rounded-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-xl font-semibold text-[#502B3A] mb-6">
            Order Summary
          </h2>

          <div className="mb-6">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <CheckoutCartItem
                  key={item.id}
                  item={item}
                  ringSizes={ringSizes}
                  currency={displayCurrency}
                />
              ))}
            </ul>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-sm text-[#502B3A]">
                Subtotal ({totalItems} items)
              </span>
              <span className="text-sm font-medium text-[#502B3A]">
                {getCurrencySymbol(displayCurrency)}
                {formattedPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#502B3A]">Shipping</span>
              <span className="text-sm font-medium text-[#502B3A]">N/A</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span className="text-base font-medium text-[#502B3A]">
                Total
              </span>
              <span className="text-base font-bold text-[#502B3A]">
                {getCurrencySymbol(displayCurrency)}
                {formattedPrice(subtotal)}
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mt-6 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("paystack");
                  setShowBankDetails(false);
                }}
                disabled={isProcessing}
                className={`relative flex flex-col items-center justify-center p-3 rounded-sm border-2 transition-all duration-200 ${
                  paymentMethod === "paystack"
                    ? "border-[#D1A559] bg-[#D1A559]/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Wallet
                  className={`w-5 h-5 mb-1 ${
                    paymentMethod === "paystack"
                      ? "text-[#D1A559]"
                      : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    paymentMethod === "paystack"
                      ? "text-[#502B3A]"
                      : "text-gray-600"
                  }`}
                >
                  Paystack
                </span>
                {paymentMethod === "paystack" && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-[#D1A559] rounded-full flex items-center justify-center">
                    <svg
                      className="w-2 h-2 text-white"
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
                onClick={() => setPaymentMethod("bank_transfer")}
                disabled={isProcessing}
                className={`relative flex flex-col items-center justify-center p-3 rounded-sm border-2 transition-all duration-200 ${
                  paymentMethod === "bank_transfer"
                    ? "border-[#D1A559] bg-[#D1A559]/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Building2
                  className={`w-5 h-5 mb-1 ${
                    paymentMethod === "bank_transfer"
                      ? "text-[#D1A559]"
                      : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    paymentMethod === "bank_transfer"
                      ? "text-[#502B3A]"
                      : "text-gray-600"
                  }`}
                >
                  Manual Transfer
                </span>
                {paymentMethod === "bank_transfer" && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-[#D1A559] rounded-full flex items-center justify-center">
                    <svg
                      className="w-2 h-2 text-white"
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

          {/* Bank Transfer Details */}
          {showBankDetails && paymentMethod === "bank_transfer" && (
            <div className="mb-4 space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                Transfer {getCurrencySymbol(displayCurrency)}
                {formattedPrice(subtotal)} to:
              </p>

              <div className="border border-gray-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 relative">
                    <Image
                      src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
                      alt="GT Bank"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold text-sm">GT Bank (NGN)</span>
                </div>
                <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                  0638724267
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Eno Bassé Jewellery
                </p>
              </div>

              <div className="border border-gray-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 relative">
                    <Image
                      src="https://res.cloudinary.com/enobasse/image/upload/v1756511213/gtbank_ttbzya.png"
                      alt="GT Bank"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold text-sm">GT Bank (USD)</span>
                </div>
                <p className="font-mono text-sm bg-gray-50 p-2 rounded">
                  0670021982
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Eno Bassé Jewellery
                </p>
              </div>
            </div>
          )}

          {paymentError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{paymentError}</p>
            </div>
          )}

          <Button
            size="lg"
            className="w-full mt-2"
            onClick={showBankDetails ? handleBankTransferConfirm : handlePayNow}
            disabled={
              disabled ||
              isProcessing ||
              (paymentMethod === "paystack" && !paystackLoaded)
            }
          >
            {isProcessing ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : showBankDetails ? (
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
            <Link
              href="/cart"
              className="font-medium text-[#502B3A] hover:text-[#D1A559]"
            >
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
            <h2 className="text-2xl font-bold text-[#502B3A] mb-2">
              Payment Confirmed
            </h2>
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
