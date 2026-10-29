"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Drawer, EmptyRow, LoadingRows, PageHeader, Table, Td, Th, Toggle } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { api } from "@/lib/api";
import type { Category } from "@/lib/types";

interface AdminBrand {
  id: string;
  slug: string;
  name: string;
  description: string;
  website: string | null;
  isFeatured: boolean;
  categories: { id: string; name: string }[];
  _count: { products: number };
}

function BrandForm({ brand, onDone }: { brand: AdminBrand | null; onDone: () => void }) {
  const qc = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api<Category[]>("/admin/categories"),
  });
  const [featured, setFeatured] = useState(brand?.isFeatured ?? false);
  const [cats, setCats] = useState<string[]>(brand?.categories.map((c) => c.id) ?? []);
  const save = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      brand ? api(`/admin/brands/${brand.id}`, { method: "PUT", body }) : api("/admin/brands", { method: "POST", body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "brands"] });
      toast.success("Brand saved");
      onDone();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        save.mutate({
          name: f.name,
          slug: f.slug || undefined,
          description: f.description,
          website: f.website || null,
          isFeatured: featured,
          categoryIds: cats,
        });
      }}
    >
      <Field label="Name" required>
        <Input name="name" required defaultValue={brand?.name} />
      </Field>
      <Field label="URL slug">
        <Input name="slug" defaultValue={brand?.slug} className="font-mono" />
      </Field>
      <Field label="What they make">
        <Input name="description" maxLength={300} defaultValue={brand?.description} />
      </Field>
      <Field label="Website" hint="Include https://">
        <Input name="website" type="url" defaultValue={brand?.website ?? ""} />
      </Field>
      <Toggle label="Featured" description="Shown in the home page brand marquee." checked={featured} onChange={setFeatured} />
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Categories</legend>
        <div className="grid grid-cols-2 gap-2">
          {categories?.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--steel-900)]"
                checked={cats.includes(c.id)}
                onChange={(e) => setCats((list) => (e.target.checked ? [...list, c.id] : list.filter((x) => x !== c.id)))}
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <Button type="submit" size="lg" className="w-full" disabled={save.isPending}>
        {save.isPending ? "Saving…" : "Save brand"}
      </Button>
    </form>
  );
}

export default function AdminBrandsPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<AdminBrand | null | undefined>(undefined);
  const { data, isPending } = useQuery({
    queryKey: ["admin", "brands"],
    queryFn: () => api<AdminBrand[]>("/admin/brands"),
  });
  const del = useMutation({
    mutationFn: (id: string) => api(`/admin/brands/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "brands"] });
      toast.success("Brand deleted");
    },
    onError: (e) => toast.error(e.message),
  });

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (data ?? []).filter((b) => !t || b.name.toLowerCase().includes(t) || b.description.toLowerCase().includes(t));
  }, [data, q]);

  return (
    <>
      <PageHeader
        title="Brands"
        description="The supplier directory shown on /brands, plus product brand options."
        actions={
          <Button onClick={() => setEditing(null)}>
            <Plus className="h-4 w-4" /> New brand
          </Button>
        }
      />
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Filter ${data?.length ?? ""} brands…`}
          className="h-10 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Brand</Th>
            <Th>Categories</Th>
            <Th className="text-right">Products</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <LoadingRows cols={4} />
          ) : !rows.length ? (
            <EmptyRow cols={4}>No brands match.</EmptyRow>
          ) : (
            rows.map((b) => (
              <tr key={b.id} className="hover:bg-secondary/60">
                <Td>
                  <div className="flex items-center gap-2 font-semibold">
                    {b.name}
                    {b.isFeatured && <Star className="h-4 w-4 fill-primary text-primary" aria-label="Featured" />}
                    {b.website && (
                      <a href={b.website} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="Website">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{b.description}</div>
                </Td>
                <Td className="text-xs text-muted-foreground">{b.categories.map((c) => c.name).join(", ") || "—"}</Td>
                <Td className="text-right">{b._count.products}</Td>
                <Td className="whitespace-nowrap text-right">
                  <button type="button" aria-label={`Edit ${b.name}`} onClick={() => setEditing(b)} className="rounded p-2 hover:bg-secondary">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${b.name}`}
                    onClick={() => confirm(`Delete "${b.name}"? Its products will keep working without a brand.`) && del.mutate(b.id)}
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
      <Drawer open={editing !== undefined} title={editing ? `Edit ${editing.name}` : "New brand"} onClose={() => setEditing(undefined)}>
        {editing !== undefined && <BrandForm key={editing?.id ?? "new"} brand={editing} onDone={() => setEditing(undefined)} />}
      </Drawer>
    </>
  );
}
