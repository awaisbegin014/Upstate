"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { OrderSummary } from "@/components/site/order-summary";
import { Container } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { CART_KEY } from "@/hooks/use-cart";
import { api } from "@/lib/api";
import { site } from "@/lib/site";
import type { Order } from "@/lib/types";

function Confirmation() {
  const number = useSearchParams().get("order") ?? "";
  const qc = useQueryClient();
  const { data: order, error, isPending } = useQuery({
    queryKey: ["orders", number],
    queryFn: () => api<Order>(`/orders/${encodeURIComponent(number)}`),
    enabled: Boolean(number),
    // A card payment can take a moment to be confirmed by Stripe.
    refetchInterval: (q) => (q.state.data?.status === "PENDING_PAYMENT" ? 3000 : false),
  });

  useEffect(() => {
    qc.invalidateQueries({ queryKey: CART_KEY });
  }, [qc]);

  if (!number) return <p className="text-muted-foreground">No order number given.</p>;
  if (isPending) return <div className="h-96 animate-pulse rounded-xl bg-card" />;
  if (error || !order) return <p className="text-destructive">{error?.message ?? "Order not found."}</p>;

  const pending = order.status === "PENDING_PAYMENT";
  return (
    <>
      <div className="rounded-xl border bg-card p-8 text-center">
        {pending ? (
          <Clock className="mx-auto h-14 w-14 text-amber-500" />
        ) : (
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        )}
        <h1 className="mt-4 font-display text-5xl tracking-wide">
          {pending ? "Confirming your payment…" : "Thank you — order received!"}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {pending
            ? "This usually takes a few seconds."
            : order.paymentMethod === "INVOICE"
              ? `We'll call ${order.phone} to confirm details and send your invoice. A copy of this order is in your account.`
              : `Your payment was received. We'll email ${order.email} when your order ${order.fulfillment === "PICKUP" ? "is ready for pickup" : "ships"}.`}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions about order <strong>{order.number}</strong>? Call {site.phone.display}.
        </p>
      </div>
      <div className="mt-8">
        <OrderSummary order={order} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/account">View my orders</ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Continue shopping
        </ButtonLink>
      </div>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-secondary pt-16">
      <Container className="py-12">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-card" />}>
          <Confirmation />
        </Suspense>
      </Container>
    </div>
  );
}
