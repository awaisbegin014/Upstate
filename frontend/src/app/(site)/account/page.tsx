"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { StatusPill } from "@/components/site/order-summary";
import { Container } from "@/components/site/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { SESSION_KEY, useAuthActions, useSession } from "@/hooks/use-session";
import { api } from "@/lib/api";
import { date, money } from "@/lib/format";
import type { Order, User } from "@/lib/types";

type OrderRow = Pick<Order, "id" | "number" | "status" | "totalCents" | "createdAt"> & {
  items: { id: string; name: string; quantity: number }[];
};

function Orders() {
  const { data, isPending } = useQuery({
    queryKey: ["orders", "mine"],
    queryFn: () => api<OrderRow[]>("/orders"),
  });
  if (isPending) return <div className="h-40 animate-pulse rounded-xl bg-secondary" />;
  if (!data?.length) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center">
        <Package className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-semibold">No orders yet</p>
        <ButtonLink href="/shop" className="mt-5" size="sm">
          Start shopping
        </ButtonLink>
      </div>
    );
  }
  return (
    <ul className="divide-y rounded-xl border bg-card">
      {data.map((o) => (
        <li key={o.id}>
          <Link href={`/account/orders/${o.number}`} className="flex items-center gap-4 p-5 hover:bg-secondary/60">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold">{o.number}</span>
                <StatusPill status={o.status} />
              </div>
              <div className="mt-1 truncate text-sm text-muted-foreground">
                {date(o.createdAt)} · {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
              </div>
            </div>
            <span className="font-semibold">{money(o.totalCents)}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Profile({ user }: { user: User }) {
  const qc = useQueryClient();
  const save = useMutation({
    mutationFn: (body: Record<string, string>) => api<{ user: User }>("/auth/me", { method: "PATCH", body }),
    onSuccess: ({ user }) => {
      qc.setQueryData(SESSION_KEY, { user });
      toast.success("Profile saved");
    },
    onError: (e) => toast.error(e.message),
  });
  const password = useMutation({
    mutationFn: (body: Record<string, string>) => api("/auth/password", { method: "POST", body }),
    onSuccess: () => toast.success("Password changed"),
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <form
        className="space-y-4 rounded-xl border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate(Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>);
        }}
      >
        <h2 className="text-lg font-bold">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name">
            <Input name="firstName" defaultValue={user.firstName} required />
          </Field>
          <Field label="Last name">
            <Input name="lastName" defaultValue={user.lastName} required />
          </Field>
        </div>
        <Field label="Company">
          <Input name="company" defaultValue={user.company ?? ""} />
        </Field>
        <Field label="Phone">
          <Input name="phone" type="tel" defaultValue={user.phone ?? ""} />
        </Field>
        <p className="text-sm text-muted-foreground">Email: {user.email}</p>
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? "Saving…" : "Save profile"}
        </Button>
      </form>
      <form
        className="space-y-4 rounded-xl border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          password.mutate(Object.fromEntries(new FormData(form).entries()) as Record<string, string>, {
            onSuccess: () => form.reset(),
          });
        }}
      >
        <h2 className="text-lg font-bold">Change password</h2>
        <Field label="Current password">
          <Input name="currentPassword" type="password" required autoComplete="current-password" />
        </Field>
        <Field label="New password" hint="At least 8 characters.">
          <Input name="newPassword" type="password" required minLength={8} autoComplete="new-password" />
        </Field>
        <Button type="submit" variant="outline" disabled={password.isPending}>
          Update password
        </Button>
      </form>
    </div>
  );
}

export default function AccountPage() {
  const { user, isPending } = useSession();
  const { logout } = useAuthActions();
  const router = useRouter();
  // Signing out also clears the session; don't treat that as "please sign in".
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!isPending && !user && !leaving) router.replace("/login?next=/account");
  }, [isPending, user, leaving, router]);

  if (!user) {
    return (
      <div className="pt-16">
        <Container className="py-12">
          <div className="h-96 animate-pulse rounded-xl bg-secondary" />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-secondary pt-16">
      <Container className="py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">My account</p>
            <h1 className="font-display text-6xl tracking-wide">Hi, {user.firstName}</h1>
          </div>
          <div className="flex gap-2">
            {user.role === "ADMIN" && <ButtonLink href="/admin" variant="dark">Admin panel</ButtonLink>}
            <Button
              variant="outline"
              onClick={() => {
                setLeaving(true);
                logout.mutate(undefined, { onSettled: () => router.push("/") });
              }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <h2 className="mb-4 text-lg font-bold">Order history</h2>
            <Orders />
          </section>
          <Profile user={user} />
        </div>
      </Container>
    </div>
  );
}
