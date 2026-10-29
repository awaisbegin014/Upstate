"use client";

import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Brand } from "@/lib/types";
import { cn } from "@/lib/utils";

/** The alphabetical supplier list from the original "Links" page, now filterable. */
export function BrandDirectory({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: { slug: string; name: string }[];
}) {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const groups = useMemo(() => {
    const t = term.trim().toLowerCase();
    const filtered = brands.filter(
      (b) =>
        (!category || b.categories.some((c) => c.slug === category)) &&
        (!t || b.name.toLowerCase().includes(t) || b.description.toLowerCase().includes(t)),
    );
    const map = new Map<string, Brand[]>();
    for (const b of filtered) {
      const letter = /[a-z]/i.test(b.name[0]) ? b.name[0].toUpperCase() : "#";
      map.set(letter, [...(map.get(letter) ?? []), b]);
    }
    return [...map.entries()];
  }, [brands, term, category]);

  const count = groups.reduce((n, [, list]) => n + list.length, 0);
  const chip = (on: boolean) =>
    cn(
      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
      on ? "border-steel-950 bg-steel-950 text-primary" : "bg-card hover:border-primary",
    );

  return (
    <div>
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search manufacturers or products they make…"
          aria-label="Search brands"
          className="h-12 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={chip(!category)} onClick={() => setCategory(null)}>
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={chip(category === c.slug)}
            onClick={() => setCategory(category === c.slug ? null : c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{count} manufacturers</p>

      <div className="mt-6 flex flex-wrap gap-1">
        {groups.map(([letter]) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="flex h-8 w-8 items-center justify-center rounded border bg-card text-sm font-bold hover:border-primary"
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        {groups.map(([letter, list]) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
            <h2 className="border-b-4 border-primary pb-2 font-display text-4xl tracking-wide">{letter}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((b) => (
                <li key={b.id} className="flex flex-col rounded-lg border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold">{b.name}</span>
                    {b.website && (
                      <a
                        href={b.website}
                        target="_blank"
                        rel="noreferrer nofollow"
                        aria-label={`${b.name} website`}
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{b.description}</p>
                  {(b._count.products > 0 || b.categories.length > 0) && (
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
                      {b._count.products > 0 && (
                        <Link href={`/shop?brand=${b.slug}`} className="text-foreground underline underline-offset-4">
                          Shop {b._count.products} {b._count.products === 1 ? "item" : "items"}
                        </Link>
                      )}
                      {b.categories.map((c) => (
                        <Link key={c.slug} href={`/shop/${c.slug}`} className="text-muted-foreground hover:text-foreground">
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
