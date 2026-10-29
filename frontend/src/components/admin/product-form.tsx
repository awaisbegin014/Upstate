"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { api } from "@/lib/api";
import type { Category } from "@/lib/types";
import { ImageUploadButton } from "./image-upload";
import { Card, centsToDollars, dollarsToCents, Toggle } from "./ui";

export interface AdminProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  compareAtCents: number | null;
  stock: number;
  isQuoteOnly: boolean;
  isActive: boolean;
  isFeatured: boolean;
  leadTime: string | null;
  weightLbs: number | null;
  categoryId: string;
  brandId: string | null;
  images: { url: string; alt: string }[];
  specs: { label: string; value: string }[];
}

interface BrandOption {
  id: string;
  name: string;
}

function move<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function ProductForm({ product }: { product?: AdminProduct }) {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api<Category[]>("/admin/categories"),
  });
  const { data: brands } = useQuery({
    queryKey: ["admin", "brands"],
    queryFn: () => api<BrandOption[]>("/admin/brands"),
  });

  const [images, setImages] = useState(product?.images ?? []);
  const [specs, setSpecs] = useState(product?.specs ?? []);
  const [flags, setFlags] = useState({
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
    isQuoteOnly: product?.isQuoteOnly ?? false,
  });

  const save = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      product
        ? api<AdminProduct>(`/admin/products/${product.id}`, { method: "PUT", body })
        : api<AdminProduct>("/admin/products", { method: "POST", body }),
    onSuccess: (saved) => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.setQueryData(["admin", "product", saved.id], saved);
      toast.success(product ? "Product saved" : "Product created");
      if (!product) router.replace(`/admin/products/${saved.id}`);
    },
    onError: (e) => toast.error(e.message),
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    save.mutate({
      name: f.name,
      slug: f.slug || undefined,
      sku: f.sku,
      shortDescription: f.shortDescription,
      description: f.description,
      priceCents: flags.isQuoteOnly ? 0 : dollarsToCents(f.price),
      compareAtCents: f.compareAt ? dollarsToCents(f.compareAt) : null,
      stock: Math.max(0, Math.floor(Number(f.stock) || 0)),
      leadTime: f.leadTime || null,
      weightLbs: f.weightLbs ? Number(f.weightLbs) : null,
      categoryId: f.categoryId,
      brandId: f.brandId || null,
      images: images.map((img) => ({ url: img.url, alt: img.alt || undefined })),
      specs: specs
        .filter((s) => s.label.trim() && s.value.trim())
        .map((s) => ({ label: s.label, value: s.value })),
      ...flags,
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Card className="space-y-4 p-6">
          <h2 className="font-bold">Basics</h2>
          <Field label="Name" required>
            <Input name="name" required defaultValue={product?.name} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="SKU" required>
              <Input name="sku" required defaultValue={product?.sku} className="font-mono" />
            </Field>
            <Field label="URL slug" hint="Leave blank to generate from the name.">
              <Input name="slug" defaultValue={product?.slug} className="font-mono" />
            </Field>
          </div>
          <Field label="Short description" hint="One line shown on product cards.">
            <Input name="shortDescription" maxLength={300} defaultValue={product?.shortDescription} />
          </Field>
          <Field label="Full description" hint="Blank lines start new paragraphs.">
            <Textarea name="description" className="min-h-40" defaultValue={product?.description} />
          </Field>
        </Card>

        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Images</h2>
            <ImageUploadButton onUploaded={(url) => setImages((list) => [...list, { url, alt: "" }])} />
          </div>
          {images.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No images yet — the store shows a branded placeholder until you add one. The first image is the main photo.
            </p>
          ) : (
            <ul className="space-y-3">
              {images.map((img, i) => (
                <li key={`${img.url}-${i}`} className="flex items-center gap-3 rounded-lg border p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="h-16 w-16 rounded object-cover" />
                  <Input
                    value={img.alt}
                    placeholder="Alt text (describe the photo)"
                    onChange={(e) =>
                      setImages((list) => list.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))
                    }
                  />
                  <div className="flex shrink-0">
                    <button type="button" aria-label="Move up" onClick={() => setImages((l) => move(l, i, i - 1))} className="rounded p-1.5 hover:bg-secondary">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Move down" onClick={() => setImages((l) => move(l, i, i + 1))} className="rounded p-1.5 hover:bg-secondary">
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Remove image" onClick={() => setImages((l) => l.filter((_, j) => j !== i))} className="rounded p-1.5 text-destructive hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Specifications</h2>
            <Button size="sm" variant="outline" onClick={() => setSpecs((s) => [...s, { label: "", value: "" }])}>
              <Plus className="h-4 w-4" /> Add row
            </Button>
          </div>
          {specs.length === 0 && <p className="text-sm text-muted-foreground">e.g. Capacity → 1,000 lb</p>}
          {specs.map((s, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={s.label}
                placeholder="Label"
                onChange={(e) => setSpecs((l) => l.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
              />
              <Input
                value={s.value}
                placeholder="Value"
                onChange={(e) => setSpecs((l) => l.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
              />
              <button type="button" aria-label="Remove row" onClick={() => setSpecs((l) => l.filter((_, j) => j !== i))} className="rounded p-2 text-destructive hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="space-y-3 p-6">
          <h2 className="font-bold">Visibility</h2>
          <Toggle label="Active" description="Shown in the online store." checked={flags.isActive} onChange={(v) => setFlags((f) => ({ ...f, isActive: v }))} />
          <Toggle label="Featured" description="Shown on the home page." checked={flags.isFeatured} onChange={(v) => setFlags((f) => ({ ...f, isFeatured: v }))} />
          <Toggle
            label="Quote only"
            description="No cart — customers request a quote instead."
            checked={flags.isQuoteOnly}
            onChange={(v) => setFlags((f) => ({ ...f, isQuoteOnly: v }))}
          />
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="font-bold">Pricing &amp; stock</h2>
          {!flags.isQuoteOnly && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price ($)" required>
                <Input name="price" required inputMode="decimal" defaultValue={centsToDollars(product?.priceCents ?? null)} />
              </Field>
              <Field label="Compare at ($)">
                <Input name="compareAt" inputMode="decimal" defaultValue={centsToDollars(product?.compareAtCents)} />
              </Field>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Stock on hand">
              <Input name="stock" type="number" min={0} defaultValue={product?.stock ?? 0} />
            </Field>
            <Field label="Weight (lb)">
              <Input name="weightLbs" inputMode="decimal" defaultValue={product?.weightLbs ?? ""} />
            </Field>
          </div>
          <Field label="Lead time" hint='e.g. "Ships same day"'>
            <Input name="leadTime" defaultValue={product?.leadTime ?? ""} />
          </Field>
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="font-bold">Organization</h2>
          <Field label="Category" required>
            {categories ? (
              <Select name="categoryId" required defaultValue={product?.categoryId ?? ""}>
                <option value="" disabled>
                  Choose…
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            ) : (
              <div className="h-10 animate-pulse rounded-md bg-secondary" />
            )}
          </Field>
          <Field label="Brand">
            {brands ? (
              <Select name="brandId" defaultValue={product?.brandId ?? ""}>
                <option value="">No brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </Select>
            ) : (
              <div className="h-10 animate-pulse rounded-md bg-secondary" />
            )}
          </Field>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="lg" className="flex-1" disabled={save.isPending || !categories || !brands}>
            {save.isPending ? "Saving…" : product ? "Save product" : "Create product"}
          </Button>
          {product && (
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 rounded-md border px-4 text-sm font-semibold hover:border-primary"
            >
              View <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
