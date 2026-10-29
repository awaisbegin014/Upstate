import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { CheckList, CtaBand, FaqSection } from "@/components/site/blocks";
import { Reveal } from "@/components/site/reveal";
import { Container, Eyebrow, PageHero, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { aboutPoints, serviceAreas, stats, whyUpstate } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Upstate Equipment Company has served the material handling equipment needs of Upstate New York businesses since June 1990 — family-run, based in Schenectady.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Keeping Upstate New York moving since 1990."
        intro="Upstate Equipment Company has been serving the material handling equipment needs of Upstate New York businesses since its founding in June of 1990."
        image="/images/hand-trucks.jpg"
      />

      <section className="border-b border-white/10 bg-steel-900 py-10 text-white">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <div className="font-display text-5xl tracking-wide text-primary">{s.value}</div>
              <div className="mt-2 text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-background py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              More than a sales organization.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Much more than a sales organization, we will help you design, lay out, source, install
                and service all your material handling needs — from dock equipment, pallet rack and
                shelving systems to conveyor systems, ergonomics and much more.
              </p>
              <p>
                We&apos;re family-run and based on Crane Street in Schenectady. When you call, you talk to
                people who know warehouses — and who will still be here when you need parts, service
                or an expansion years from now.
              </p>
            </div>
            <CheckList items={aboutPoints} className="mt-8" />
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mezzanine.jpg" alt="Steel mezzanine with safety railings" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-secondary py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why Upstate" title="The crew you call back." />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUpstate.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div className="h-full rounded-xl border bg-card p-7">
                  <Icon name={w.icon} className="h-8 w-8 text-primary" />
                  <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Service area</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              Proudly serving Upstate New York.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Throughout Upstate New York — the Capital Region and beyond — plus nearby western New
              England. If you&apos;re close enough to call us, we&apos;ll get there.
            </p>
            <ButtonLink href="/projects" variant="dark" size="lg" className="mt-8">
              See our projects <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-primary" />
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
