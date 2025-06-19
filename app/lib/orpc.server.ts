"use server";

import { createRouterClient } from "@orpc/server";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { router } from "../orpc/router";

globalThis.$client = createRouterClient(router, {
  /**
   * Provide initial context if needed.
   *
   * Because this client instance is shared across all requests,
   * only include context that's safe to reuse globally.
   * For per-request context, use middleware context or pass a function as the initial context.
   */
  context: async () => {
    const [headers, cookies] = await Promise.all([getHeaders(), getCookies()]);
    return {
      headers,
    };
  },
});
