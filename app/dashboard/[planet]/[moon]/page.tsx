import { orpc } from "../../../lib/orpc";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/app/lib/query/hydration";

export default async function Page({
  params,
}: {
  params: Promise<{ planet: string; moon: string }>;
}) {
  const queryClient = getQueryClient();
  const { planet } = await params;

  const data = await queryClient.fetchQuery(orpc.activeMoon.queryOptions());

  if (data) {
    redirect(`/dashboard/${data.id}`);
  }

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Link href={`/dashboard/${planet}`}>
        <Button variant="outline">Planet</Button>
      </Link>
    </>
  );
}
