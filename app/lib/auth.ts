import { betterAuth } from "better-auth";
import { getDashboardUrl } from "./env";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    getDashboardUrl(),
    `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`,
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
  ],
});
