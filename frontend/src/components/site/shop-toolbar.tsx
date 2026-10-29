"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

const SORTS = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["name", "Name A–Z"],
] as const;

/** Search, sort and stock filter. State lives in the URL so results are shareable. */
export function ShopToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [term, setTerm] = useState(params.get("q") ?? "");

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    next.delete("page");
    const s = next.toString();
    startTransition(() => router.push(s ? `${pathname}?${s}` : pathname, { scroll: false }));
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3 transition-opacity", pending && "opacity-60")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          update({ q: term.trim() || null });
        }}
        className="relative min-w-56 flex-1"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by name, brand or SKU"
          aria-label="Search products"
          className="h-11 w-full rounded-md border bg-card pl-9 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        {term && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setTerm("");
              update({ q: null });
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      <label className="flex h-11 cursor-pointer items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium">
        <input
          type="checkbox"
          className="h-4 w-4 accent-[var(--steel-900)]"
          checked={params.get("inStock") === "1"}
          onChange={(e) => update({ inStock: e.target.checked ? "1" : null })}
        />
        In stock only
      </label>
      <select
        aria-label="Sort products"
        value={params.get("sort") ?? "featured"}
        onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
        className="h-11 rounded-md border bg-card px-3 text-sm font-medium outline-none focus:border-primary"
      >
        {SORTS.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ShopToolbarFallback() {
  return <div className="h-11 animate-pulse rounded-md bg-secondary" />;
}
