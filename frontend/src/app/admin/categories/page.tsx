"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUploadButton } from "@/components/admin/image-upload";
import { Drawer, EmptyRow, LoadingRows, PageHeader, Table, Td, Th } from "@/components/admin/ui";
import { Icon, ICON_KEYS } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { api } from "@/lib/api";
import type { Category } from "@/lib/types";

function CategoryForm({ category, onDone }: { category: Category | null; onDone: () => void }) {
  const qc = useQueryClient();
  const [icon, setIcon] = useState(category?.icon ?? "package");
  const [imageUrl, setImageUrl] = useState(category?.imageUrl ?? "");
  const save = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      category
        ? api(`/admin/categories/${category.id}`, { method: "PUT", body })
        : api("/admin/categories", { method: "POST", body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category saved");
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
          tagline: f.tagline,
          description: f.description,
          icon,
          imageUrl: imageUrl || null,
          sortOrder: Number(f.sortOrder) || 0,
        });
      }}
    >
      <Field label="Name" required>
        <Input name="name" required defaultValue={category?.name} />
      </Field>
      <Field label="URL slug" hint={`Shop URL: /shop/${category?.slug ?? "…"}`}>
        <Input name="slug" defaultValue={category?.slug} className="font-mono" />
      </Field>
      <Field label="Tagline" hint="One line on category cards.">
        <Input name="tagline" maxLength={200} defaultValue={category?.tagline} />
      </Field>
      <Field label="Description" hint="Shown at the top of the category page.">
        <Textarea name="description" defaultValue={category?.description} className="min-h-32" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Icon">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/20">
              <Icon name={icon} className="h-5 w-5" />
            </span>
            <Select value={icon} onChange={(e) => setIcon(e.target.value)}>
              {ICON_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </Select>
          </div>
        </Field>
        <Field label="Sort order">
          <Input name="sortOrder" type="number" min={0} defaultValue={category?.sortOrder ?? 0} />
        </Field>
      </div>
      <Field label="Banner image" hint="Optional background for the category page header.">
        <div className="flex items-center gap-3">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-14 w-20 rounded object-cover" />
          )}
          <ImageUploadButton multiple={false} label={imageUrl ? "Replace" : "Upload"} onUploaded={setImageUrl} />
          {imageUrl && (
            <button type="button" onClick={() => setImageUrl("")} className="text-sm font-semibold text-destructive">
              Remove
            </button>
          )}
        </div>
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={save.isPending}>
        {save.isPending ? "Saving…" : "Save category"}
      </Button>
    </form>
  );
}

export default function AdminCategoriesPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Category | null | undefined>(undefined);
  const { data, isPending } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api<Category[]>("/admin/categories"),
  });
  const del = useMutation({
    mutationFn: (id: string) => api(`/admin/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category deleted");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        title="Categories"
        description="The twelve shop departments. Brands link to categories from the Brands page."
        actions={
          <Button onClick={() => setEditing(null)}>
            <Plus className="h-4 w-4" /> New category
          </Button>
        }
      />
      <Table>
        <thead>
          <tr>
            <Th className="w-12" />
            <Th>Category</Th>
            <Th className="text-right">Products</Th>
            <Th className="text-right">Brands</Th>
            <Th className="text-right">Order</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <LoadingRows cols={6} />
          ) : !data?.length ? (
            <EmptyRow cols={6}>No categories.</EmptyRow>
          ) : (
            data.map((c) => (
              <tr key={c.id} className="hover:bg-secondary/60">
                <Td>
                  <Icon name={c.icon} className="h-5 w-5" />
                </Td>
                <Td>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">/shop/{c.slug}</div>
                </Td>
                <Td className="text-right">{c.productCount}</Td>
                <Td className="text-right">{c.brandCount}</Td>
                <Td className="text-right">{c.sortOrder}</Td>
                <Td className="whitespace-nowrap text-right">
                  <button type="button" aria-label={`Edit ${c.name}`} onClick={() => setEditing(c)} className="rounded p-2 hover:bg-secondary">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${c.name}`}
                    onClick={() => confirm(`Delete "${c.name}"?`) && del.mutate(c.id)}
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
      <Drawer
        open={editing !== undefined}
        title={editing ? `Edit ${editing.name}` : "New category"}
        onClose={() => setEditing(undefined)}
      >
        {editing !== undefined && (
          <CategoryForm key={editing?.id ?? "new"} category={editing} onDone={() => setEditing(undefined)} />
        )}
      </Drawer>
    </>
  );
}
