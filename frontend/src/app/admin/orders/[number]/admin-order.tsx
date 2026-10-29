"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Card, PageHeader } from "@/components/admin/ui";
import { OrderSummary } from "@/components/site/order-summary";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea } from "@/components/ui/field";
import { api } from "@/lib/api";
import { dateTime, ORDER_STATUS_LABEL, PAYMENT_STATUS_LABEL } from "@/lib/format";
import type { Order, OrderStatus, PaymentStatus } from "@/lib/types";

type AdminOrderData = Order & {
  user: { id: string; email: string; firstName: string; lastName: string; company: string | null };
};

const STATUSES: OrderStatus[] = ["PLACED", "PROCESSING", "READY_FOR_PICKUP", "SHIPPED", "COMPLETED", "CANCELLED"];
const PAYMENTS: PaymentStatus[] = ["UNPAID", "PAID", "REFUNDED"];

/** Status / payment / note editor. Remounted (via key) whenever the saved order changes. */
function ManagePanel({ order }: { order: AdminOrderData }) {
  const qc = useQueryClient();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [payment, setPayment] = useState<PaymentStatus>(order.paymentStatus);
  const [note, setNote] = useState(order.adminNote ?? "");

  const save = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      api<AdminOrderData>(`/admin/orders/${encodeURIComponent(order.number)}`, { method: "PATCH", body }),
    onSuccess: (updated) => {
      qc.setQueryData(["admin", "order", order.number], updated);
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      toast.success("Order updated");
    },
    onError: (e) => toast.error(e.message),
  });

  const cancelled = order.status === "CANCELLED";
  const onSave = () => {
    if (status === "CANCELLED" && !cancelled && !confirm("Cancel this order and return its items to stock?")) return;
    save.mutate({
      ...(status !== order.status ? { status } : {}),
      ...(payment !== order.paymentStatus ? { paymentStatus: payment } : {}),
      adminNote: note,
    });
  };

  return (
    <Card className="space-y-4 p-5">
      <h2 className="font-bold">Manage</h2>
      <Field label="Order status">
        <Select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)} disabled={cancelled}>
          {order.status === "PENDING_PAYMENT" && <option value="PENDING_PAYMENT">Awaiting payment</option>}
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABEL[s]}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Payment" hint={order.paymentMethod === "CARD" ? "Card refunds are issued from the Stripe dashboard." : undefined}>
        <Select value={payment} onChange={(e) => setPayment(e.target.value as PaymentStatus)}>
          {PAYMENTS.map((p) => (
            <option key={p} value={p}>
              {PAYMENT_STATUS_LABEL[p]}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Internal note" hint="Only visible to admins.">
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} className="min-h-24" />
      </Field>
      <Button onClick={onSave} disabled={save.isPending} className="w-full">
        {save.isPending ? "Saving…" : "Save changes"}
      </Button>
      {cancelled && <p className="text-xs text-muted-foreground">Cancelled orders are closed; stock was returned.</p>}
    </Card>
  );
}

export function AdminOrder({ number }: { number: string }) {
  const { data: order, isPending, error } = useQuery({
    queryKey: ["admin", "order", number],
    queryFn: () => api<AdminOrderData>(`/admin/orders/${encodeURIComponent(number)}`),
  });

  if (isPending) return <div className="h-96 animate-pulse rounded-xl bg-card" />;
  if (error || !order) return <p className="text-destructive">{error?.message ?? "Order not found."}</p>;

  return (
    <>
      <Link href="/admin/orders" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>
      <PageHeader
        title={`Order ${order.number}`}
        description={`Placed ${dateTime(order.createdAt)}${order.paidAt ? ` · paid ${dateTime(order.paidAt)}` : ""}`}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <OrderSummary order={order} />
        <div className="space-y-5">
          <ManagePanel key={order.updatedAt} order={order} />
          <Card className="p-5 text-sm">
            <h2 className="font-bold">Customer account</h2>
            <p className="mt-2">
              {order.user.firstName} {order.user.lastName}
              {order.user.company && <span className="text-muted-foreground"> · {order.user.company}</span>}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <a href={`mailto:${order.email}?subject=Your Upstate Equipment order ${order.number}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Mail className="h-4 w-4" /> {order.email}
              </a>
              <a href={`tel:${order.phone}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Phone className="h-4 w-4" /> {order.phone}
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
