"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, Mail, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Card, PageHeader, Pager } from "@/components/admin/ui";
import { api, qs } from "@/lib/api";
import { dateTime } from "@/lib/format";
import type { Inquiry, Page } from "@/lib/types";
import { cn } from "@/lib/utils";

type Status = Inquiry["status"];
const LABEL: Record<Status, string> = { NEW: "New", IN_PROGRESS: "In progress", CLOSED: "Closed" };
const TONE: Record<Status, string> = {
  NEW: "bg-amber-100 text-amber-900",
  IN_PROGRESS: "bg-sky-100 text-sky-900",
  CLOSED: "bg-zinc-200 text-zinc-700",
};

export default function AdminInquiriesPage() {
  const qc = useQueryClient();
  const [status, setStatus] = useState<Status | "">("NEW");
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["admin", "inquiries", status, page],
    queryFn: () => api<Page<Inquiry>>(`/admin/inquiries${qs({ status, page })}`),
    placeholderData: (prev) => prev,
  });
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    qc.invalidateQueries({ queryKey: ["admin", "stats"] });
  };
  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      api(`/admin/inquiries/${id}`, { method: "PATCH", body: { status } }),
    onSuccess: refresh,
    onError: (e) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => api(`/admin/inquiries/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      refresh();
      toast.success("Deleted");
    },
  });

  return (
    <>
      <PageHeader title="Inquiries" description="Quote requests and messages from the website." />
      <div className="mb-4 flex flex-wrap gap-2">
        {(["NEW", "IN_PROGRESS", "CLOSED", ""] as const).map((s) => (
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
            {s ? LABEL[s] : "All"}
          </button>
        ))}
      </div>

      {isPending ? (
        <div className="h-64 animate-pulse rounded-xl bg-card" />
      ) : !data?.items.length ? (
        <Card className="p-12 text-center text-muted-foreground">Nothing here.</Card>
      ) : (
        <div className="space-y-4">
          {data.items.map((i) => (
            <Card key={i.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{i.name}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", TONE[i.status])}>{LABEL[i.status]}</span>
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold">
                      {i.kind === "QUOTE" ? "Quote request" : "Question"}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{dateTime(i.createdAt)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={i.status}
                    onChange={(e) => update.mutate({ id: i.id, status: e.target.value as Status })}
                    className="h-8 rounded-md border bg-card px-2 text-xs"
                    aria-label="Status"
                  >
                    {(Object.keys(LABEL) as Status[]).map((s) => (
                      <option key={s} value={s}>
                        {LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    aria-label="Delete inquiry"
                    onClick={() => confirm("Delete this inquiry?") && del.mutate(i.id)}
                    className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {i.productName && (
                <p className="mt-3 text-sm">
                  Product:{" "}
                  <Link href={`/products/${i.productSlug}`} target="_blank" className="font-semibold underline underline-offset-4">
                    {i.productName}
                  </Link>
                </p>
              )}
              <p className="mt-3 whitespace-pre-line rounded-md bg-secondary/60 p-4 text-sm">{i.message}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a href={`mailto:${i.email}?subject=Re: your request to Upstate Equipment`} className="inline-flex items-center gap-1.5 font-semibold hover:underline">
                  <Mail className="h-4 w-4" /> {i.email}
                </a>
                {i.phone && (
                  <a href={`tel:${i.phone}`} className="inline-flex items-center gap-1.5 font-semibold hover:underline">
                    <Phone className="h-4 w-4" /> {i.phone}
                  </a>
                )}
                {i.company && (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="h-4 w-4" /> {i.company}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
      {data && <Pager page={data.page} totalPages={data.totalPages} total={data.total} onChange={setPage} />}
    </>
  );
}
