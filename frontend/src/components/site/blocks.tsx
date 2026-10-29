import { ArrowRight, ArrowUpRight, ChevronDown, CircleCheck, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import { serverApi } from "@/lib/server-api";
import { faqs, site } from "@/lib/site";
import type { Brand, Category, Page, ProductCard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./product-card";
import { Reveal } from "./reveal";
import { Container, Eyebrow } from "./section";

// ------------------------------------------------------------ data sections

export async function CategoryGrid() {
  const categories = await serverApi<Category[]>("/categories");
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c, i) => (
        <Reveal key={c.id} delay={(i % 4) * 80}>
          <Link
            href={`/shop/${c.slug}`}
            className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-foreground transition-colors group-hover:bg-primary">
              <Icon name={c.icon} className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{c.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
              {c.productCount > 0 ? `Shop ${c.productCount} products` : "Browse category"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function CategoryGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="h-52 animate-pulse rounded-xl border bg-card" />
      ))}
    </div>
  );
}

export async function FeaturedProducts({ limit = 8 }: { limit?: number }) {
  const page = await serverApi<Page<ProductCard>>(`/products?featured=true&pageSize=${limit}`);
  if (!page.items.length) return null;
  return <ProductGrid products={page.items} />;
}

const FALLBACK_BRANDS = [
  "Magline", "Southworth", "Advance Lift", "McGuire", "Wildeck", "Interlake",
  "Ridg-U-Rak", "Wireway/Husky", "Penco Products", "Konstant", "Cogan",
  "Albion Casters", "Colson Casters", "LiftRite", "Fairborn", "Poweramp",
  "Pentalift", "Durable Corp",
];

export function BrandMarqueeTrack({ names }: { names: string[] }) {
  const list = [...names, ...names];
  return (
    <div className="relative">
      <div className="flex w-max animate-marquee gap-4 pr-4">
        {list.map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= names.length}
            className="whitespace-nowrap rounded-md border border-white/15 bg-steel-800 px-6 py-3 font-display text-2xl tracking-wider text-white/80"
          >
            {name}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-steel-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-steel-900 to-transparent" />
    </div>
  );
}

export async function BrandMarquee() {
  const brands = await serverApi<Brand[]>("/brands?featured=true");
  const names = brands.length ? brands.map((b) => b.name) : FALLBACK_BRANDS;
  return <BrandMarqueeTrack names={names} />;
}

export function BrandMarqueeFallback() {
  return <BrandMarqueeTrack names={FALLBACK_BRANDS} />;
}

// ---------------------------------------------------------- static sections

export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <span className="font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FeatureSplit({
  id,
  eyebrow,
  title,
  body,
  points,
  image,
  imageAlt,
  cta,
  reverse,
  tone = "background",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  imageAlt: string;
  cta: { href: string; label: string; external?: boolean };
  reverse?: boolean;
  tone?: "background" | "secondary";
}) {
  const ctaClass =
    "mt-10 inline-flex items-center gap-2 rounded-md bg-steel-950 px-7 py-4 text-base font-bold text-primary transition-transform hover:-translate-y-1";
  return (
    <section id={id} className={cn("scroll-mt-24 py-24", tone === "secondary" ? "bg-secondary" : "bg-background")}>
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl">{title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{body}</p>
            <CheckList items={points} className="mt-8" />
            {cta.external ? (
              <a href={cta.href} className={ctaClass}>
                {cta.label} <ArrowRight className="h-5 w-5" />
              </a>
            ) : (
              <Link href={cta.href} className={ctaClass}>
                {cta.label} <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </Reveal>
        <Reveal delay={100} className={reverse ? "lg:order-first" : undefined}>
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FaqSection({ className }: { className?: string }) {
  return (
    <section id="faq" className={cn("scroll-mt-24 bg-secondary py-24", className)}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">FAQ</p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              Questions we hear every week.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details className="group rounded-xl border bg-card p-6 transition-colors open:border-primary">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-primary py-20">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-6xl leading-none tracking-wide text-primary-foreground sm:text-7xl">
            Let&apos;s move your operation forward.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-primary-foreground/80">
            Call for a quote, a site visit or just honest advice about your warehouse layout. We answer.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-md bg-steel-950 px-7 py-4 text-base font-bold text-primary transition-transform hover:-translate-y-1"
            >
              <Phone className="h-5 w-5" />
              Call {site.phone.display}
            </a>
            <a
              href={site.tollFree.href}
              className="inline-flex items-center gap-2 rounded-md bg-primary-foreground px-7 py-4 text-base font-bold text-primary transition-transform hover:-translate-y-1"
            >
              <Phone className="h-5 w-5" />
              {site.tollFree.display} {site.tollFree.digits}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function ContactCards({ className }: { className?: string }) {
  const cards = [
    {
      icon: Phone,
      title: "Call us",
      lines: [
        <a key="p" href={site.phone.href} className="block font-semibold text-white/85 hover:text-primary">
          {site.phone.display}
        </a>,
        <a key="t" href={site.tollFree.href} className="block font-semibold text-white/85 hover:text-primary">
          {site.tollFree.display} {site.tollFree.digits}
        </a>,
      ],
    },
    {
      icon: Printer,
      title: "Fax",
      lines: [<div key="f" className="text-white/70">{site.fax}</div>],
    },
    {
      icon: MapPin,
      title: "Visit us",
      lines: [
        <a key="a" href={site.mapUrl} target="_blank" rel="noreferrer" className="block text-white/70 hover:text-primary">
          {site.address.street}
          <br />
          {site.address.city}, {site.address.state} {site.address.zip}
        </a>,
      ],
    },
  ];
  return (
    <div className={cn("grid gap-5 md:grid-cols-3", className)}>
      {cards.map((c, i) => (
        <Reveal key={c.title} delay={i * 100}>
          <div className="h-full rounded-xl border border-white/10 bg-steel-900 p-7 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <c.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
            <div className="mt-3 space-y-1">{c.lines}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function SameDayBand() {
  return (
    <Reveal delay={150}>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-white/10 bg-steel-900 p-8 text-white">
        <div>
          <div className="font-display text-3xl tracking-wide text-primary">
            Same-day hand truck assembly &amp; shipping
          </div>
          <div className="mt-1 text-white/70">
            Call {site.tollFree.display} — the largest Magliner inventory north of NYC.
          </div>
        </div>
        <ButtonLink href="/shop/hand-equipment" size="lg">
          Shop hand equipment <ArrowUpRight className="h-5 w-5" />
        </ButtonLink>
      </div>
    </Reveal>
  );
}
