import { ORPCError, os } from "@orpc/server";
import { getDashboardUrl } from "../lib/env";
import type { auth } from "../lib/auth";

const authMiddleware = os
  .$context<{ headers?: Headers }>()
  .middleware(async ({ context, next }) => {
    if (!context.headers) {
      throw new ORPCError("BAD_REQUEST", {
        message: "Missing headers.",
      });
    }

    console.log("cookie", context.headers.get("cookie"));
    console.log("cookie str", context.headers.get("cookie")?.toString());

    const response = await fetch(`${getDashboardUrl()}/api/auth/get-session`, {
      headers: new Headers(context.headers),
    });

    if (response.ok) {
      const session = (await response.json()) as Awaited<
        ReturnType<typeof auth.api.getSession>
      >;

      console.warn("session", session);

      if (!session) {
        throw new ORPCError("CONFLICT", {
          message: "Conflict.",
        });
      }

      return await next({
        context: {
          headers: context.headers,
          user: session.user,
          session: session.session,
        },
      });
    }

    throw new ORPCError("SERVICE_UNAVAILABLE", {
      message: "SERVICE_UNAVAILABLE.",
    });
  });

const activePlanet = os.use(authMiddleware).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: 1,
    name: "pluto",
  };
});
const activeMoon = os.use(authMiddleware).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: 1,
    name: "moon",
  };
});

export const router = {
  activePlanet,
  activeMoon,
};
