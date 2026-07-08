import { NextAuthOptions, User, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, issueTokenForEmail, createAccount } from "@/lib/api/auth";

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
        try {
          const { accessToken, account } = await login(email, password);
          return { ...account, accessToken } as unknown as User;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = (user as User).isAdmin;
        token.accessToken = (user as User).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn({
      user,
      account,
    }: {
      user: User;
      account: Account | null;
    }) {
      if (account?.provider === "google") {
        try {
          const issued = await issueTokenForEmail(user.email!);
          user.isAdmin = issued.account.isAdmin;
          user.accessToken = issued.accessToken;
        } catch {
          try {
            await createAccount(user.name ?? "", user.email!);
            const issued = await issueTokenForEmail(user.email!);
            user.isAdmin = issued.account.isAdmin;
            user.accessToken = issued.accessToken;
          } catch {
            return false;
          }
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};
