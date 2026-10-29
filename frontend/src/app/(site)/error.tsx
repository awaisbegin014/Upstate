"use client";

import { Phone, RotateCw } from "lucide-react";
import { useEffect } from "react";
import { Container } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Storefront fallback when a page fails to render (e.g. the API is unreachable). */
export default function SiteError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-steel-950 pt-16 text-white">
      <Container className="py-28 text-center">
        <p className="font-display text-7xl tracking-wide text-primary">Hold up.</p>
        <h1 className="mt-4 font-display text-4xl tracking-wide sm:text-5xl">This page couldn&apos;t load.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          Something went wrong on our end. Try again in a moment — or call us and we&apos;ll help directly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-bold text-primary-foreground"
          >
            <RotateCw className="h-5 w-5" /> Try again
          </button>
          <ButtonLink href={site.phone.href} variant="outline-light" size="lg">
            <Phone className="h-5 w-5" /> {site.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
