import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";
import { router } from "../orpc/router";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

export const orpc = createTanstackQueryUtils(
  createRouterClient(router, {
    context: async () => {
      return {
        headers: await headers(),
      };
    },
  })
);
