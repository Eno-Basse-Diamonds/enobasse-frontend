import { z } from "zod";

/**
 * Sign-up form validation schema.
 *
 * @description Zod schema for validating user registration form data including
 * name, email, and password fields with minimum length constraints.
 */
export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }).trim(),
});

/**
 * Sign-in form validation schema.
 *
 * @description Zod schema for validating user login form data including email
 * and password fields.
 */
export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }).trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
