"use client";

import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Props {
  /** Pre-selects "quote" and links the request to this product. */
  product?: { slug: string; name: string };
  defaultKind?: "QUOTE" | "CONTACT";
  dark?: boolean;
}

/** Quote request / contact form. Saved to the admin panel's Inquiries list. */
export function InquiryForm({ product, defaultKind = "QUOTE", dark }: Props) {
  const [done, setDone] = useState(false);
  const send = useMutation({
    mutationFn: (body: Record<string, unknown>) => api("/inquiries", { method: "POST", body }),
    onSuccess: () => setDone(true),
  });

  if (done) {
    return (
      <div
        className={cn(
          "rounded-xl border p-8 text-center",
          dark ? "border-white/10 bg-steel-900 text-white" : "bg-card",
        )}
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 font-display text-3xl tracking-wide">Thanks — we got it.</h3>
        <p className={cn("mt-2", dark ? "text-white/70" : "text-muted-foreground")}>
          Someone from our team will get back to you, usually within one business day. Need it
          faster? Call 518.370.7000.
        </p>
      </div>
    );
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    send.mutate({
      ...Object.fromEntries(form.entries()),
      ...(product ? { productSlug: product.slug } : {}),
    });
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid gap-4 rounded-xl border p-6 sm:grid-cols-2 sm:p-8",
        dark ? "border-white/10 bg-steel-900 text-white [&_span]:text-white/90" : "bg-card shadow-sm",
      )}
    >
      {product ? (
        <div className={cn("rounded-md p-3 text-sm sm:col-span-2", dark ? "bg-steel-800" : "bg-secondary")}>
          Quote request for <strong>{product.name}</strong>
        </div>
      ) : (
        <Field label="I'd like to" className="sm:col-span-2">
          <Select name="kind" defaultValue={defaultKind} className={dark ? "bg-steel-950 text-white" : ""}>
            <option value="QUOTE">Request a quote or site visit</option>
            <option value="CONTACT">Ask a question</option>
          </Select>
        </Field>
      )}
      <Field label="Name" required>
        <Input name="name" required autoComplete="name" className={dark ? "bg-steel-950 text-white" : ""} />
      </Field>
      <Field label="Company">
        <Input name="company" autoComplete="organization" className={dark ? "bg-steel-950 text-white" : ""} />
      </Field>
      <Field label="Email" required>
        <Input name="email" type="email" required autoComplete="email" className={dark ? "bg-steel-950 text-white" : ""} />
      </Field>
      <Field label="Phone">
        <Input name="phone" type="tel" autoComplete="tel" className={dark ? "bg-steel-950 text-white" : ""} />
      </Field>
      <Field label="What do you need?" required className="sm:col-span-2">
        <Textarea
          name="message"
          required
          minLength={5}
          placeholder="Equipment, quantities, dimensions, timeline, location…"
          className={dark ? "bg-steel-950 text-white" : ""}
        />
      </Field>
      {/* Honeypot for bots — hidden from people and screen readers. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" size="lg" disabled={send.isPending}>
          {send.isPending ? "Sending…" : product ? "Request a quote" : "Send"}
        </Button>
        {send.error && <p className="text-sm font-medium text-destructive">{send.error.message}</p>}
      </div>
    </form>
  );
}
