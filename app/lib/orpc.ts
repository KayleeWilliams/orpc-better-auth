import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "../orpc/router";
import { getDashboardUrl } from "./env";

declare global {
  // eslint-disable-next-line no-var
  var $client: RouterClient<typeof router> | undefined;
}

const link = new RPCLink({
  url: `${getDashboardUrl()}/rpc`,
});

const client: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
