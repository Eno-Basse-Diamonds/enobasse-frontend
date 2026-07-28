import { z } from "zod";

/**
 * Contact form validation schema.
 *
 * @description Zod schema for validating contact form submissions including
 * name, email, optional phone, subject, message, and contact preference.
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  contactPreference: z.enum(["email", "phone"]).optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
