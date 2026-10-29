import { Icon } from "@/components/icon";
import {
  date,
  money,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_TONE,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  PAYMENT_STATUS_TONE,
  percent,
} from "@/lib/format";
import { site } from "@/lib/site";
import type { Order, OrderStatus, PaymentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", ORDER_STATUS_TONE[status])}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function PaymentPill({ status }: { status: PaymentStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", PAYMENT_STATUS_TONE[status])}>
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

export function TotalsTable({
  subtotalCents,
  shippingCents,
  taxCents,
  totalCents,
  taxRateBps,
  pickup,
}: {
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  taxRateBps: number;
  pickup?: boolean;
}) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd className="font-semibold">{money(subtotalCents)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">{pickup ? "Local pickup" : "Shipping"}</dt>
        <dd className="font-semibold">{shippingCents ? money(shippingCents) : "Free"}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Sales tax ({percent(taxRateBps)})</dt>
        <dd className="font-semibold">{money(taxCents)}</dd>
      </div>
      <div className="flex justify-between border-t pt-3 text-base">
        <dt className="font-bold">Total</dt>
        <dd className="font-bold">{money(totalCents)}</dd>
      </div>
    </dl>
  );
}

/** Line items, totals, delivery and payment details for one order. */
export function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order</div>
            <div className="font-display text-3xl tracking-wide">{order.number}</div>
            <div className="text-sm text-muted-foreground">Placed {date(order.createdAt)}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusPill status={order.status} />
            <PaymentPill status={order.paymentStatus} />
          </div>
        </div>
        <ul className="divide-y">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-5">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-steel-900 text-primary">
                    <Icon name="package" className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  SKU {item.sku} · {money(item.unitPriceCents)} × {item.quantity}
                </div>
              </div>
              <div className="font-semibold">{money(item.lineTotalCents)}</div>
            </li>
          ))}
        </ul>
        <div className="border-t p-5">
          <TotalsTable {...order} pickup={order.fulfillment === "PICKUP"} />
        </div>
      </div>

      <div className="space-y-5 text-sm">
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-bold">{order.fulfillment === "PICKUP" ? "Local pickup" : "Ship to"}</h3>
          <div className="mt-2 leading-relaxed text-muted-foreground">
            {order.fulfillment === "PICKUP" ? (
              <>
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
                <br />
                We&apos;ll call when it&apos;s ready.
              </>
            ) : (
              <>
                {order.contactName}
                {order.company && (
                  <>
                    <br />
                    {order.company}
                  </>
                )}
                <br />
                {order.shipLine1}
                {order.shipLine2 && (
                  <>
                    <br />
                    {order.shipLine2}
                  </>
                )}
                <br />
                {order.shipCity}, {order.shipState} {order.shipPostalCode}
              </>
            )}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-bold">Contact &amp; payment</h3>
          <dl className="mt-2 space-y-1 text-muted-foreground">
            <div>{order.email}</div>
            <div>{order.phone}</div>
            <div>{PAYMENT_METHOD_LABEL[order.paymentMethod]}</div>
            {order.poNumber && <div>PO # {order.poNumber}</div>}
          </dl>
          {order.notes && <p className="mt-3 border-t pt-3 text-muted-foreground">“{order.notes}”</p>}
        </div>
      </div>
    </div>
  );
}
