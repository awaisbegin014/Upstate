import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SourcingBand } from "@/components/site/blocks";
import { BrandDirectory } from "@/components/site/brand-directory";
import { Reveal } from "@/components/site/reveal";
import { Container, HeroActions, PageHero, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { serverApi } from "@/lib/server-api";
import type { Brand, Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Brands We Carry",
  description:
    "An alphabetical directory of the 200+ material handling manufacturers Upstate Equipment Co. sources from — Magline, Southworth, Ridg-U-Rak, McGuire, Cogan and more.",
};

function FeaturedPartners({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;
  return (
    <section className="bg-secondary py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured partners"
            title="The names you'll see on our installs."
            intro="Manufacturers we work with most often — from Magliner hand trucks to Cogan mezzanines and ACSI conveyors."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 80}>
              <div className="flex h-full flex-col rounded-xl border bg-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl leading-none tracking-wide">{b.name}</h3>
                  {b.website && (
                    <a
                      href={b.website}
                      target="_blank"
                      rel="noreferrer nofollow"
                      aria-label={`${b.name} website`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  {b._count.products > 0 && (
                    <Link href={`/shop?brand=${b.slug}`} className="underline underline-offset-4">
                      Shop {b._count.products} {b._count.products === 1 ? "item" : "items"}
                    </Link>
                  )}
                  {b.categories.slice(0, 2).map((c) => (
                    <Link key={c.slug} href={`/shop/${c.slug}`} className="text-muted-foreground hover:text-foreground">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function BrandsContent() {
  const [brands, categories] = await Promise.all([
    serverApi<Brand[]>("/brands"),
    serverApi<Category[]>("/categories"),
  ]);
  return (
    <>
      <FeaturedPartners brands={brands.filter((b) => b.isFeatured)} />
      <section className="bg-background py-20">
        <Container>
          <SectionHeading
            eyebrow="Supplier directory"
            title="Every manufacturer, A to Z."
            intro="Search by name or by what they make, or filter by category. Links open the manufacturer's own site."
          />
          <div className="mt-10">
            <BrandDirectory brands={brands} categories={categories.map(({ slug, name }) => ({ slug, name }))} />
          </div>
        </Container>
      </section>
    </>
  );
}

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands we carry"
        title="200+ manufacturer partners, one phone number."
        intro="An alphabetical listing of many of our suppliers, with direct links to their web sites. If they make it, we can usually get it — and install it."
        image="/images/loading-dock.jpg"
        highlights={["Pallet rack to Magliner parts", "One quote, many manufacturers", "Installed by our own crew"]}
      >
        <HeroActions>
          <ButtonLink href="#after-hero" size="lg">
            Explore brands <ArrowDown className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/contact?type=quote" variant="outline-light" size="lg">
            Ask about a brand <ArrowUpRight className="h-5 w-5" />
          </ButtonLink>
        </HeroActions>
      </PageHero>
      <Suspense
        fallback={
          <Container className="py-20">
            <div className="h-96 animate-pulse rounded-xl bg-secondary" />
          </Container>
        }
      >
        <BrandsContent />
      </Suspense>
      <SourcingBand />
    </>
  );
}
