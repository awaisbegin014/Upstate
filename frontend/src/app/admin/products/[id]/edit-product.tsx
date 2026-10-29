"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm, type AdminProduct } from "@/components/admin/product-form";
import { PageHeader } from "@/components/admin/ui";
import { api } from "@/lib/api";

export function EditProduct({ id }: { id: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "product", id],
    queryFn: () => api<AdminProduct>(`/admin/products/${id}`),
  });

  return (
    <>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All products
      </Link>
      {isPending ? (
        <div className="h-96 animate-pulse rounded-xl bg-card" />
      ) : error || !data ? (
        <p className="text-destructive">{error?.message ?? "Product not found."}</p>
      ) : (
        <>
          <PageHeader title={data.name} description={`SKU ${data.sku}`} />
          {/* key resets form state if another product loads into the same page */}
          <ProductForm key={data.id} product={data} />
        </>
      )}
    </>
  );
}
