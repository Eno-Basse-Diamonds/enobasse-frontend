import axios from "axios";
import { api } from "../utils/api";
import { API_URL } from "../utils/constants/api-url";
import { SignupFormSchema } from "../validations/auth";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  preferredCurrency: string;
  isAdmin: boolean;
}

export const createAccount = async (
  name: string,
  email: string,
  password?: string,
) => {
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

export const login = async (
  email: string,
  password: string,
): Promise<AuthTokenResponse> => {
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
    throw new Error('Invalid email or password.');
  }
};

export const issueTokenForEmail = async (
  email: string,
): Promise<AuthTokenResponse> => {
  return api.post(
    "/auth/issue-token",
    { email },
    { headers: { "x-internal-secret": process.env.INTERNAL_API_SECRET } },
  );
};

export async function signOut() {}
