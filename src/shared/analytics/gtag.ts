/**
 * Google Analytics 4 (GA4) Ecommerce Tracking Utilities
 *
 * This module provides functions for tracking ecommerce events in GA4.
 * Events follow the recommended GA4 ecommerce event schema.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */
import { CartItem } from "@/modules/cart/types";
import { ProductVariant } from "@/modules/products/types";

/**
 * GA measurement ID.
 *
 * @description Google Analytics 4 measurement ID from environment variables
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Checks whether GA is loaded.
 *
 * @description Checks whether the Google Analytics gtag function is available
 * in the window scope.
 * @returns Whether gtag is loaded
 */
const isGALoaded = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Tracks a page view.
 *
 * @description Tracks page views (useful for SPA navigation).
 * @param url - The page URL path to track
 */
export const pageview = (url: string) => {
  if (!isGALoaded() || !GA_MEASUREMENT_ID) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Tracks a generic GA event.
 *
 * @description Tracks a generic Google Analytics event.
 * @param action - The event action name
 * @param params - Optional event parameters
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
 * Converts a CartItem to GA4 item format.
 *
 * @description Converts a CartItem to GA4 item format.
 * @param item - The cart item to convert
 * @param currency - Currency code (default "USD")
 * @returns The GA4-formatted item
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
 * Converts a ProductVariant to GA4 item format.
 *
 * @description Converts a ProductVariant to GA4 item format.
 * @param variant - The product variant
 * @param productSlug - The product slug
 * @param productCategory - The product category
 * @param quantity - Quantity (default 1)
 * @param currency - Currency code (default "USD")
 * @returns The GA4-formatted item
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
 * Tracks a product view event.
 *
 * @description Tracks when a user views a product.
 * @param variant - The product variant being viewed
 * @param productSlug - The product slug
 * @param productCategory - The product category
 * @param currency - Currency code (default "USD")
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
    items: [variantToGAItem(variant, productSlug, productCategory, 1, currency)],
  });
};

/**
 * Tracks an add-to-cart event.
 *
 * @description Tracks when a user adds an item to cart.
 * @param variant - The product variant being added
 * @param productSlug - The product slug
 * @param productCategory - The product category
 * @param quantity - Quantity to add (default 1)
 * @param currency - Currency code (default "USD")
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
    items: [variantToGAItem(variant, productSlug, productCategory, quantity, currency)],
  });
};

/**
 * Tracks a remove-from-cart event.
 *
 * @description Tracks when a user removes an item from cart.
 * @param variant - The product variant being removed
 * @param productSlug - The product slug
 * @param productCategory - The product category
 * @param quantity - Quantity removed (default 1)
 * @param currency - Currency code (default "USD")
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
    items: [variantToGAItem(variant, productSlug, productCategory, quantity, currency)],
  });
};

/**
 * Tracks a view-cart event.
 *
 * @description Tracks when a user views their cart.
 * @param items - The items in the cart
 * @param currency - Currency code (default "USD")
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
 * Tracks a begin-checkout event.
 *
 * @description Tracks when a user begins checkout.
 * @param items - The items in the cart
 * @param currency - Currency code (default "USD")
 */
export const trackBeginCheckout = (items: CartItem[], currency: string = "USD") => {
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
 * Tracks a purchase event.
 *
 * @description Tracks a successful purchase.
 * @param transactionId - The transaction ID
 * @param items - The purchased items
 * @param currency - Currency code (default "USD")
 * @param paymentMethod - Optional payment method used
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
 * Tracks an add-to-wishlist event.
 *
 * @description Tracks when a user adds an item to wishlist.
 * @param variant - The product variant being added
 * @param productSlug - The product slug
 * @param productCategory - The product category
 * @param currency - Currency code (default "USD")
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
    items: [variantToGAItem(variant, productSlug, productCategory, 1, currency)],
  });
};

/**
 * Tracks a search event.
 *
 * @description Tracks a search query.
 * @param searchTerm - The search term entered by the user
 */
export const trackSearch = (searchTerm: string) => {
  if (!isGALoaded()) return;

  window.gtag("event", "search", {
    search_term: searchTerm,
  });
};

/**
 * Tracks a login event.
 *
 * @description Tracks a login event.
 * @param method - The login method (default "email")
 */
export const trackLogin = (method: string = "email") => {
  if (!isGALoaded()) return;

  window.gtag("event", "login", {
    method: method,
  });
};

/**
 * Tracks a sign-up event.
 *
 * @description Tracks a sign-up event.
 * @param method - The sign-up method (default "email")
 */
export const trackSignUp = (method: string = "email") => {
  if (!isGALoaded()) return;

  window.gtag("event", "sign_up", {
    method: method,
  });
};
