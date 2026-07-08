import { api } from "../utils/api";
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
  return api.post("/auth/login", { email, password });
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
