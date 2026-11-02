import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { HeroCategoryLinks, OrderingInfo, SourcingBand } from "@/components/site/blocks";
import { SectionBoundary } from "@/components/site/section-boundary";
import { Container, HeroActions, PageHero, SectionHeading } from "@/components/site/section";
import { ShopView } from "@/components/site/shop";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Shop Material Handling Equipment",
  description:
    "Shop hand trucks, pallet jacks, casters, shelving, pallet rack, conveyors, dock equipment and more from Upstate Equipment Co. in Schenectady, NY.",
};

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <>
      <PageHero
        eyebrow="Shop online"
        title="Equipment that keeps your facility moving."
        intro="Order stocked equipment online, or request a quote for the engineered systems we design and install — racking, mezzanines, conveyors and dock equipment."
        image="/images/hero-warehouse.jpg"
        highlights={["Same-day hand truck shipping", "200+ manufacturers sourced", "Design & installation available"]}
      >
        <HeroActions>
          <ButtonLink href="#after-hero" size="lg">
            Browse products <ArrowDown className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/contact?type=quote" variant="outline-light" size="lg">
            Request a quote <ArrowUpRight className="h-5 w-5" />
          </ButtonLink>
        </HeroActions>
        <SectionBoundary fallback={null}>
          <Suspense fallback={<div className="mt-8 h-24 max-w-3xl" />}>
            <HeroCategoryLinks />
          </Suspense>
        </SectionBoundary>
      </PageHero>

      <Container className="py-14">
        <ShopView searchParams={searchParams} basePath="/shop" />
      </Container>

      <section className="border-t bg-secondary py-20">
        <Container>
          <SectionHeading
            eyebrow="How ordering works"
            title="Simple to order, easy to get."
            intro="Everything you need to know before you check out."
          />
          <SectionBoundary fallback={null}>
            <Suspense fallback={<div className="mt-10 h-40 animate-pulse rounded-xl bg-card" />}>
              <OrderingInfo className="mt-10" />
            </Suspense>
          </SectionBoundary>
        </Container>
      </section>

      <SourcingBand />
    </>
  );
}
