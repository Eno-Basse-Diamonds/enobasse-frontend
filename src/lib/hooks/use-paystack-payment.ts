import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata?: any;
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

  const initializePayment = (options: PaystackOptions) => {
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

      const safeOptions = {
        ...options,
        onClose: () => {
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
      };

      paystack.newTransaction(safeOptions);
    } catch (error) {
      isInitializingRef.current = false;
      document.body.style.overflow = "auto";
      throw error;
    }
  };

  return {
    paystackLoaded,
    initializePayment,
    isInitializing: isInitializingRef.current,
  };
}
