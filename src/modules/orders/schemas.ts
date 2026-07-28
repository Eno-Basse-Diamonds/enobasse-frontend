import { z } from "zod";

/**
 * Billing address validation schema.
 *
 * @description Zod schema for validating billing address fields including
 * first name, last name, street, city, state, postal code, and country.
 */
export const BillingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  street: z.string().min(1, "Street address is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  postalCode: z.string().optional().default(""),
  country: z.string().min(1, "Country is required").trim(),
});

/**
 * Order item validation schema.
 *
 * @description Zod schema for validating an individual order item including
 * product variant, quantity, pricing, product details, and optional engraving.
 */
export const OrderItemSchema = z.object({
  id: z.string(),
  productVariantId: z.string().min(1, "Product variant ID is required"),
  productVariant: z
    .object({
      id: z.string(),
      price: z.number().min(0),
      originalPrice: z.number().min(0).optional(),
      sku: z.string().optional(),
    })
    .passthrough(),
  quantity: z.number().int().min(1),
  price: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  currency: z.string().min(1),
  productSlug: z.string().min(1),
  productCategory: z.string().min(1),
  size: z.number().optional(),
  engraving: z
    .object({
      text: z.string(),
      fontStyle: z.string(),
    })
    .optional(),
});

/**
 * Full order validation schema.
 *
 * @description Zod schema for validating the complete order object including
 * items, total, billing address, customer info, status, payment details, and
 * creation date.
 */
export const OrderSchema = z.object({
  id: z.string(),
  shortId: z.string().optional(),
  items: z.array(OrderItemSchema),
  total: z.number().min(0),
  billingAddress: BillingAddressSchema,
  accountEmail: z.string().email().optional(),
  currency: z.string().optional(),
  customerInfo: z
    .object({
      email: z.string().email(),
      phone: z.string(),
    })
    .optional(),
  status: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ]),
  paymentMethod: z.enum(["paystack", "bank_transfer"]).optional(),
  paymentStatus: z.enum(["pending", "paid", "failed"]).optional(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date()),
});

export type BillingAddressInput = z.infer<typeof BillingAddressSchema>;
export type OrderItemInput = z.infer<typeof OrderItemSchema>;
export type OrderInput = z.infer<typeof OrderSchema>;
