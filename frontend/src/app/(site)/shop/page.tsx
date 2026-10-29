import type { Metadata } from "next";
import { Container, PageHero } from "@/components/site/section";
import { ShopView } from "@/components/site/shop";

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
        intro="Order stocked equipment online — paid by card or on invoice — or request a quote for engineered systems we design and install."
        image="/images/hero-warehouse.jpg"
      />
      <Container className="py-14">
        <ShopView searchParams={searchParams} basePath="/shop" />
      </Container>
    </>
  );
}
