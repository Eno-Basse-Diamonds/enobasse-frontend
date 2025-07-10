import { api } from "../utils/api";
import { SignupFormSchema } from "../validations/auth";

export const createAccount = async (
  name: string,
  email: string,
  password?: string
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

export const validateAccount = async (email: string, password: string) => {
  return api.post("/auth/validate-account", { email, password });
};

export const findAccount = async (email: string) => {
  return api.post("/accounts/email", { param: { email } });
};

export async function signOut() {}
