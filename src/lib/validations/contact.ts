import { z } from "zod";

export const ContactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.string().email("Please enter a valid email address").trim(),
  phoneNumber: z.string().optional().default(""),
  message: z.string().min(10, "Message must be at least 10 characters long").trim(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
