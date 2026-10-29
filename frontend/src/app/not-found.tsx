import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Container } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-steel-950 pt-16 text-white">
        <Container className="py-32 text-center">
          <p className="font-display text-8xl tracking-wide text-primary">404</p>
          <h1 className="mt-4 font-display text-5xl tracking-wide">This aisle is empty.</h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            The page you&apos;re looking for moved or never existed. Try the shop, or give us a call — we
            can probably find what you need.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Shop equipment <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/" variant="outline-light" size="lg">
              Home
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
