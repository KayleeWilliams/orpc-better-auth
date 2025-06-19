"use client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "../../lib/orpc";

export default function Sun() {
  const { data, isLoading } = useQuery(orpc.activePlanet.queryOptions());

  return <div>Sun is not {isLoading ? "loading" : data?.name}</div>;
}
