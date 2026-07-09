import { useState, useRef } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useSession } from "next-auth/react";
import { useOrdersStore } from "@/lib/store/orders";
import { trackPurchase } from "@/lib/analytics/gtag";
import { usePaystackPayment } from "./use-paystack-payment";
import { logger } from "@/lib/utils/logger";
import { getItemLineTotal } from "@/lib/utils/money";
import {
  initializePaystackOrder,
  getOrderPaymentStatus,
} from "@/lib/api/orders";

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

  /** Prevents duplicate handling if Paystack fires onSuccess more than once. */
  const hasProcessedPaymentRef = useRef(false);

  const { clear: clearCart } = useCartStore();
  const { data: session } = useSession();
  const { createOrder: persistOrder, addOrder, updateOrderState } = useOrdersStore();
  const { paystackLoaded, resumeTransaction } = usePaystackPayment();

  const subtotal = items.reduce((sum, item) => sum + getItemLineTotal(item), 0);

  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `ENO-${timestamp}-${randomPart}`.toUpperCase();
  };

  const buildOrderItems = () =>
    items.map((item) => ({
      productVariant: item.productVariant,
      productSlug: item.productSlug,
      productCategory: item.productCategory,
      quantity: item.quantity,
      size: item.size,
      engraving: item.engraving,
      amoraOptions: item.amoraOptions,
    }));

  /**
   * Polls the order's payment status after the Paystack popup reports
   * success. The popup callback firing isn't proof the payment is real —
   * only the backend's signature-verified webhook (plus its own
   * amount/currency check against Paystack) can confirm that. This makes the
   * UI reflect actual backend state instead of trusting the client callback.
   */
  const pollOrderStatus = async (
    orderId: string,
    { intervalMs = 2000, timeoutMs = 20000 } = {},
  ): Promise<{ status: string; paymentStatus: string } | null> => {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      try {
        const result = await getOrderPaymentStatus(orderId);
        if (result.paymentStatus !== "pending") {
          return result;
        }
      } catch (err) {
        logger.error("Failed to poll order payment status:", err);
      }
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }

    return null;
  };

  const handlePaymentConfirmed = async (orderId: string, reference: string) => {
    clearCart(session?.user?.email || undefined);
    trackPurchase(reference, items, preferredCurrency, "paystack");

    const result = await pollOrderStatus(orderId);

    if (result?.paymentStatus === "paid") {
      updateOrderState(orderId, "confirmed", "paid");
      setIsConfirmed(true);
      setIsProcessing(false);
      document.body.style.overflow = "auto";
      setIsRedirecting(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 3000);
    } else {
      setIsProcessing(false);
      document.body.style.overflow = "auto";
      setPaymentError(
        "Payment received — confirming with our system. If this doesn't update shortly, contact support with reference: " +
          reference,
      );
    }
  };

  const handlePaystackPayment = async () => {
    if (isProcessing) return;

    if (!email) {
      setPaymentError("Email is required for payment");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    hasProcessedPaymentRef.current = false;

    try {
      const { order, accessCode, reference } = await initializePaystackOrder({
        items: buildOrderItems(),
        total: subtotal,
        billingAddress: billingAddress as any,
        accountEmail: session?.user?.email || undefined,
        customerInfo: {
          name: `${(billingAddress as any).firstName} ${(billingAddress as any).lastName}`,
          email: email || "",
          phone: phone || "",
        },
        currency: preferredCurrency,
      });

      addOrder(order);

      resumeTransaction({
        accessCode,
        onClose: () => {
          setIsProcessing(false);
          document.body.style.overflow = "auto";
        },
        onSuccess: () => {
          if (hasProcessedPaymentRef.current) return;
          hasProcessedPaymentRef.current = true;
          handlePaymentConfirmed(order.id, reference);
        },
        onError: () => {
          setIsProcessing(false);
          setPaymentError("Payment failed. Please try again.");
          document.body.style.overflow = "auto";
        },
      });
    } catch (error) {
      logger.error("Failed to initialize Paystack payment:", error);
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
    const reference = generateReference();

    try {
      await persistOrder({
        items: buildOrderItems(),
        total: subtotal,
        billingAddress: billingAddress as any,
        accountEmail: session?.user?.email || undefined,
        customerInfo: {
          name: `${(billingAddress as any).firstName} ${(billingAddress as any).lastName}`,
          email: email || "",
          phone: phone || "",
        },
        currency: preferredCurrency,
        paymentMethod: "bank_transfer",
        // paymentStatus is intentionally omitted — server always starts as PENDING
        paymentReference: reference,
      });

      clearCart(session?.user?.email || undefined);
      setIsConfirmed(true);
      setIsProcessing(false);

      // Longer delay to show the bank-transfer instructions message
      setTimeout(() => {
        onPaymentSuccess();
      }, 6000);
    } catch (err) {
      logger.error("Bank transfer order creation failed:", err);
      setPaymentError("Failed to create order. Please try again.");
      setIsProcessing(false);
    }
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
