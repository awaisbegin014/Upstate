import { ArrowUpRight, Clock, Phone, ShieldCheck, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AddToCart } from "@/components/site/add-to-cart";
import { OrderingInfo } from "@/components/site/blocks";
import { SectionBoundary } from "@/components/site/section-boundary";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Price, ProductGrid, StockBadge } from "@/components/site/product-card";
import { ProductGallery } from "@/components/site/product-gallery";
import { Container } from "@/components/site/section";
import { serverApi, serverApiOr404 } from "@/lib/server-api";
import { site } from "@/lib/site";
import type { ProductDetail, StoreSettings } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await serverApi<ProductDetail>(`/products/${slug}`);
    return {
      title: p.name,
      description: p.shortDescription || p.description.slice(0, 160),
      openGraph: p.images[0] ? { images: [p.images[0].url] } : undefined,
    };
  } catch {
    return { title: "Product" };
  }
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <div className="pt-16">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <Container className="grid gap-12 py-12 lg:grid-cols-2">
      <div className="aspect-[4/3] animate-pulse rounded-xl bg-secondary" />
      <div className="space-y-4">
        <div className="h-4 w-1/3 animate-pulse rounded bg-secondary" />
        <div className="h-12 w-4/5 animate-pulse rounded bg-secondary" />
        <div className="h-24 animate-pulse rounded bg-secondary" />
      </div>
    </Container>
  );
}

async function ProductContent({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const [p, settings] = await Promise.all([
    serverApiOr404<ProductDetail>(`/products/${slug}`),
    serverApi<StoreSettings>("/store/settings").catch(() => null),
  ]);
  const payment = !settings
    ? "Order online or call to arrange payment"
    : settings.paymentMethods.card && settings.paymentMethods.invoice
      ? "Pay by card or on invoice with your PO"
      : settings.paymentMethods.invoice
        ? "Pay on invoice — add your PO at checkout"
        : "Secure card checkout";
  const delivery = settings?.pickupEnabled
    ? "Ship across Upstate NY or pick up in Schenectady"
    : "Shipped to your facility across Upstate NY";

  return (
    <>
      <Container className="py-6">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>{" "}
          /{" "}
          <Link href={`/shop/${p.category.slug}`} className="hover:text-foreground">
            {p.category.name}
          </Link>{" "}
          / <span className="text-foreground">{p.name}</span>
        </nav>
      </Container>

      <Container className="grid gap-12 pb-16 lg:grid-cols-2">
        <ProductGallery images={p.images} name={p.name} icon={p.category.icon} brand={p.brand?.name} />

        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {p.brand && (
              <Link href={`/shop?brand=${p.brand.slug}`} className="hover:text-foreground">
                {p.brand.name}
              </Link>
            )}
            <span className="font-mono normal-case tracking-normal">SKU {p.sku}</span>
          </div>
          <h1 className="mt-3 font-display text-5xl leading-none tracking-wide sm:text-6xl">{p.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Price cents={p.priceCents} compareAt={p.compareAtCents} isQuoteOnly={p.isQuoteOnly} className="text-3xl" />
            <StockBadge stock={p.stock} isQuoteOnly={p.isQuoteOnly} leadTime={p.leadTime} className="text-sm" />
          </div>

          <div className="mt-8">
            {p.isQuoteOnly ? (
              <div className="space-y-3">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 text-base font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Request a quote <ArrowUpRight className="h-5 w-5" />
                </a>
                <p className="text-sm text-muted-foreground">
                  Engineered and installed equipment is priced per job after a site visit or drawing review.
                </p>
              </div>
            ) : (
              <AddToCart productId={p.id} name={p.name} stock={p.stock} />
            )}
          </div>

          <ul className="mt-10 grid gap-4 rounded-xl border bg-secondary/60 p-5 text-sm sm:grid-cols-3">
            <li className="flex gap-3">
              <Truck className="h-5 w-5 shrink-0 text-foreground/70" />
              <span>{delivery}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-foreground/70" />
              <span>{p.isQuoteOnly ? "Lead time quoted per project" : (p.leadTime ?? "Ships from stock")}</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-foreground/70" />
              <span>{payment}</span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>
              Questions? Call{" "}
              <a href={site.phone.href} className="font-bold underline underline-offset-4">
                {site.phone.display}
              </a>
            </span>
          </div>
        </div>
      </Container>

      <section className="border-t bg-background py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-display text-4xl tracking-wide">Details</h2>
            <div className="prose-ue mt-5 max-w-3xl leading-relaxed text-muted-foreground">
              {p.description.split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {p.brand?.description && (
              <p className="mt-6 text-sm text-muted-foreground">
                <strong className="text-foreground">{p.brand.name}</strong> — {p.brand.description}
                {p.brand.website && (
                  <>
                    {" · "}
                    <a href={p.brand.website} target="_blank" rel="noreferrer nofollow" className="underline underline-offset-4">
                      Manufacturer site
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
          {p.specs.length > 0 && (
            <div>
              <h2 className="font-display text-4xl tracking-wide">Specifications</h2>
              <dl className="mt-5 divide-y rounded-xl border bg-card">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-2 gap-4 px-5 py-3 text-sm">
                    <dt className="font-semibold">{s.label}</dt>
                    <dd className="text-muted-foreground">{s.value}</dd>
                  </div>
                ))}
                {p.weightLbs ? (
                  <div className="grid grid-cols-2 gap-4 px-5 py-3 text-sm">
                    <dt className="font-semibold">Shipping weight</dt>
                    <dd className="text-muted-foreground">{p.weightLbs} lb</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          )}
        </Container>
      </section>

      {p.isQuoteOnly && (
        <section id="quote" className="scroll-mt-24 bg-steel-950 py-16 text-white">
          <Container className="max-w-3xl">
            <h2 className="font-display text-5xl tracking-wide">Get this quoted</h2>
            <p className="mt-2 text-white/70">
              Tell us about your space, loads and timeline. We&apos;ll follow up — often with a site visit.
            </p>
            <div className="mt-8">
              <InquiryForm dark product={{ slug: p.slug, name: p.name }} />
            </div>
          </Container>
        </section>
      )}

      <section className="border-t bg-secondary py-16">
        <Container>
          <h2 className="font-display text-4xl tracking-wide">Ordering &amp; delivery</h2>
          <SectionBoundary fallback={null}>
            <Suspense fallback={<div className="mt-8 h-40 animate-pulse rounded-xl bg-card" />}>
              <OrderingInfo className="mt-8" />
            </Suspense>
          </SectionBoundary>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold">Need it installed or built into a larger system?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We design, lay out and install racking, conveyors, mezzanines and dock equipment across Upstate NY.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-steel-950 px-5 py-3 text-sm font-bold text-primary"
            >
              Our services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {p.related.length > 0 && (
        <section className="bg-secondary py-16">
          <Container>
            <h2 className="font-display text-4xl tracking-wide">More {p.category.name.toLowerCase()}</h2>
            <div className="mt-8">
              <ProductGrid products={p.related} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
