"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { OrderSummary } from "@/components/site/order-summary";
import { useSession } from "@/hooks/use-session";
import { api } from "@/lib/api";
import type { Order } from "@/lib/types";

export function AccountOrder({ number }: { number: string }) {
  const { user, isPending: sessionPending } = useSession();
  const { data, error, isPending } = useQuery({
    queryKey: ["orders", number],
    queryFn: () => api<Order>(`/orders/${encodeURIComponent(number)}`),
    enabled: Boolean(user),
  });

  if (!sessionPending && !user) {
    return (
      <p>
        Please{" "}
        <Link href={`/login?next=/account/orders/${number}`} className="font-semibold underline">
          sign in
        </Link>{" "}
        to view this order.
      </p>
    );
  }
  if (isPending) return <div className="h-96 animate-pulse rounded-xl bg-card" />;
  if (error || !data) return <p className="text-destructive">{error?.message ?? "Order not found."}</p>;
  return <OrderSummary order={data} />;
}
