import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/icon";
import { qs } from "@/lib/api";
import { serverApi } from "@/lib/server-api";
import type { Category, Page, ProductCard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductGrid, ProductGridSkeleton } from "./product-card";
import { ShopToolbar, ShopToolbarFallback } from "./shop-toolbar";

export type ShopSearchParams = Record<string, string | string[] | undefined>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

async function CategorySidebar({ active }: { active?: string }) {
  const categories = await serverApi<Category[]>("/categories");
  // Horizontal scrolling chips on small screens, a vertical list from lg up.
  const linkClass = (on: boolean) =>
    cn(
      "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-colors lg:gap-3 lg:rounded-md lg:border-0 lg:py-2",
      on ? "border-steel-950 bg-steel-950 text-primary" : "bg-card text-foreground/80 hover:bg-secondary lg:bg-transparent",
    );
  return (
    <nav
      aria-label="Categories"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0"
    >
      <Link href="/shop" className={linkClass(!active)}>
        <Icon name="package" className="h-4 w-4" /> All products
      </Link>
      {categories.map((c) => (
        <Link key={c.id} href={`/shop/${c.slug}`} className={linkClass(active === c.slug)}>
          <Icon name={c.icon} className="h-4 w-4 shrink-0" />
          <span className="lg:flex-1">{c.name}</span>
          <span className="hidden text-xs text-muted-foreground lg:inline">{c.productCount}</span>
        </Link>
      ))}
    </nav>
  );
}

function Pagination({
  basePath,
  params,
  page,
  totalPages,
}: {
  basePath: string;
  params: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const href = (p: number) => `${basePath}${qs({ ...params, page: p > 1 ? p : undefined })}`;
  const btn =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-md border bg-card px-3 text-sm font-semibold";
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} className={cn(btn, "hover:border-primary")}>
          <ChevronLeft className="h-4 w-4" /> Prev
        </Link>
      ) : null}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(btn, p === page ? "border-steel-950 bg-steel-950 text-primary" : "hover:border-primary")}
        >
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={href(page + 1)} className={cn(btn, "hover:border-primary")}>
          Next <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}

async function Results({
  category,
  searchParams,
  basePath,
}: {
  category?: string;
  searchParams: Promise<ShopSearchParams>;
  basePath: string;
}) {
  const sp = await searchParams;
  const params = {
    q: one(sp.q),
    brand: one(sp.brand),
    sort: one(sp.sort),
    inStock: one(sp.inStock) === "1" ? "1" : undefined,
  };
  const page = Math.max(1, Number(one(sp.page)) || 1);
  const result = await serverApi<Page<ProductCard>>(
    `/products${qs({
      category,
      q: params.q,
      brand: params.brand,
      sort: params.sort,
      inStock: params.inStock ? "true" : undefined,
      page,
      pageSize: 24,
    })}`,
  );

  return (
    <>
      <p className="mb-5 text-sm text-muted-foreground">
        {result.total} {result.total === 1 ? "product" : "products"}
        {params.q && (
          <>
            {" "}
            matching <strong className="text-foreground">&ldquo;{params.q}&rdquo;</strong>
          </>
        )}
        {params.brand && (
          <>
            {" "}
            from <strong className="text-foreground">{result.items[0]?.brand?.name ?? params.brand}</strong>{" "}
            <Link href={basePath} className="underline underline-offset-4">
              clear
            </Link>
          </>
        )}
      </p>
      {result.items.length ? (
        <ProductGrid products={result.items} />
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-bold">No products found</h3>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            We carry far more than we list online. Tell us what you need and we&apos;ll source it.
          </p>
          <Link
            href="/contact?type=quote"
            className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            Request a quote
          </Link>
        </div>
      )}
      <Pagination basePath={basePath} params={params} page={result.page} totalPages={result.totalPages} />
    </>
  );
}

/** Sidebar + toolbar + results, shared by /shop and /shop/[category]. */
export function ShopView({
  category,
  searchParams,
  basePath,
}: {
  category?: string;
  searchParams: Promise<ShopSearchParams>;
  basePath: string;
}) {
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground lg:px-3">
          Categories
        </h2>
        <Suspense fallback={<div className="h-10 animate-pulse rounded-md bg-secondary lg:h-96" />}>
          <CategorySidebar active={category} />
        </Suspense>
      </aside>
      <div className="min-w-0">
        <Suspense fallback={<ShopToolbarFallback />}>
          <ShopToolbar />
        </Suspense>
        <div className="mt-6">
          <Suspense fallback={<ProductGridSkeleton count={8} />}>
            <Results category={category} searchParams={searchParams} basePath={basePath} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
