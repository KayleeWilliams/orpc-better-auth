import { cookies } from "next/headers";
import { orpc } from "../../lib/orpc";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ planet: string }>;
}) {
  const cookieStore = await cookies();
  console.log(cookieStore.getAll());

  const data = await orpc.activePlanet.call();

  if (!data) {
    return notFound();
  }

  return <>Page {data?.name}</>;
}
