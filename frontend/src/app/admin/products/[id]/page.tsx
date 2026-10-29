import { Suspense } from "react";
import { EditProduct } from "./edit-product";

export default function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-card" />}>
      <Resolved params={params} />
    </Suspense>
  );
}

async function Resolved({ params }: { params: PageProps<"/admin/products/[id]">["params"] }) {
  const { id } = await params;
  return <EditProduct id={id} />;
}
