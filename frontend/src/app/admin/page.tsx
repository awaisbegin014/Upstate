"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, DollarSign, Inbox, Package, Receipt, Users } from "lucide-react";
import Link from "next/link";
import { Card, PageHeader } from "@/components/admin/ui";
import { PaymentPill, StatusPill } from "@/components/site/order-summary";
import { api } from "@/lib/api";
import { date, money } from "@/lib/format";
import type { OrderStatus, PaymentStatus } from "@/lib/types";

interface Stats {
  openOrders: number;
  revenue30dCents: number;
  paidOrders30d: number;
  revenueAllTimeCents: number;
  customers: number;
  newInquiries: number;
  activeProducts: number;
  lowStock: { id: string; name: string; sku: string; stock: number }[];
  recentOrders: {
    number: string;
    contactName: string;
    company: string | null;
    totalCents: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
  }[];
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: typeof Receipt;
  label: string;
  value: string | number;
  sub?: string;
  href: string;
}) {
  return (
    <Link href={href} className="rounded-xl border bg-card p-5 transition-colors hover:border-primary">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">{label}</span>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="mt-3 font-display text-4xl tracking-wide">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </Link>
  );
}

export default function AdminDashboard() {
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => api<Stats>("/admin/stats"),
  });

  return (
    <>
      <PageHeader title="Dashboard" description="Orders, revenue and stock at a glance." />
      {error && <p className="text-destructive">{error.message}</p>}
      {isPending || !data ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-card" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={Receipt} label="Open orders" value={data.openOrders} sub="Received, processing or ready" href="/admin/orders" />
            <Stat
              icon={DollarSign}
              label="Paid revenue · 30 days"
              value={money(data.revenue30dCents)}
              sub={`${data.paidOrders30d} paid orders · ${money(data.revenueAllTimeCents)} all time`}
              href="/admin/orders"
            />
            <Stat icon={Inbox} label="New inquiries" value={data.newInquiries} sub="Quote requests & messages" href="/admin/inquiries" />
            <Stat icon={Users} label="Customers" value={data.customers} sub={`${data.activeProducts} active products`} href="/admin/customers" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
            <Card>
              <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 className="font-bold">Recent orders</h2>
                <Link href="/admin/orders" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                  View all
                </Link>
              </div>
              {data.recentOrders.length ? (
                <ul className="divide-y">
                  {data.recentOrders.map((o) => (
                    <li key={o.number}>
                      <Link href={`/admin/orders/${o.number}`} className="flex flex-wrap items-center gap-3 px-5 py-3 hover:bg-secondary/60">
                        <span className="w-24 font-semibold">{o.number}</span>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {o.company || o.contactName}
                          <span className="ml-2 text-muted-foreground">{date(o.createdAt)}</span>
                        </span>
                        <StatusPill status={o.status} />
                        <PaymentPill status={o.paymentStatus} />
                        <span className="w-24 text-right font-semibold">{money(o.totalCents)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-10 text-center text-sm text-muted-foreground">No orders yet.</p>
              )}
            </Card>

            <Card>
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h2 className="font-bold">Low stock</h2>
              </div>
              {data.lowStock.length ? (
                <ul className="divide-y">
                  {data.lowStock.map((p) => (
                    <li key={p.id}>
                      <Link href={`/admin/products/${p.id}`} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-secondary/60">
                        <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1 truncate">{p.name}</span>
                        <span className={p.stock === 0 ? "font-bold text-destructive" : "font-bold text-amber-600"}>
                          {p.stock}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-10 text-center text-sm text-muted-foreground">All stocked items are above 5.</p>
              )}
            </Card>
          </div>
        </>
      )}
    </>
  );
}
