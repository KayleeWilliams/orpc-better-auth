import { orpc } from "../../../lib/orpc";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ planet: string; moon: string }>;
}) {
  const data = await orpc.activeMoon.call();

  if (!data) {
    return notFound();
  }

  return <>Page {data?.name}</>;
}
