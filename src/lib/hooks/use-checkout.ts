import { useState, useRef } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useOrdersStore } from "@/lib/store/orders";
import { createOrder } from "@/lib/api/orders";
import { convertCurrency } from "@/lib/api/exchange-rate";
import { trackPurchase } from "@/lib/analytics/gtag";
import { usePaystackPayment } from "./use-paystack-payment";
import { logger } from "@/lib/utils/logger";

export type PaymentMethodType = "paystack" | "bank_transfer";

interface UseCheckoutProps {
  items: any[];
  email: string;
  phone: string;
  billingAddress: Record<string, unknown>;
  preferredCurrency: string;
  onPaymentSuccess: () => void;
}

export function useCheckout({
  items,
  email,
  phone,
  billingAddress,
  preferredCurrency,
  onPaymentSuccess,
}: UseCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("paystack");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Refs for race condition prevention
  const orderProcessedRef = useRef<string | null>(null);
  const hasProcessedPaymentRef = useRef(false);

  const { clear: clearCart } = useCartStore();
  const { data: session } = useSession();
  const { createOrder: persistOrder } = useOrdersStore();
  const { paystackLoaded, initializePayment } = usePaystackPayment();

  const subtotal = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
  );

  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `ENO-${timestamp}-${randomPart}`.toUpperCase();
  };

  const handleOrderCreation = async (
    reference: string,
    source: string,
    method: PaymentMethodType,
    status: "paid" | "pending",
  ) => {
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

      await persistOrder({
        items: orderItems,
        total: subtotal,
        billingAddress: billingAddress as any,
        accountEmail: session?.user?.email || undefined,
        customerInfo: {
          name: `${(billingAddress as any).firstName} ${(billingAddress as any).lastName}`,
          email: email || "",
          phone: phone || "",
        },
        currency: preferredCurrency,
        paymentMethod: method,
        paymentStatus: status,
        paymentReference: reference,
      });

      clearCart(session?.user?.email || undefined);

      if (method === "paystack") {
        trackPurchase(reference, items, preferredCurrency, "paystack");
      }

      setIsConfirmed(true);
      setIsProcessing(false);

      if (status === "paid") {
        document.body.style.overflow = "auto";
        setIsRedirecting(true);
        // Delay for UI feedback before final redirect/callback
        setTimeout(() => {
          onPaymentSuccess();
        }, 3000);
      } else {
        // Bank transfer confirmation delay
        setTimeout(() => {
          onPaymentSuccess();
        }, 6000);
      }
    } catch (err) {
      logger.error(`Order creation failed after payment (${source}):`, err);

      // Reset blocking refs to allow retry
      orderProcessedRef.current = null;
      hasProcessedPaymentRef.current = false;

      setIsRedirecting(false);
      setPaymentError(
        method === "paystack"
          ? "Payment successful but failed to create order. Please contact support."
          : "Failed to create order. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (transaction: any, source: string) => {
    if (hasProcessedPaymentRef.current) return;
    hasProcessedPaymentRef.current = true;

    const reference = transaction?.reference || transaction?.ref || "unknown";

    if (orderProcessedRef.current === reference) return;
    orderProcessedRef.current = reference;

    await handleOrderCreation(reference, source, "paystack", "paid");
  };

  const handlePaystackPayment = async () => {
    if (isProcessing) return;

    if (!email) {
      setPaymentError("Email is required for payment");
      return;
    }

    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!paystackPublicKey) {
      setPaymentError("Payment configuration error. Please contact support.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      let paymentAmount = subtotal;
      if (preferredCurrency === "USD" || !preferredCurrency) {
        paymentAmount = await convertCurrency(subtotal, "USD", "NGN");
      }

      const amountInKobo = Math.round(paymentAmount * 100);

      initializePayment({
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
        },
        onSuccess: (transaction: any) => {
          handlePaymentSuccess(transaction, "onSuccess");
        },
        onError: () => {
          setIsProcessing(false);
          setPaymentError("Payment failed. Please try again.");
          document.body.style.overflow = "auto";
        },
      });
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Failed to initialize payment. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  const handleBankTransfer = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    const reference = generateReference(); // Or leave empty for backend to generate
    await handleOrderCreation(
      reference,
      "bank_transfer",
      "bank_transfer",
      "pending",
    );
  };

  return {
    isProcessing,
    paymentMethod,
    setPaymentMethod,
    paymentError,
    isConfirmed,
    isRedirecting,
    paystackLoaded,
    handlePaystackPayment,
    handleBankTransfer,
  };
}
