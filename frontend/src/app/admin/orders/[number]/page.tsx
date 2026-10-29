import { Suspense } from "react";
import { AdminOrder } from "./admin-order";

export default function AdminOrderPage({ params }: PageProps<"/admin/orders/[number]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-card" />}>
      <Resolved params={params} />
    </Suspense>
  );
}

async function Resolved({ params }: { params: PageProps<"/admin/orders/[number]">["params"] }) {
  const { number } = await params;
  return <AdminOrder number={number} />;
}
