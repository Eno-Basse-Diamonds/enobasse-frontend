import { useState, useEffect, useRef } from "react";

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

export function usePaystackPayment() {
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const isInitializingRef = useRef(false);

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

  /**
   * Resumes a transaction that was already initialized server-side (via
   * Paystack's Initialize Transaction API), using the resulting accessCode.
   * The amount/currency were fixed server-side at initialize time, so
   * there's nothing for the popup to accept from the client here.
   *
   * Note: Paystack's `resumeTransaction` only forwards onSuccess/onCancel/
   * onLoad/onError to the underlying transaction — NOT onClose — so a
   * closed-without-completing popup surfaces via `onCancel`, mapped to our
   * `onClose` callback for API-shape consistency with the old flow.
   */
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

      // Lock scroll
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
