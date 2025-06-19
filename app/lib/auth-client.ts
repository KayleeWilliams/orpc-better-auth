import { createAuthClient } from "better-auth/react";
import { getDashboardUrl } from "./env";

export const authClient = createAuthClient({
  baseURL: getDashboardUrl(),
});

export const { signIn, signOut, signUp, useSession } = authClient;
