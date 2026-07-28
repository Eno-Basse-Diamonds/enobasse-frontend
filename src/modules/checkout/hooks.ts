import { useSession } from "next-auth/react";
import {
  useEffect,
  useRef,
  useRef as useRefPaystack,
  useState,
  useState as useStatePaystack,
} from "react";

import { useCartStore } from "@/modules/cart/store";
import { getOrderPaymentStatus, initializePaystackOrder } from "@/modules/orders/api";
import { useOrdersStore } from "@/modules/orders/store";
import { trackPurchase } from "@/shared/analytics/gtag";
import { logger } from "@/shared/utils/logger";
import { getItemLineTotal } from "@/shared/utils/money";

export type PaymentMethodType = "paystack" | "bank_transfer";

interface UseCheckoutProps {
  items: any[];
  email: string;
  phone: string;
  billingAddress: Record<string, unknown>;
  preferredCurrency: string;
  onPaymentSuccess: () => void;
}

/**
 * Orchestrates the checkout flow.
 *
 * @description Orchestrates the full checkout flow including Paystack and
 * bank transfer payments.
 * @param props.items - Cart items
 * @param props.email - Customer email
 * @param props.phone - Customer phone
 * @param props.billingAddress - Billing address data
 * @param props.preferredCurrency - Preferred currency code
 * @param props.onPaymentSuccess - Callback on successful payment
 * @returns Checkout state and handlers
 */
export function useCheckout({
  items,
  email,
  phone,
  billingAddress,
  preferredCurrency,
  onPaymentSuccess,
}: UseCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("paystack");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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
        error instanceof Error ? error.message : "Failed to initialize payment. Please try again.",
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
        paymentReference: reference,
      });

      clearCart(session?.user?.email || undefined);
      setIsConfirmed(true);
      setIsProcessing(false);

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

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface ResumeTransactionOptions {
  accessCode: string;
  onClose: () => void;
  onSuccess: (transaction: any) => void;
  onError?: (error: any) => void;
}

/**
 * Loads and manages Paystack payments.
 *
 * @description Loads the Paystack inline script and provides a
 * resumeTransaction helper.
 * @returns Paystack loaded state and resume function
 */
export function usePaystackPayment() {
  const [paystackLoaded, setPaystackLoaded] = useStatePaystack(false);
  const isInitializingRef = useRefPaystack(false);

  useEffect(() => {
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

  const resumeTransaction = (options: ResumeTransactionOptions) => {
    if (!paystackLoaded || !window.PaystackPop) {
      throw new Error("Payment system not ready. Please wait and try again.");
    }

    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    try {
      const paystack = new window.PaystackPop();

      const originalOnClose = options.onClose;
      const originalOnSuccess = options.onSuccess;
      const originalOnError = options.onError;

      document.body.style.overflow = "hidden";

      paystack.resumeTransaction(options.accessCode, {
        onCancel: () => {
          isInitializingRef.current = false;
          document.body.style.overflow = "auto";
          originalOnClose();
        },
        onSuccess: (transaction: any) => {
          isInitializingRef.current = false;
          document.body.style.overflow = "auto";
          originalOnSuccess(transaction);
        },
        onError: (error: any) => {
          isInitializingRef.current = false;
          document.body.style.overflow = "auto";
          if (originalOnError) originalOnError(error);
        },
      });
    } catch (error) {
      isInitializingRef.current = false;
      document.body.style.overflow = "auto";
      throw error;
    }
  };

  return {
    paystackLoaded,
    resumeTransaction,
    isInitializing: isInitializingRef.current,
  };
}
