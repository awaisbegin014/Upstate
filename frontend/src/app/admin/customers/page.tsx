"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyRow, LoadingRows, PageHeader, Pager, Table, Td, Th } from "@/components/admin/ui";
import { useSession } from "@/hooks/use-session";
import { api, qs } from "@/lib/api";
import { date, money } from "@/lib/format";
import type { Page, Role } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  company: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
  orderCount: number;
  paidTotalCents: number;
}

export default function AdminCustomersPage() {
  const qc = useQueryClient();
  const { user: me } = useSession();
  const [q, setQ] = useState("");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["admin", "customers", term, page],
    queryFn: () => api<Page<Customer>>(`/admin/customers${qs({ q: term, page })}`),
    placeholderData: (prev) => prev,
  });
  const update = useMutation({
    mutationFn: ({ id, ...body }: { id: string; isActive?: boolean; role?: Role }) =>
      api(`/admin/customers/${id}`, { method: "PATCH", body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "customers"] });
      toast.success("Account updated");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Customers" description="Accounts created at checkout or sign-up." />
      <form
        className="relative mb-4 max-w-md"
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
          placeholder="Search name, email or company…"
          className="h-10 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </form>
      <Table>
        <thead>
          <tr>
            <Th>Customer</Th>
            <Th>Company</Th>
            <Th>Joined</Th>
            <Th className="text-right">Orders</Th>
            <Th className="text-right">Paid</Th>
            <Th>Role</Th>
            <Th>Access</Th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <LoadingRows cols={7} />
          ) : !data?.items.length ? (
            <EmptyRow cols={7}>No customers yet.</EmptyRow>
          ) : (
            data.items.map((c) => {
              const self = c.id === me?.id;
              return (
                <tr key={c.id} className="hover:bg-secondary/60">
                  <Td>
                    <div className="font-semibold">
                      {c.firstName} {c.lastName}
                    </div>
                    <a href={`mailto:${c.email}`} className="text-xs text-muted-foreground hover:underline">
                      {c.email}
                    </a>
                    {c.phone && <div className="text-xs text-muted-foreground">{c.phone}</div>}
                  </Td>
                  <Td>{c.company ?? "—"}</Td>
                  <Td className="whitespace-nowrap text-muted-foreground">{date(c.createdAt)}</Td>
                  <Td className="text-right">{c.orderCount}</Td>
                  <Td className="text-right font-semibold">{money(c.paidTotalCents)}</Td>
                  <Td>
                    <select
                      value={c.role}
                      disabled={self || update.isPending}
                      onChange={(e) => {
                        const role = e.target.value as Role;
                        if (role === "ADMIN" && !confirm(`Give ${c.email} full admin access?`)) return;
                        update.mutate({ id: c.id, role });
                      }}
                      className="h-8 rounded-md border bg-card px-2 text-xs"
                      aria-label="Role"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </Td>
                  <Td>
                    <button
                      type="button"
                      disabled={self || update.isPending}
                      onClick={() => update.mutate({ id: c.id, isActive: !c.isActive })}
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold disabled:opacity-60",
                        c.isActive ? "bg-emerald-100 text-emerald-900" : "bg-zinc-200 text-zinc-700",
                      )}
                      title={c.isActive ? "Click to deactivate" : "Click to reactivate"}
                    >
                      {c.isActive ? "Active" : "Deactivated"}
                    </button>
                  </Td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      {data && <Pager page={data.page} totalPages={data.totalPages} total={data.total} onChange={setPage} />}
    </>
  );
}
