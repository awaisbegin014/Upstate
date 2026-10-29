"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, centsToDollars, dollarsToCents, PageHeader, Toggle } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { useStoreSettings } from "@/hooks/use-cart";
import { api } from "@/lib/api";

interface Settings {
  taxRateBps: number;
  flatShippingCents: number;
  freeShippingThresholdCents: number;
  pickupEnabled: boolean;
  invoiceEnabled: boolean;
  updatedAt?: string;
}

function SettingsForm({ data, cardOn }: { data: Settings; cardOn: boolean }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    tax: String(data.taxRateBps / 100),
    flat: centsToDollars(data.flatShippingCents),
    free: centsToDollars(data.freeShippingThresholdCents),
    pickup: data.pickupEnabled,
    invoice: data.invoiceEnabled,
  });

  const save = useMutation({
    mutationFn: (body: Settings) => api<Settings>("/admin/settings", { method: "PUT", body }),
    onSuccess: (s) => {
      qc.setQueryData(["admin", "settings"], s);
      qc.invalidateQueries({ queryKey: ["store-settings"] });
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Settings saved");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <form
      className="grid max-w-4xl gap-6 lg:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate({
          taxRateBps: Math.round(Number(form.tax) * 100) || 0,
          flatShippingCents: dollarsToCents(form.flat),
          freeShippingThresholdCents: dollarsToCents(form.free),
          pickupEnabled: form.pickup,
          invoiceEnabled: form.invoice,
        });
      }}
    >
      <Card className="space-y-4 p-6">
        <h2 className="font-bold">Tax &amp; shipping</h2>
        <Field label="Sales tax rate (%)" hint="Applied to goods and shipping. Schenectady County is 8%.">
          <Input inputMode="decimal" value={form.tax} onChange={(e) => setForm({ ...form, tax: e.target.value })} />
        </Field>
        <Field label="Flat shipping ($)" hint="Charged on shipped orders below the free-shipping threshold.">
          <Input inputMode="decimal" value={form.flat} onChange={(e) => setForm({ ...form, flat: e.target.value })} />
        </Field>
        <Field label="Free shipping over ($)" hint="Set to 0 to turn free shipping off.">
          <Input inputMode="decimal" value={form.free} onChange={(e) => setForm({ ...form, free: e.target.value })} />
        </Field>
      </Card>
      <div className="space-y-6">
        <Card className="space-y-3 p-6">
          <h2 className="font-bold">Checkout options</h2>
          <Toggle
            label="Local pickup"
            description="Free pickup at 1417 Crane Street."
            checked={form.pickup}
            onChange={(v) => setForm({ ...form, pickup: v })}
          />
          <Toggle
            label="Pay on invoice"
            description="Orders are placed unpaid; you invoice the customer."
            checked={form.invoice}
            onChange={(v) => setForm({ ...form, invoice: v })}
          />
        </Card>
        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold">
            <CreditCard className="h-5 w-5" /> Card payments (Stripe)
          </h2>
          <p className="mt-2 text-sm">
            Status:{" "}
            <span className={cardOn ? "font-semibold text-success" : "font-semibold text-muted-foreground"}>
              {cardOn ? "Enabled" : "Not configured"}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Card checkout turns on when <code>STRIPE_SECRET_KEY</code> and <code>STRIPE_WEBHOOK_SECRET</code> are set in
            the backend&apos;s <code>.env</code>. Point the Stripe webhook at <code>/api/payments/stripe/webhook</code>.
          </p>
        </Card>
        <Button type="submit" size="lg" disabled={save.isPending}>
          {save.isPending ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </form>
  );
}

export default function AdminSettingsPage() {
  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => api<Settings>("/admin/settings"),
  });
  const { data: publicSettings } = useStoreSettings();

  return (
    <>
      <PageHeader title="Store settings" description="Tax, shipping and checkout options." />
      {data ? (
        <SettingsForm key={data.updatedAt} data={data} cardOn={publicSettings?.paymentMethods.card ?? false} />
      ) : (
        <div className="h-80 max-w-4xl animate-pulse rounded-xl bg-card" />
      )}
    </>
  );
}
