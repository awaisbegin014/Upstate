"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyRow, LoadingRows, PageHeader, Pager, Table, Td, Th } from "@/components/admin/ui";
import { ProductImage } from "@/components/site/product-image";
import { ButtonLink } from "@/components/ui/button";
import { api, qs } from "@/lib/api";
import { money } from "@/lib/format";
import type { Category, Page } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Row {
  id: string;
  slug: string;
  sku: string;
  name: string;
  priceCents: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  isQuoteOnly: boolean;
  images: { url: string }[];
  category: { id: string; name: string; icon: string };
  brand: { name: string } | null;
}

export default function AdminProductsPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [term, setTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api<Category[]>("/admin/categories"),
  });
  const { data, isPending } = useQuery({
    queryKey: ["admin", "products", term, categoryId, status, page],
    queryFn: () => api<Page<Row>>(`/admin/products${qs({ q: term, categoryId, status, page })}`),
    placeholderData: (prev) => prev,
  });

  const del = useMutation({
    mutationFn: (id: string) => api(`/admin/products/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product deleted");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        title="Products"
        description="Prices, stock and what appears in the online store."
        actions={
          <ButtonLink href="/admin/products/new">
            <Plus className="h-4 w-4" /> New product
          </ButtonLink>
        }
      />
      <div className="mb-4 flex flex-wrap gap-3">
        <form
          className="relative min-w-60 flex-1"
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
            placeholder="Search name or SKU…"
            className="h-10 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </form>
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border bg-card px-3 text-sm"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border bg-card px-3 text-sm"
          aria-label="Filter by status"
        >
          <option value="">Any status</option>
          <option value="active">Active</option>
          <option value="inactive">Hidden</option>
          <option value="low-stock">Low stock (≤ 5)</option>
        </select>
      </div>
      <Table>
        <thead>
          <tr>
            <Th className="w-16" />
            <Th>Product</Th>
            <Th>Category</Th>
            <Th className="text-right">Price</Th>
            <Th className="text-right">Stock</Th>
            <Th>Status</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <LoadingRows cols={7} />
          ) : !data?.items.length ? (
            <EmptyRow cols={7}>No products match.</EmptyRow>
          ) : (
            data.items.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/60">
                <Td>
                  <div className="h-12 w-12 overflow-hidden rounded-md border">
                    <ProductImage src={p.images[0]?.url} alt="" icon={p.category.icon} size="sm" />
                  </div>
                </Td>
                <Td>
                  <Link href={`/admin/products/${p.id}`} className="font-semibold hover:underline">
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {p.sku}
                    {p.brand && ` · ${p.brand.name}`}
                  </div>
                </Td>
                <Td className="text-muted-foreground">{p.category.name}</Td>
                <Td className="text-right font-semibold">{p.isQuoteOnly ? "Quote" : money(p.priceCents)}</Td>
                <Td
                  className={cn(
                    "text-right font-semibold",
                    !p.isQuoteOnly && p.stock === 0 && "text-destructive",
                    !p.isQuoteOnly && p.stock > 0 && p.stock <= 5 && "text-amber-600",
                  )}
                >
                  {p.isQuoteOnly ? "—" : p.stock}
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        p.isActive ? "bg-emerald-100 text-emerald-900" : "bg-zinc-200 text-zinc-700",
                      )}
                    >
                      {p.isActive ? "Active" : "Hidden"}
                    </span>
                    {p.isFeatured && <Star className="h-4 w-4 fill-primary text-primary" aria-label="Featured" />}
                  </div>
                </Td>
                <Td className="text-right">
                  <button
                    type="button"
                    aria-label={`Delete ${p.name}`}
                    onClick={() => {
                      if (confirm(`Delete "${p.name}"? Past orders keep their copy. To just hide it, edit and turn off "Active".`))
                        del.mutate(p.id);
                    }}
                    className="rounded p-2 text-muted-foreground hover:bg-red-50 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {data && <Pager page={data.page} totalPages={data.totalPages} total={data.total} onChange={setPage} />}
    </>
  );
}
