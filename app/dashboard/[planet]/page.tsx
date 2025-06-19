import { cookies } from "next/headers";
import { orpc } from "../../lib/orpc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/app/lib/query/hydration";

export default async function Page({
  params,
}: {
  params: Promise<{ planet: string }>;
}) {
  const queryClient = getQueryClient();
  const { planet } = await params;
  const cookieStore = await cookies();

  // even though cookies are shown here they're not in the headers
  console.log(cookieStore.getAll());

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
