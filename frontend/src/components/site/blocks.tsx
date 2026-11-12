import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CircleCheck,
  MapPin,
  Phone,
  Printer,
  Receipt,
  Store,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import { money } from "@/lib/format";
import { serverApi } from "@/lib/server-api";
import { faqs, site } from "@/lib/site";
import type {
  Brand,
  Category,
  Page,
  ProductCard,
  StoreSettings,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./product-card";
import { Reveal } from "./reveal";
import { Container, Eyebrow, HeroChips, heroChipClass } from "./section";

// ------------------------------------------------------------ data sections

export const CATEGORY_DIRECT_REPRESENTATION: Record<
  string,
  Array<{ name: string; url: string; note?: string }>
> = {
  conveyors: [
    {
      name: "ACSI Conveyors",
      url: "https://www.automatedconveyors.com",
      note: "Engineered belt & roller systems",
    },
    { name: "Roll-Away", url: "https://www.roll-away.com" },
  ],
  "dock-equipment": [
    {
      name: "McGuire",
      url: "https://www.wbmcguire.com",
      note: "Dock levelers & restraints",
    },
    {
      name: "Advance Lifts",
      url: "https://www.advancelifts.com",
      note: "Hydraulic dock lifts",
    },
    {
      name: "Fairborn",
      url: "https://www.fairbornusa.com",
      note: "Seals & shelters",
    },
  ],
  "hand-equipment": [
    {
      name: "Magliner",
      url: "https://www.magliner.com",
      note: "Hand trucks & delivery gear",
    },
    {
      name: "Lift-Rite",
      url: "https://www.liftrite.com",
      note: "Pallet jacks",
    },
  ],
  racks: [
    {
      name: "Ridg-U-Rak",
      url: "https://www.ridgurak.com",
      note: "Pallet rack & storage design",
    },
    {
      name: "Wireway/Husky",
      url: "https://www.wirewayhusky.com",
      note: "Partitions & guards",
    },
  ],
  "lifting-equipment": [
    {
      name: "Southworth",
      url: "https://www.southworthproducts.com",
      note: "Ergonomic lift tables",
    },
    { name: "Cogan", url: "https://www.cogan.com", note: "Custom mezzanines" },
  ],
  "casters-and-wheels": [
    { name: "Albion Casters", url: "https://www.albioncasters.com" },
    { name: "Colson", url: "https://www.colsoncaster.com" },
  ],
  "industrial-furniture": [
    { name: "Lyon", url: "https://www.lyonworkspace.com" },
    { name: "Penco", url: "https://www.pencoproducts.com" },
  ],
  "drum-equipment": [
    { name: "Morse", url: "https://morsedrum.com" },
    { name: "Valley Craft", url: "https://www.valleycraft.com" },
  ],
  ladders: [
    { name: "Cotterman", url: "https://www.cotterman.com" },
    { name: "Ballymore", url: "https://www.ballymore.com" },
  ],
  shelving: [
    { name: "Penco", url: "https://www.pencoproducts.com" },
    { name: "Edsal", url: "https://www.edsal.com" },
  ],
  "poly-containers": [
    { name: "Akro-Mils", url: "https://akro-mils.com" },
    { name: "Buckhorn", url: "https://www.buckhorninc.com" },
  ],
  matting: [
    { name: "Ergomat", url: "https://www.ergomat.com" },
    { name: "Notrax", url: "https://www.notrax.com" },
  ],
};

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: "1",
    slug: "casters-and-wheels",
    name: "Casters & Wheels",
    icon: "disc-3",
    tagline: "Heavy-duty industrial casters and wheels for every load rating.",
    description: "",
    sortOrder: 0,
    imageUrl: "/projects/custom-ball-transfer-cart.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "2",
    slug: "conveyors",
    name: "Conveyors",
    icon: "arrow-right",
    tagline:
      "Gravity and power conveyor systems that move product, not people.",
    description: "",
    sortOrder: 1,
    imageUrl: "/projects/stiefel-pick-line-1.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "3",
    slug: "dock-equipment",
    name: "Dock Equipment",
    icon: "truck",
    tagline: "Levelers, lifts, seals, shelters, restraints and dock lights.",
    description: "",
    sortOrder: 2,
    imageUrl: "/projects/hannay-dock-seals1.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "4",
    slug: "drum-equipment",
    name: "Drum Equipment",
    icon: "cylinder",
    tagline: "Handlers, dollies, racks and dispensers for drums and totes.",
    description: "",
    sortOrder: 3,
    imageUrl: "/projects/surpass-chemical-2.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "5",
    slug: "hand-equipment",
    name: "Hand Equipment",
    icon: "hand",
    tagline: "Hand trucks, platform trucks, pallet jacks and delivery gear.",
    description: "",
    sortOrder: 4,
    imageUrl: "/images/hand-trucks.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "6",
    slug: "industrial-furniture",
    name: "Industrial Furniture",
    icon: "armchair",
    tagline:
      "Workbenches, workstations, industrial seating, shop desks and drawer cabinets.",
    description: "",
    sortOrder: 5,
    imageUrl: "/projects/fgi-inplant1.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "7",
    slug: "ladders",
    name: "Ladders",
    icon: "ladder",
    tagline:
      "Rolling safety ladders, mobile work platforms, fixed access and crossover ladders.",
    description: "",
    sortOrder: 6,
    imageUrl: "/projects/galvanized-ladder-1.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "8",
    slug: "lifting-equipment",
    name: "Lifting Equipment",
    icon: "forklift",
    tagline: "Lift tables, turntables, positioners and vertical conveyors.",
    description: "",
    sortOrder: 7,
    imageUrl: "/projects/stiefel-dock-lift-1.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "9",
    slug: "matting",
    name: "Matting",
    icon: "grid-3x3",
    tagline:
      "Anti-fatigue, safety and entrance matting for warehouses and clean rooms.",
    description: "",
    sortOrder: 8,
    imageUrl: "/projects/stiefel-pick-line-4.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "10",
    slug: "poly-containers",
    name: "Poly Containers",
    icon: "box",
    tagline:
      "Plastic bins, tote boxes, hopper boxes and bulk storage containers.",
    description: "",
    sortOrder: 9,
    imageUrl: "/projects/stiefel-pick-line-3.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "11",
    slug: "racks",
    name: "Racks",
    icon: "server",
    tagline:
      "Pallet rack, cantilever rack, pushback and drive-in storage systems.",
    description: "",
    sortOrder: 10,
    imageUrl: "/projects/nexans-newburgh-1.jpg",
    productCount: 0,
    brandCount: 0,
  },
  {
    id: "12",
    slug: "shelving",
    name: "Shelving",
    icon: "layers",
    tagline:
      "Steel shelving, rivet shelving, wide-span and wire shelving for any space.",
    description: "",
    sortOrder: 11,
    imageUrl: "/projects/stiefel-pushback.jpg",
    productCount: 0,
    brandCount: 0,
  },
];

