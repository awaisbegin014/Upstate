import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { OrderingInfo, SourcingBand } from "@/components/site/blocks";
import { SectionBoundary } from "@/components/site/section-boundary";
import { Container, HeroActions, PageHero, SectionHeading } from "@/components/site/section";
import { ShopView } from "@/components/site/shop";
import { ButtonLink } from "@/components/ui/button";
import { serverApi, serverApiOr404 } from "@/lib/server-api";
import { serviceLines, site } from "@/lib/site";
import type { CategoryDetail } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  try {
    const c = await serverApi<CategoryDetail>(`/categories/${category}`);
    return { title: c.name, description: c.tagline };
  } catch {
    return { title: "Shop" };
  }
}

async function CategoryHero({ params }: { params: PageProps<"/shop/[category]">["params"] }) {
  const { category } = await params;
  const c = await serverApiOr404<CategoryDetail>(`/categories/${category}`);
  const installs = serviceLines.some((s) => s.category === c.slug);
  return (
    <PageHero
      eyebrow="Shop · Category"
      title={c.name}
      intro={c.description}
      image={c.imageUrl ?? undefined}
      highlights={[
        ...(c.brands.length ? [`${c.brands.length} manufacturers sourced`] : []),
        installs ? "Design & installation available" : "Quotes on anything we don't list",
        `Questions? Call ${site.phone.display}`,
      ]}
    >
      <nav className="mt-6 text-sm text-white/60" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-white/90">{c.name}</span>
      </nav>
      <HeroActions>
        <ButtonLink href="#after-hero" size="lg">
          Shop {c.name.toLowerCase()} <ArrowDown className="h-5 w-5" />
        </ButtonLink>
        <ButtonLink href="/contact?type=quote" variant="outline-light" size="lg">
          Request a quote <ArrowUpRight className="h-5 w-5" />
        </ButtonLink>
      </HeroActions>
    </PageHero>
  );
}

/** Links a category to the matching design & install services from the Services page. */
async function CategoryServices({ params }: { params: PageProps<"/shop/[category]">["params"] }) {
  const { category } = await params;
  const lines = serviceLines.filter((s) => s.category === category);
  if (!lines.length) return null;
  return (
    <section className="border-t bg-background py-16">
      <Container>
        <SectionHeading
          eyebrow="We also design & install"
          title="More than a box on a truck."
          intro="Need it laid out, assembled or built into a larger system? The same team that sells it can design and install it."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {lines.map((line) => (
            <Link
              key={line.id}
              href={`/services#${line.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg sm:flex-row"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={line.image} alt="" loading="lazy" className="h-40 w-full object-cover sm:h-auto sm:w-48" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold">{line.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{line.body[0]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  Learn about this service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function CategoryBrands({ params }: { params: PageProps<"/shop/[category]">["params"] }) {
  const { category } = await params;
  const c = await serverApiOr404<CategoryDetail>(`/categories/${category}`);
  if (!c.brands.length) return null;
  return (
    <section className="border-t bg-secondary py-16">
      <Container>
        <h2 className="font-display text-4xl tracking-wide">
          {c.name} brands we source
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Don&apos;t see the exact item online? We buy from all of these manufacturers — call{" "}
          <a href="tel:+15183707000" className="font-semibold text-foreground underline underline-offset-4">
            518.370.7000
          </a>{" "}
          or{" "}
          <Link href="/contact?type=quote" className="font-semibold text-foreground underline underline-offset-4">
            request a quote
          </Link>
          .
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.brands.map((b) => (
            <li key={b.slug} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold">{b.name}</span>
                {b.website && (
                  <a
                    href={b.website}
                    target="_blank"
                    rel="noreferrer nofollow"
                    aria-label={`${b.name} website`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default function CategoryPage({ params, searchParams }: PageProps<"/shop/[category]">) {
  return (
    <>
      <Suspense fallback={<PageHero eyebrow="Shop · Category" title="Loading…" />}>
        <CategoryHero params={params} />
      </Suspense>
      <Container className="py-14">
        <Suspense>
          <CategoryShop params={params} searchParams={searchParams} />
        </Suspense>
      </Container>
      <Suspense>
        <CategoryServices params={params} />
      </Suspense>
      <Suspense>
        <CategoryBrands params={params} />
      </Suspense>
      <section className="border-t bg-background py-16">
        <Container>
          <h2 className="font-display text-4xl tracking-wide">Ordering &amp; delivery</h2>
          <SectionBoundary fallback={null}>
            <Suspense fallback={<div className="mt-8 h-40 animate-pulse rounded-xl bg-secondary" />}>
              <OrderingInfo className="mt-8" />
            </Suspense>
          </SectionBoundary>
        </Container>
      </section>
      <SourcingBand />
    </>
  );
}

async function CategoryShop({
  params,
  searchParams,
}: {
  params: PageProps<"/shop/[category]">["params"];
  searchParams: PageProps<"/shop/[category]">["searchParams"];
}) {
  const { category } = await params;
  return <ShopView category={category} searchParams={searchParams} basePath={`/shop/${category}`} />;
}
