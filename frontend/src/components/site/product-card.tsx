import Link from "next/link";
import { money } from "@/lib/format";
import type { ProductCard as Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";

export function StockBadge({
  stock,
  isQuoteOnly,
  leadTime,
  className,
}: {
  stock: number;
  isQuoteOnly: boolean;
  leadTime?: string | null;
  className?: string;
}) {
  const [label, tone] = isQuoteOnly
    ? ["Quoted per job", "bg-steel-100 text-steel-900"]
    : stock <= 0
      ? ["Out of stock", "bg-zinc-200 text-zinc-700"]
      : stock <= 5
        ? [`Only ${stock} left`, "bg-amber-100 text-amber-900"]
        : [leadTime ?? "In stock", "bg-emerald-100 text-emerald-900"];
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", tone, className)}>
      {label}
    </span>
  );
}

export function Price({
  cents,
  compareAt,
  isQuoteOnly,
  className,
}: {
  cents: number;
  compareAt?: number | null;
  isQuoteOnly: boolean;
  className?: string;
}) {
  if (isQuoteOnly) {
    return <span className={cn("font-bold text-muted-foreground", className)}>Request a quote</span>;
  }
  return (
    <span className={cn("font-bold", className)}>
      {money(cents)}
      {compareAt && compareAt > cents && (
        <span className="ml-2 text-sm font-medium text-muted-foreground line-through">{money(compareAt)}</span>
      )}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <ProductImage
          src={image?.url}
          alt={image?.alt || product.name}
          icon={product.category.icon}
          brand={product.brand?.name}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="truncate">{product.brand?.name ?? product.category.name}</span>
          <span className="shrink-0 font-mono normal-case tracking-normal">{product.sku}</span>
        </div>
        <h3 className="mt-2 text-base font-bold leading-snug">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <Price
            cents={product.priceCents}
            compareAt={product.compareAtCents}
            isQuoteOnly={product.isQuoteOnly}
            className="text-lg"
          />
          <StockBadge stock={product.stock} isQuoteOnly={product.isQuoteOnly} leadTime={product.leadTime} />
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border bg-card">
          <div className="aspect-[4/3] animate-pulse bg-secondary" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}
