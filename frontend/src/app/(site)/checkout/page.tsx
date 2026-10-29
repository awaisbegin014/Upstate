"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreditCard, FileText, Lock, Store, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TotalsTable } from "@/components/site/order-summary";
import { Container } from "@/components/site/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { CART_KEY, useCart, useStoreSettings } from "@/hooks/use-cart";
import { useSession } from "@/hooks/use-session";
import { api } from "@/lib/api";
import { money } from "@/lib/format";
import { site } from "@/lib/site";
import type { Fulfillment, Order } from "@/lib/types";
import { cn } from "@/lib/utils";

type Payment = "CARD" | "INVOICE";

function Choice({
  checked,
  onSelect,
  icon: IconCmp,
  title,
  body,
}: {
  checked: boolean;
  onSelect: () => void;
  icon: typeof Truck;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border-2 bg-card p-4 text-left transition-colors",
        checked ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30",
      )}
    >
      <IconCmp className="mt-0.5 h-5 w-5 shrink-0" />
      <span>
        <span className="block font-bold">{title}</span>
        <span className="block text-sm text-muted-foreground">{body}</span>
      </span>
    </button>
  );
}

export default function CheckoutPage() {
  const { user, isPending: sessionPending } = useSession();
  const { data: cart, isPending: cartPending } = useCart();
  const { data: settings } = useStoreSettings();
  const router = useRouter();
  const qc = useQueryClient();

  const [fulfillment, setFulfillment] = useState<Fulfillment>("SHIPPING");
  const [payment, setPayment] = useState<Payment | null>(null);

  const placeOrder = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      api<{ order: Order; checkoutUrl: string | null }>("/orders", { method: "POST", body }),
    onSuccess: async ({ order, checkoutUrl }) => {
      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
      }
      await qc.invalidateQueries({ queryKey: CART_KEY });
      qc.invalidateQueries({ queryKey: ["orders"] });
      router.push(`/checkout/success?order=${order.number}`);
    },
  });

  if (sessionPending || cartPending) {
    return (
      <div className="pt-16">
        <Container className="py-12">
          <div className="h-96 animate-pulse rounded-xl bg-secondary" />
        </Container>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-16">
        <Container className="max-w-xl py-20 text-center">
          <Lock className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 font-display text-5xl tracking-wide">Sign in to check out</h1>
          <p className="mt-3 text-muted-foreground">
            An account keeps your order history, PO numbers and invoices in one place. Your cart is saved.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/login?next=/checkout">Sign in</ButtonLink>
            <ButtonLink href="/register?next=/checkout" variant="outline">
              Create an account
            </ButtonLink>
          </div>
        </Container>
      </div>
    );
  }

  if (!cart?.lines.length) {
    return (
      <div className="pt-16">
        <Container className="max-w-xl py-20 text-center">
          <h1 className="font-display text-5xl tracking-wide">Your cart is empty</h1>
          <ButtonLink href="/shop" className="mt-8">
            Shop equipment
          </ButtonLink>
        </Container>
      </div>
    );
  }

  const cardOn = settings?.paymentMethods.card ?? false;
  const invoiceOn = settings?.paymentMethods.invoice ?? true;
  const pickupOn = settings?.pickupEnabled ?? true;
  const method: Payment | null = payment ?? (cardOn ? "CARD" : invoiceOn ? "INVOICE" : null);
  const mode: Fulfillment = pickupOn ? fulfillment : "SHIPPING";
  const totals = cart.totals[mode];

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!method) return;
    const form = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    placeOrder.mutate({ ...form, fulfillment: mode, paymentMethod: method });
  };

  return (
    <div className="bg-secondary pt-16">
      <Container className="py-12">
        <h1 className="font-display text-6xl tracking-wide">Checkout</h1>

        <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-bold">1. Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Contact name" required>
                  <Input name="contactName" required defaultValue={`${user.firstName} ${user.lastName}`} autoComplete="name" />
                </Field>
                <Field label="Company">
                  <Input name="company" defaultValue={user.company ?? ""} autoComplete="organization" />
                </Field>
                <Field label="Email" required>
                  <Input name="email" type="email" required defaultValue={user.email} autoComplete="email" />
                </Field>
                <Field label="Phone" required>
                  <Input name="phone" type="tel" required defaultValue={user.phone ?? ""} autoComplete="tel" />
                </Field>
                <Field label="PO number" hint="Optional — printed on your invoice.">
                  <Input name="poNumber" maxLength={60} />
                </Field>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-bold">2. Delivery</h2>
              <div role="radiogroup" className="mt-4 grid gap-3 sm:grid-cols-2">
                <Choice
                  checked={mode === "SHIPPING"}
                  onSelect={() => setFulfillment("SHIPPING")}
                  icon={Truck}
                  title="Ship to my facility"
                  body={
                    settings && settings.freeShippingThresholdCents > 0
                      ? `${money(settings.flatShippingCents)} flat · free over ${money(settings.freeShippingThresholdCents)}`
                      : "Flat-rate shipping"
                  }
                />
                {pickupOn && (
                  <Choice
                    checked={mode === "PICKUP"}
                    onSelect={() => setFulfillment("PICKUP")}
                    icon={Store}
                    title="Pick up in Schenectady"
                    body={`Free · ${site.address.street}`}
                  />
                )}
              </div>
              {mode === "SHIPPING" && (
                <div className="mt-5 grid gap-4 sm:grid-cols-6">
                  <Field label="Street address" required className="sm:col-span-6">
                    <Input name="shipLine1" required autoComplete="address-line1" />
                  </Field>
                  <Field label="Suite, dock, building" className="sm:col-span-6">
                    <Input name="shipLine2" autoComplete="address-line2" />
                  </Field>
                  <Field label="City" required className="sm:col-span-3">
                    <Input name="shipCity" required autoComplete="address-level2" />
                  </Field>
                  <Field label="State" required className="sm:col-span-1">
                    <Input
                      name="shipState"
                      required
                      maxLength={2}
                      defaultValue="NY"
                      autoComplete="address-level1"
                      className="uppercase"
                    />
                  </Field>
                  <Field label="ZIP" required className="sm:col-span-2">
                    <Input name="shipPostalCode" required inputMode="numeric" autoComplete="postal-code" />
                  </Field>
                </div>
              )}
              <Field label="Delivery notes" className="mt-4">
                <Textarea name="notes" className="min-h-20" placeholder="Dock hours, liftgate needed, call ahead…" />
              </Field>
            </section>

            <section className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-bold">3. Payment</h2>
              <div role="radiogroup" className="mt-4 grid gap-3 sm:grid-cols-2">
                {cardOn && (
                  <Choice
                    checked={method === "CARD"}
                    onSelect={() => setPayment("CARD")}
                    icon={CreditCard}
                    title="Credit or debit card"
                    body="Pay securely on Stripe's checkout page."
                  />
                )}
                {invoiceOn && (
                  <Choice
                    checked={method === "INVOICE"}
                    onSelect={() => setPayment("INVOICE")}
                    icon={FileText}
                    title="Pay on invoice"
                    body="We confirm your order by phone and invoice you — check, ACH or pay at pickup."
                  />
                )}
              </div>
              {!method && (
                <p className="mt-3 text-sm text-destructive">
                  Online payment is unavailable right now. Please call {site.phone.display} to order.
                </p>
              )}
            </section>
          </div>

          <aside className="h-fit space-y-5 rounded-xl border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">Order summary</h2>
            <ul className="space-y-3 text-sm">
              {cart.lines.map((l) => (
                <li key={l.id} className="flex justify-between gap-3">
                  <span>
                    {l.product.name} <span className="text-muted-foreground">× {l.quantity}</span>
                    {l.issue && <span className="block text-xs font-semibold text-destructive">{l.issue}</span>}
                  </span>
                  <span className="font-semibold">{money(l.lineTotalCents)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4">
              <TotalsTable {...totals} pickup={mode === "PICKUP"} />
            </div>
            {placeOrder.error && (
              <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-destructive">{placeOrder.error.message}</p>
            )}
            {cart.hasIssues && (
              <p className="rounded-md bg-amber-100 p-3 text-sm font-medium text-amber-900">
                Please <Link href="/cart" className="underline">review your cart</Link> before placing the order.
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={!method || cart.hasIssues || placeOrder.isPending}>
              {placeOrder.isPending
                ? "Placing order…"
                : method === "CARD"
                  ? `Pay ${money(totals.totalCents)}`
                  : "Place order"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Questions? Call {site.phone.display} before you order.
            </p>
          </aside>
        </form>
      </Container>
    </div>
  );
}
