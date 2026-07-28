import axios from "axios";

import { API_URL } from "@/shared/constants/url";
import { api } from "@/shared/utils/api";

import { SignupFormSchema } from "./schemas";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  preferredCurrency: string;
  isAdmin: boolean;
}

/**
 * Creates a new account.
 *
 * @description Creates a new account with validation via the sign-up schema.
 * @param name - The account holder's name
 * @param email - The account email address
 * @param password - Optional account password
 * @returns The created account or validation errors
 */
export const createAccount = async (name: string, email: string, password?: string) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: name,
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await api.post("/auth/create-account", {
    name,
    email,
    password,
  });
  return response;
};

interface AuthTokenResponse {
  accessToken: string;
  account: UserAccount;
}

/**
 * Authenticates a user.
 *
 * @description Authenticates with email and password, returning an access token
 * and account.
 * @param email - The account email address
 * @param password - The account password
 * @returns An access token and account data
 */
export const login = async (email: string, password: string): Promise<AuthTokenResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Invalid email or password.");
  }
};

/**
 * Issues a session token.
 *
 * @description Issues a session token for the given email (used server-side
 * after sign-up).
 * @param email - The account email address
 * @returns An access token and account data
 */
export const issueTokenForEmail = async (email: string): Promise<AuthTokenResponse> => {
  return api.post(
    "/auth/issue-token",
    { email },
    { headers: { "x-internal-secret": process.env.INTERNAL_API_SECRET } },
  );
};

/**
 * Signs out the user.
 *
 * @description No-op sign-out placeholder.
 */
export async function signOut() {}
