/**
 * Google Analytics 4 (GA4) Ecommerce Tracking Utilities
 *
 * This module provides functions for tracking ecommerce events in GA4.
 * Events follow the recommended GA4 ecommerce event schema.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

import { CartItem } from "../types/carts";
import { ProductVariant } from "../types/products";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Helper to check if GA is loaded
 */
const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Track page views (useful for SPA navigation)
 */
export const pageview = (url: string) => {
  if (!isGALoaded() || !GA_MEASUREMENT_ID) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Generic event tracking
 */
export const event = (action: string, params?: Record<string, any>) => {
  if (!isGALoaded()) return;

  window.gtag("event", action, params);
};

// ============================================
// ECOMMERCE EVENTS
// ============================================

interface GAItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
  currency?: string;
  item_variant?: string;
}

/**
 * Convert CartItem to GA4 item format
 */
const toGAItem = (item: CartItem, currency: string = "USD"): GAItem => ({
  item_id: String(item.productVariant.id),
  item_name: item.productVariant.title || item.productSlug,
  item_category: item.productCategory,
  price: item.productVariant.price,
  quantity: item.quantity,
  currency: currency,
  item_variant: item.productVariant.sku,
});

/**
 * Convert ProductVariant to GA4 item format
 */
const variantToGAItem = (
  variant: ProductVariant,
  productSlug: string,
  productCategory: string,
  quantity: number = 1,
  currency: string = "USD",
): GAItem => ({
  item_id: String(variant.id),
  item_name: variant.title || productSlug,
  item_category: productCategory,
  price: variant.price,
  quantity: quantity,
  currency: currency,
  item_variant: variant.sku,
});

/**
 * Track when a user views a product
 */
export const trackViewItem = (
  variant: ProductVariant,
  productSlug: string,
  productCategory: string,
  currency: string = "USD",
) => {
  if (!isGALoaded()) return;

  window.gtag("event", "view_item", {
    currency: currency,
    value: variant.price,
    items: [
      variantToGAItem(variant, productSlug, productCategory, 1, currency),
    ],
  });
};

/**
 * Track when a user adds an item to cart
 */
export const trackAddToCart = (
  variant: ProductVariant,
  productSlug: string,
  productCategory: string,
  quantity: number = 1,
  currency: string = "USD",
) => {
  if (!isGALoaded()) return;

  window.gtag("event", "add_to_cart", {
    currency: currency,
    value: variant.price * quantity,
    items: [
      variantToGAItem(
        variant,
        productSlug,
        productCategory,
        quantity,
        currency,
      ),
    ],
  });
};

/**
 * Track when a user removes an item from cart
 */
export const trackRemoveFromCart = (
  variant: ProductVariant,
  productSlug: string,
  productCategory: string,
  quantity: number = 1,
  currency: string = "USD",
) => {
  if (!isGALoaded()) return;

  window.gtag("event", "remove_from_cart", {
    currency: currency,
    value: variant.price * quantity,
    items: [
      variantToGAItem(
        variant,
        productSlug,
        productCategory,
        quantity,
        currency,
      ),
    ],
  });
};

/**
 * Track when a user views their cart
 */
export const trackViewCart = (items: CartItem[], currency: string = "USD") => {
  if (!isGALoaded()) return;

  const totalValue = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
  );

  window.gtag("event", "view_cart", {
    currency: currency,
    value: totalValue,
    items: items.map((item) => toGAItem(item, currency)),
  });
};

/**
 * Track when a user begins checkout
 */
export const trackBeginCheckout = (
  items: CartItem[],
  currency: string = "USD",
) => {
  if (!isGALoaded()) return;

  const totalValue = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
  );

  window.gtag("event", "begin_checkout", {
    currency: currency,
    value: totalValue,
    items: items.map((item) => toGAItem(item, currency)),
  });
};

/**
 * Track successful purchase
 */
export const trackPurchase = (
  transactionId: string,
  items: CartItem[],
  currency: string = "USD",
  paymentMethod?: string,
) => {
  if (!isGALoaded()) return;

  const totalValue = items.reduce(
    (sum, item) => sum + item.productVariant.price * item.quantity,
    0,
  );

  window.gtag("event", "purchase", {
    transaction_id: transactionId,
    currency: currency,
    value: totalValue,
    items: items.map((item) => toGAItem(item, currency)),
    payment_type: paymentMethod,
  });
};

/**
 * Track when a user adds an item to wishlist
 */
export const trackAddToWishlist = (
  variant: ProductVariant,
  productSlug: string,
  productCategory: string,
  currency: string = "USD",
) => {
  if (!isGALoaded()) return;

  window.gtag("event", "add_to_wishlist", {
    currency: currency,
    value: variant.price,
    items: [
      variantToGAItem(variant, productSlug, productCategory, 1, currency),
    ],
  });
};

/**
 * Track search queries
 */
export const trackSearch = (searchTerm: string) => {
  if (!isGALoaded()) return;

  window.gtag("event", "search", {
    search_term: searchTerm,
  });
};

/**
 * Track login event
 */
export const trackLogin = (method: string = "email") => {
  if (!isGALoaded()) return;

  window.gtag("event", "login", {
    method: method,
  });
};

/**
 * Track sign up event
 */
export const trackSignUp = (method: string = "email") => {
  if (!isGALoaded()) return;

  window.gtag("event", "sign_up", {
    method: method,
  });
};
