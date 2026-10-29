"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border bg-card", className)}>{children}</div>;
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th className={cn("border-b bg-secondary/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground", className)}>
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn("border-b px-4 py-3 align-middle", className)}>{children}</td>;
}

export function EmptyRow({ cols, children }: { cols: number; children: React.ReactNode }) {
  return (
    <tr>
      <td colSpan={cols} className="px-4 py-12 text-center text-muted-foreground">
        {children}
      </td>
    </tr>
  );
}

export function LoadingRows({ cols, rows = 6 }: { cols: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i}>
          {Array.from({ length: cols }, (_, j) => (
            <td key={j} className="border-b px-4 py-4">
              <div className="h-4 animate-pulse rounded bg-secondary" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function Pager({
  page,
  totalPages,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <span>{total} total</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="rounded-md border bg-card p-2 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          className="rounded-md border bg-card p-2 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/** Slide-over panel for create/edit forms. */
export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal aria-label={title}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border bg-card p-4">
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {description && <span className="block text-xs text-muted-foreground">{description}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-steel-950" : "bg-zinc-300",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[22px] bg-primary" : "left-0.5",
          )}
        />
      </button>
    </label>
  );
}

/** Parses "$1,234.50" style input to integer cents (NaN-safe). */
export function dollarsToCents(v: string) {
  const n = Number(String(v).replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

export const centsToDollars = (c: number | null | undefined) => (c == null ? "" : (c / 100).toFixed(2));
