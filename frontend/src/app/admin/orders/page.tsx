"use client";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmptyRow, LoadingRows, PageHeader, Pager, Table, Td, Th } from "@/components/admin/ui";
import { PaymentPill, StatusPill } from "@/components/site/order-summary";
import { api, qs } from "@/lib/api";
import { dateTime, money, ORDER_STATUS_LABEL, PAYMENT_METHOD_LABEL } from "@/lib/format";
import type { Order, OrderStatus, Page } from "@/lib/types";
import { cn } from "@/lib/utils";

type Row = Order & { _count: { items: number } };

const TABS: (OrderStatus | "")[] = [
  "",
  "PLACED",
  "PROCESSING",
  "READY_FOR_PICKUP",
  "SHIPPED",
  "COMPLETED",
  "PENDING_PAYMENT",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [q, setQ] = useState("");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["admin", "orders", status, term, page],
    queryFn: () => api<Page<Row>>(`/admin/orders${qs({ status, q: term, page })}`),
    placeholderData: (prev) => prev,
  });

  return (
    <>
      <PageHeader title="Orders" description="Every online order, newest first." />
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((s) => (
          <button
            key={s || "all"}
            type="button"
            onClick={() => {
              setStatus(s);
              setPage(1);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold",
              status === s ? "border-steel-950 bg-steel-950 text-primary" : "bg-card hover:border-primary",
            )}
          >
            {s ? ORDER_STATUS_LABEL[s] : "All"}
          </button>
        ))}
      </div>
      <form
        className="relative mb-4 max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          setTerm(q.trim());
          setPage(1);
        }}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search number, name, company, email, PO…"
          className="h-10 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </form>
      <Table>
        <thead>
          <tr>
            <Th>Order</Th>
            <Th>Placed</Th>
            <Th>Customer</Th>
            <Th>Delivery</Th>
            <Th>Payment</Th>
            <Th>Status</Th>
            <Th className="text-right">Total</Th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <LoadingRows cols={7} />
          ) : !data?.items.length ? (
            <EmptyRow cols={7}>No orders found.</EmptyRow>
          ) : (
            data.items.map((o) => (
              <tr
                key={o.id}
                onClick={() => router.push(`/admin/orders/${o.number}`)}
                className="cursor-pointer hover:bg-secondary/60"
              >
                <Td className="font-semibold">{o.number}</Td>
                <Td className="whitespace-nowrap text-muted-foreground">{dateTime(o.createdAt)}</Td>
                <Td>
                  <div className="font-medium">{o.company || o.contactName}</div>
                  <div className="text-xs text-muted-foreground">{o.email}</div>
                </Td>
                <Td>{o.fulfillment === "PICKUP" ? "Pickup" : `${o.shipCity}, ${o.shipState}`}</Td>
                <Td>
                  <div className="text-xs text-muted-foreground">{PAYMENT_METHOD_LABEL[o.paymentMethod]}</div>
                  <PaymentPill status={o.paymentStatus} />
                </Td>
                <Td>
                  <StatusPill status={o.status} />
                </Td>
                <Td className="text-right font-semibold">{money(o.totalCents)}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {data && <Pager page={data.page} totalPages={data.totalPages} total={data.total} onChange={setPage} />}
    </>
  );
}
