"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { Container } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { CART_KEY } from "@/hooks/use-cart";
import { api } from "@/lib/api";

/** Stripe sends the customer here if they back out: release the order and refill the cart. */
function Cancelled() {
  const number = useSearchParams().get("order");
  const qc = useQueryClient();
  const started = useRef(false);
  const abandon = useMutation({
    mutationFn: (n: string) => api<{ restored: boolean }>(`/orders/${encodeURIComponent(n)}/abandon-payment`, { method: "POST" }),
    onSettled: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  });

  useEffect(() => {
    if (number && !started.current) {
      started.current = true;
      abandon.mutate(number);
    }
  }, [number, abandon]);

  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-card p-10 text-center">
      <XCircle className="mx-auto h-14 w-14 text-muted-foreground" />
      <h1 className="mt-4 font-display text-5xl tracking-wide">Payment cancelled</h1>
      <p className="mt-3 text-muted-foreground">
        {abandon.isPending
          ? "Restoring your cart…"
          : abandon.data?.restored === false
            ? "This order was already completed or closed — check your account for its status."
            : "No charge was made. Your items are back in your cart whenever you're ready."}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/cart">Back to cart</ButtonLink>
        <ButtonLink href="/account" variant="outline">
          My orders
        </ButtonLink>
      </div>
    </div>
  );
}

export default function CheckoutCancelledPage() {
  return (
    <div className="bg-secondary pt-16">
      <Container className="py-16">
        <Suspense>
          <Cancelled />
        </Suspense>
      </Container>
    </div>
  );
}
