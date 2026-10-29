import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandDirectory } from "@/components/site/brand-directory";
import { Container, PageHero } from "@/components/site/section";
import { serverApi } from "@/lib/server-api";
import type { Brand, Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Brands We Carry",
  description:
    "An alphabetical directory of the 200+ material handling manufacturers Upstate Equipment Co. sources from — Magline, Southworth, Ridg-U-Rak, McGuire, Wildeck and more.",
};

async function Directory() {
  const [brands, categories] = await Promise.all([
    serverApi<Brand[]>("/brands"),
    serverApi<Category[]>("/categories"),
  ]);
  return <BrandDirectory brands={brands} categories={categories.map(({ slug, name }) => ({ slug, name }))} />;
}

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands we carry"
        title="200+ manufacturer partners, one phone number."
        intro="An alphabetical listing of many of our suppliers, with direct links to their web sites. If they make it, we can usually get it — and install it."
        image="/images/hero-warehouse.jpg"
      />
      <Container className="py-14">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-secondary" />}>
          <Directory />
        </Suspense>
      </Container>
    </>
  );
}
