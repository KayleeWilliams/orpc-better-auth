import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "../orpc/router";
import { getDashboardUrl } from "./env";

const link = new RPCLink({
  url: `${getDashboardUrl()}/rpc`,
});

const client: RouterClient<typeof router> = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
