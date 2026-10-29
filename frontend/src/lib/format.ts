import type { OrderStatus, PaymentStatus } from "./types";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const money = (cents: number) => usd.format(cents / 100);

export const percent = (bps: number) =>
  `${(bps / 100).toLocaleString("en-US", { maximumFractionDigits: 3 })}%`;

export const date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const dateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  PLACED: "Received",
  PROCESSING: "Processing",
  READY_FOR_PICKUP: "Ready for pickup",
  SHIPPED: "Shipped",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_TONE: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "bg-amber-100 text-amber-900",
  PLACED: "bg-sky-100 text-sky-900",
  PROCESSING: "bg-indigo-100 text-indigo-900",
  READY_FOR_PICKUP: "bg-violet-100 text-violet-900",
  SHIPPED: "bg-teal-100 text-teal-900",
  COMPLETED: "bg-emerald-100 text-emerald-900",
  CANCELLED: "bg-zinc-200 text-zinc-700",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  UNPAID: "Unpaid",
  PAID: "Paid",
  REFUNDED: "Refunded",
};

export const PAYMENT_STATUS_TONE: Record<PaymentStatus, string> = {
  UNPAID: "bg-amber-100 text-amber-900",
  PAID: "bg-emerald-100 text-emerald-900",
  REFUNDED: "bg-zinc-200 text-zinc-700",
};

export const PAYMENT_METHOD_LABEL = {
  CARD: "Credit card",
  INVOICE: "Pay on invoice",
} as const;