export async function CategoryGrid() {
  let categories: Category[] = FALLBACK_CATEGORIES;
  try {
    const data = await serverApi<Category[]>("/categories");
    if (data?.length) categories = data;
  } catch {
    categories = FALLBACK_CATEGORIES;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((c, i) => {
        const directBrands = CATEGORY_DIRECT_REPRESENTATION[c.slug] ?? [];
        return (
          <Reveal key={c.id} delay={(i % 4) * 80}>
            <div className="group flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={c.icon} className="h-6 w-6" />
                </div>
                <Link
                  href={`/shop/${c.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  Catalog →
                </Link>
              </div>

              <h3 className="mt-4 text-xl font-bold tracking-tight">
                <Link
                  href={`/shop/${c.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {c.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.tagline}
              </p>

              {/* Direct Manufacturer Links */}
              {directBrands.length > 0 && (
                <div className="mt-5 border-t border-border pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Direct Representation:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {directBrands.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={
                          brand.note
                            ? `${brand.name} - ${brand.note}`
                            : `Visit ${brand.name} website`
                        }
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <span>{brand.name}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-5 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <Link
                  href={`/shop/${c.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Browse catalog items</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
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
  const page = await serverApi<Page<ProductCard>>(
    `/products?featured=true&pageSize=${limit}`,
  );
  if (!page.items.length) return null;
  return <ProductGrid products={page.items} />;
}

export interface MarqueeBrand {
  name: string;
  website?: string | null;
  slug?: string;
}

const FALLBACK_BRANDS: MarqueeBrand[] = [
  { name: "Magline", website: "https://www.magliner.com" },
  { name: "Southworth", website: "https://www.southworthproducts.com" },
  { name: "Advance Lift", website: "https://www.advancelifts.com" },
  { name: "McGuire", website: "https://www.wbmcguire.com" },
  {
    name: "Automated Conveyor Systems (ACSI)",
    website: "https://www.automatedconveyors.com",
  },
  { name: "Ridg-U-Rak", website: "https://www.ridgurak.com" },
  { name: "Wireway/Husky", website: "https://www.wirewayhusky.com" },
  { name: "Penco Products", website: "https://www.pencoproducts.com" },
  { name: "Konstant", website: "https://www.konstant.com" },
  { name: "Cogan", website: "https://www.cogan.com" },
  { name: "Albion Casters", website: "https://www.albioncasters.com" },
  { name: "Colson Casters", website: "https://www.colsoncaster.com" },
  { name: "LiftRite", website: "https://www.liftrite.com" },
  { name: "Fairborn", website: "https://www.fairbornusa.com" },
  { name: "Poweramp", website: "https://www.poweramp.com" },
  { name: "Durable Corp", website: "https://www.durablecorp.com" },
];

export function BrandMarqueeTrack({ brands }: { brands: MarqueeBrand[] }) {
  const list = [...brands, ...brands];
  return (
    <div className="relative">
      <div className="flex w-max animate-marquee gap-4 pr-4">
        {list.map((b, i) => {
          const href = b.website || `/brands/${b.slug || ""}`;
          const isExternal = Boolean(b.website);
          return (
            <a
              key={`${b.name}-${i}`}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-hidden={i >= brands.length}
              title={`Visit ${b.name}${isExternal ? " website" : ""}`}
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-md border border-white/15 bg-steel-800 px-6 py-3 font-display text-2xl tracking-wider text-white/80 transition-all hover:scale-[1.03] hover:border-primary hover:bg-steel-700 hover:text-primary active:scale-95"
            >
              <span>{b.name}</span>
              {isExternal && (
                <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              )}
            </a>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-steel-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-steel-900 to-transparent" />
    </div>
  );
}

export async function BrandMarquee() {
  let items: MarqueeBrand[] = FALLBACK_BRANDS;
  try {
    const brands = await serverApi<Brand[]>("/brands?featured=true");
    const filtered = (brands || []).filter(
      (b) => !/pentalift|wildeck|interlake/i.test(b.name),
    );
    if (filtered.length) {
      items = filtered.map((b) => ({
        name: b.name,
        website: b.website,
        slug: b.slug,
      }));
    }
  } catch {
    items = FALLBACK_BRANDS;
  }
  return <BrandMarqueeTrack brands={items} />;
}

export function BrandMarqueeFallback() {
  return <BrandMarqueeTrack brands={FALLBACK_BRANDS} />;
}

/** Category chips for heroes — jump straight to a department. */
export async function HeroCategoryLinks() {
  let categories: Category[] = FALLBACK_CATEGORIES;
  try {
    const data = await serverApi<Category[]>("/categories");
    if (data?.length) categories = data;
  } catch {
    categories = FALLBACK_CATEGORIES;
  }
  // Hidden on phones (HeroChips), where the shop's own category row sits right below the hero.
  return (
    <HeroChips label="Shop by category">
      {categories.map((c) => (
        <Link key={c.id} href={`/shop/${c.slug}`} className={heroChipClass}>
          <Icon name={c.icon} className="h-4 w-4" />
          {c.name}
        </Link>
      ))}
    </HeroChips>
  );
}

/**
 * Shipping, pickup, payment and help — read from the live store settings so
 * it always matches what checkout actually offers.
 */
export async function OrderingInfo({ className }: { className?: string }) {
  const s = await serverApi<StoreSettings>("/store/settings");
  const shipping =
    s.freeShippingThresholdCents > 0
      ? `Flat ${money(s.flatShippingCents)} per order, free on orders over ${money(s.freeShippingThresholdCents)}.`
      : `Flat ${money(s.flatShippingCents)} per order to your facility.`;
  const payment =
    s.paymentMethods.card && s.paymentMethods.invoice
      ? "Pay securely by card, or choose pay on invoice and add your PO number."
      : s.paymentMethods.invoice
        ? "Order now and pay on invoice — add your PO number at checkout."
        : "Pay securely by credit or debit card at checkout.";
  const cards = [
    { icon: Truck, title: "Shipping", body: shipping },
    ...(s.pickupEnabled
      ? [
          {
            icon: Store,
            title: "Local pickup",
            body: `Free pickup at ${site.address.street}, ${site.address.city}. We call when it's ready.`,
          },
        ]
      : []),
    { icon: Receipt, title: "Payment", body: payment },
    {
      icon: Phone,
      title: "Real help",
      body: `Not sure what fits? Call ${site.phone.display} and talk to someone who knows warehouses.`,
    },
  ];
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {cards.map((c) => (
        <div key={c.title} className="rounded-xl border bg-card p-5">
          <c.icon className="h-6 w-6 text-foreground/70" />
          <h3 className="mt-3 font-bold">{c.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {c.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------- static sections

/** "We sell far more than we list" call-out for shop and brand pages. */
export function SourcingBand() {
  return (
    <section className="bg-steel-950 py-16 text-white">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <Eyebrow tone="primary">Can&apos;t find it?</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-none tracking-wide sm:text-5xl">
            We carry far more than we list online.
          </h2>
          <p className="mt-4 text-white/70">
            We source from 200+ manufacturers. Send us a part number, a photo or
            just a description and we&apos;ll track it down — or design a
            complete system around it.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact?type=quote" size="lg">
            Request a quote <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/brands" variant="outline-light" size="lg">
            Browse brands
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function CheckList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
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
  imageFit = "cover",
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
  imageFit?: "cover" | "contain";
}) {
  const ctaClass =
    "mt-10 inline-flex items-center gap-2 rounded-md bg-steel-950 px-7 py-4 text-base font-bold text-primary transition-transform hover:-translate-y-1";
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-24",
        tone === "secondary" ? "bg-secondary" : "bg-background",
      )}
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {body}
            </p>
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
          <div
            className={cn(
              "relative overflow-hidden rounded-xl shadow-2xl",
              imageFit === "contain"
                ? "bg-white p-6 sm:p-8 flex items-center justify-center min-h-[380px]"
                : "",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              width={1280}
              height={960}
              className={cn(
                "w-full transition-transform duration-700 hover:scale-105",
                imageFit === "contain"
                  ? "aspect-[4/3] object-contain max-h-[340px]"
                  : "aspect-[4/3] object-cover",
              )}
            />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FaqSection({
  className,
  items = faqs,
}: {
  className?: string;
  items?: ReadonlyArray<{ q: string; a: string }>;
}) {
  return (
    <section
      id="faq"
      className={cn("scroll-mt-24 bg-secondary py-24", className)}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              Questions we hear every week.
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 space-y-4">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details className="group rounded-xl border bg-card p-6 transition-colors open:border-primary">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
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
            Call for a quote, a site visit or just honest advice about your
            warehouse layout. We answer.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-3 rounded-md bg-steel-950 px-9 py-5 text-xl font-bold text-primary shadow-xl transition-transform hover:-translate-y-1"
            >
              <Phone className="h-6 w-6" />
              Call {site.phone.display}
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
        <a
          key="p"
          href={site.phone.href}
          className="block text-xl font-bold text-white hover:text-primary"
        >
          {site.phone.display}
        </a>,
        <span key="sub" className="text-xs text-white/60">
          Direct Line (Local &amp; Long Distance)
        </span>,
      ],
    },
    {
      icon: Printer,
      title: "Fax",
      lines: [
        <div key="f" className="text-white/70">
          {site.fax}
        </div>,
      ],
    },
    {
      icon: MapPin,
      title: "Visit us",
      lines: [
        <a
          key="a"
          href={site.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="block text-white/70 hover:text-primary"
        >
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
            Call {site.phone.display} — the largest Magliner inventory north of
            NYC.
          </div>
        </div>
        <ButtonLink href="/shop/hand-equipment" size="lg">
          Shop hand equipment <ArrowUpRight className="h-5 w-5" />
        </ButtonLink>
      </div>
    </Reveal>
  );
}
