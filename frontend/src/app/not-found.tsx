import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Container } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

const LINKS = [
  { href: "/shop", label: "Shop all equipment" },
  { href: "/shop/hand-equipment", label: "Hand trucks & pallet jacks" },
  { href: "/services", label: "Design & installation" },
  { href: "/projects", label: "Recent projects" },
  { href: "/brands", label: "Brands we carry" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-svh items-center bg-steel-950 pt-16 text-white">
        <Container className="py-20 text-center">
          <p className="font-display text-8xl tracking-wide text-primary sm:text-9xl">404</p>
          <h1 className="mt-4 font-display text-5xl tracking-wide sm:text-6xl">This aisle is empty.</h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            The page you&apos;re looking for moved or never existed. Try one of these — or call{" "}
            <a href={site.phone.href} className="font-semibold text-white underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            and we&apos;ll find what you need.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Shop equipment <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/" variant="outline-light" size="lg">
              Home
            </ButtonLink>
          </div>
          <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:border-primary hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer />
    </>
  );
}
