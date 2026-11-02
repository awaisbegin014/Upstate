import type { Metadata } from "next";
import { Suspense } from "react";
import { FeaturedProducts, OrderingInfo } from "@/components/site/blocks";
import { ProductGridSkeleton } from "@/components/site/product-card";
import { SectionBoundary } from "@/components/site/section-boundary";
import { Container, SectionHeading } from "@/components/site/section";
import { CartView } from "./cart-view";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <CartView />
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
      <section className="border-t bg-secondary py-16">
        <Container>
          <SectionHeading eyebrow="Popular right now" title="Customers also order." />
          <div className="mt-10">
            <SectionBoundary fallback={null}>
              <Suspense fallback={<ProductGridSkeleton count={4} />}>
                <FeaturedProducts limit={4} />
              </Suspense>
            </SectionBoundary>
          </div>
        </Container>
      </section>
    </>
  );
}
