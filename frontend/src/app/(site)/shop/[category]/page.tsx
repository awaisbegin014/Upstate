import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container, PageHero } from "@/components/site/section";
import { ShopView } from "@/components/site/shop";
import { serverApi, serverApiOr404 } from "@/lib/server-api";
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
  return (
    <PageHero eyebrow="Shop · Category" title={c.name} intro={c.description} image={c.imageUrl ?? undefined}>
      <nav className="mt-6 text-sm text-white/60" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-white/90">{c.name}</span>
      </nav>
    </PageHero>
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
        <CategoryBrands params={params} />
      </Suspense>
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
