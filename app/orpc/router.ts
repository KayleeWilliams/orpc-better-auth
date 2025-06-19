import { ORPCError, os } from "@orpc/server";
import { auth } from "../lib/auth";

const authMiddleware = os
  .$context<{ headers?: Headers }>()
  .middleware(async ({ context, next }) => {
    if (!context.headers) {
      throw new ORPCError("BAD_REQUEST", {
        message: "Missing headers.",
      });
    }

    context.headers.forEach((value, key) => {
      console.log(key, value);
    });

    const session = await auth.api.getSession({
      headers: context.headers,
    });

    if (!session) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "Unauthorized.",
      });
    }

    return await next({
      context: {
        headers: context.headers,
        user: session.user,
        session: session.session,
      },
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
