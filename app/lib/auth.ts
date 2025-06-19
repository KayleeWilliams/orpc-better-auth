import { betterAuth } from "better-auth";
import { getDashboardUrl } from "./env";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [getDashboardUrl()],
});
