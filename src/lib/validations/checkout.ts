import { z } from "zod";

export const CheckoutFormSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  phone: z.string().min(5, "Phone number is too short").trim(),
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  address: z.string().min(1, "Address is required").trim(),
  apartment: z.string().optional().default(""),
  city: z.string().min(1, "City is required").trim(),
  country: z.string().min(1, "Country is required").trim(),
  region: z.string().min(1, "State or province is required").trim(),
  postalCode: z.string().optional().default(""),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;
