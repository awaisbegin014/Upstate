import { ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { CheckList, CtaBand } from "@/components/site/blocks";
import { Reveal } from "@/components/site/reveal";
import { Container, Eyebrow, PageHero, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { howItWorks, serviceLines, serviceSteps, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, layout, sourcing, installation and service for pallet rack, shelving, dock equipment, lift tables, mezzanines, hand trucks and pallet jacks across Upstate New York.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Upstate Equipment for all your material handling needs."
        intro="Much more than a sales organization — we help you design, lay out, source, install and service everything from dock equipment and pallet rack to conveyor systems and ergonomics."
        image="/images/loading-dock.jpg"
      >
        <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "360ms" }}>
          <ButtonLink href="/contact?type=quote" size="lg">
            Request a site visit <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-7 py-4 font-semibold text-white hover:border-primary hover:text-primary"
          >
            <Phone className="h-5 w-5" /> {site.phone.display}
          </a>
        </div>
      </PageHero>

      {/* Process */}
      <section className="bg-steel-900 py-20 text-white">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {serviceSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-white/10 bg-steel-950 p-6">
                  <div className="flex items-center justify-between">
                    <Icon name={s.icon} className="h-7 w-7 text-primary" />
                    <span className="font-display text-3xl text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Service lines from the original site */}
      {serviceLines.map((line, i) => (
        <section
          key={line.id}
          id={line.id}
          className={cn("scroll-mt-24 py-20", i % 2 ? "bg-secondary" : "bg-background")}
        >
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className={i % 2 ? "lg:order-last" : undefined}>
              <Eyebrow>Service</Eyebrow>
              <h2 className="mt-5 font-display text-5xl leading-none tracking-wide">{line.title}</h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                {line.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 rounded-xl border bg-card p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Suppliers we work with
                </div>
                <CheckList
                  items={line.suppliers.map(([name, what]) => `${name} — ${what}`)}
                  className="mt-4 space-y-3 text-sm"
                />
              </div>
              <Link
                href={`/shop/${line.category}`}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-steel-950 px-6 py-3.5 font-bold text-primary transition-transform hover:-translate-y-0.5"
              >
                Shop related equipment <ArrowRight className="h-5 w-5" />
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={line.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary" />
              </div>
            </Reveal>
          </Container>
        </section>
      ))}

      {/* How it works */}
      <section className="bg-background py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Four steps to a better facility." />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="border-t-4 border-primary pt-6">
                  <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Step {i + 1}</div>
                  <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
