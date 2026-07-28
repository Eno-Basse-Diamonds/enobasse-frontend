import NextAuth from "next-auth";

import { authOptions } from "@/modules/auth/lib";

/**
 * NextAuth.js API route handler.
 *
 * @description Handles all authentication requests (sign-in, sign-out, session,
 * callbacks) via NextAuth.js. Exports both GET and POST handlers.
 */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
