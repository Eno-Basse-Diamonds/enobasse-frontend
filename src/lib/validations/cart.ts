import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.string(),
  productSlug: z.string().min(1, "Product slug is required"),
  productCategory: z.string().min(1, "Product category is required"),
  productVariant: z.object({
    id: z.string(),
    price: z.number().min(0),
    originalPrice: z.number().min(0).optional(),
    sku: z.string().optional(),
  }).passthrough(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  size: z.number().optional(),
  engraving: z
    .object({
      text: z.string().max(50, "Engraving text is too long"),
      fontStyle: z.string(),
    })
    .optional(),
  amoraOptions: z
    .object({
      selectedLetters: z.array(z.string()),
      includeChain: z.boolean(),
      calculatedPrice: z.number().min(0),
    })
    .optional(),
  note: z.string().max(500, "Note is too long").optional(),
  addedAt: z.string().optional(),
});

export const CartSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type CartItemInput = z.infer<typeof CartItemSchema>;
export type CartInput = z.infer<typeof CartSchema>;
