import { cookies } from "next/headers";
import { orpc } from "../../lib/orpc.server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/app/lib/query/hydration";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ planet: string }>;
}) {
  const queryClient = getQueryClient();
  const { planet } = await params;
  const cookieStore = await cookies();
  const headersList = await headers();

  // even though cookies are shown here they're not in the headers
  console.log("SC Cookies", cookieStore.getAll());
  console.log("SC Headers Cookie", headersList.get("cookie"));

  const data = await queryClient.fetchQuery(orpc.activePlanet.queryOptions());

  if (!data) {
    return notFound();
  }

  return (
    <>
      Page {data?.name}
      <Link href={`/dashboard/${data?.name ?? planet}/moon`}>
        <Button variant="outline">Change page</Button>
      </Link>
    </>
  );
}
