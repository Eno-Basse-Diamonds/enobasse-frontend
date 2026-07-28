import { Account, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { createAccount, issueTokenForEmail, login } from "@/modules/auth/api";

/**
 * NextAuth configuration with Google OAuth and credentials provider.
 *
 * @description Configuration object for NextAuth.js that sets up Google OAuth
 * and email/password credential authentication, including JWT callbacks for
 * session management and a signIn handler for Google account creation.
 */
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
        preIssuedToken: { label: "Pre-issued Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Sign-up flow: a token was already issued server-side, use it directly
        if (credentials.preIssuedToken) {
          try {
            const tokenData = JSON.parse(credentials.preIssuedToken);
            return { ...tokenData.account, accessToken: tokenData.accessToken } as unknown as User;
          } catch {
            return null;
          }
        }

        // Sign-in flow: authenticate with email + password
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
    async signIn({ user, account }: { user: User; account: Account | null }) {
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
