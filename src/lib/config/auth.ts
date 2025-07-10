import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateAccount, findAccount } from "@/lib/api/auth";
import { api } from "@/lib/utils/api";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;
        const account = await validateAccount(email, password);
        if (account && typeof (account as any).id === "string") {
          return account as { id: string; name: string; email: string };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: any;
      account: any;
      profile?: any;
      email?: any;
      credentials?: any;
    }) {
      if (account?.provider === "google") {
        try {
          await findAccount(user.email);
        } catch (error) {
          try {
            await api.post("/auth/create-account", {
              name: user.name,
              email: user.email,
            });
          } catch (error) {
            return true;
          }
          return true;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
