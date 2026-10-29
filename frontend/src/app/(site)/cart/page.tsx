"use client";

import { AlertTriangle, ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { QuantityInput } from "@/components/site/add-to-cart";
import { TotalsTable } from "@/components/site/order-summary";
import { ProductImage } from "@/components/site/product-image";
import { Container } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { useCart, useCartActions } from "@/hooks/use-cart";
import { useSession } from "@/hooks/use-session";
import { money } from "@/lib/format";

export default function CartPage() {
  const { data: cart, isPending, error } = useCart();
  const { update, remove } = useCartActions();
  const { user } = useSession();

  return (
    <div className="bg-secondary pt-16">
      <Container className="py-12">
        <h1 className="font-display text-6xl tracking-wide">Your cart</h1>

        {isPending ? (
          <div className="mt-8 h-64 animate-pulse rounded-xl bg-card" />
        ) : error ? (
          <p className="mt-8 text-destructive">{error.message}</p>
        ) : !cart?.lines.length ? (
          <div className="mt-8 rounded-xl border bg-card p-12 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Browse stocked equipment ready to ship from Schenectady.</p>
            <ButtonLink href="/shop" className="mt-6">
              Shop equipment <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y rounded-xl border bg-card">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex flex-wrap gap-4 p-5 sm:flex-nowrap">
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-md border"
                  >
                    <ProductImage
                      src={line.product.image?.url}
                      alt={line.product.name}
                      icon={line.product.category.icon}
                      size="sm"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${line.product.slug}`} className="font-bold hover:underline">
                      {line.product.name}
                    </Link>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {line.product.brand?.name && `${line.product.brand.name} · `}SKU {line.product.sku} ·{" "}
                      {money(line.product.priceCents)} each
                    </div>
                    {line.issue && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-destructive">
                        <AlertTriangle className="h-4 w-4" /> {line.issue}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      <QuantityInput
                        value={line.quantity}
                        max={line.product.stock || 1}
                        disabled={update.isPending || !line.product.isActive}
                        onChange={(quantity) => update.mutate({ itemId: line.id, quantity })}
                        className="h-9"
                      />
                      <button
                        type="button"
                        onClick={() => remove.mutate(line.id)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold">{money(line.lineTotalCents)}</div>
                </li>
              ))}
            </ul>

            <aside className="h-fit space-y-4 rounded-xl border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold">Order summary</h2>
              <TotalsTable {...cart.totals.SHIPPING} />
              <p className="text-xs text-muted-foreground">
                Shipping shown for delivery. Choose free local pickup in Schenectady at checkout.
              </p>
              {cart.hasIssues && (
                <p className="rounded-md bg-amber-100 p-3 text-sm font-medium text-amber-900">
                  Some items need attention before you can check out.
                </p>
              )}
              <ButtonLink
                href={user ? "/checkout" : "/login?next=/checkout"}
                size="lg"
                className="w-full"
                aria-disabled={cart.hasIssues}
                onClick={(e) => cart.hasIssues && e.preventDefault()}
              >
                {user ? "Checkout" : "Sign in to check out"} <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <Link href="/shop" className="block text-center text-sm font-semibold text-muted-foreground hover:text-foreground">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
}
