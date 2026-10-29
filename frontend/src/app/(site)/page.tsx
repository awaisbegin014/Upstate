import { ArrowRight, ArrowUpRight, ChevronDown, CircleCheck, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/icon";
import {
  BrandMarquee,
  BrandMarqueeFallback,
  CategoryGrid,
  CategoryGridSkeleton,
  CheckList,
  ContactCards,
  CtaBand,
  FaqSection,
  FeaturedProducts,
  FeatureSplit,
  SameDayBand,
} from "@/components/site/blocks";
import { ProductGridSkeleton } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { Container, Eyebrow, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import {
  aboutPoints,
  howItWorks,
  serviceAreas,
  serviceSteps,
  site,
  stats,
  whyUpstate,
} from "@/lib/site";
import heroImage from "../../../public/images/hero-warehouse.jpg";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-steel-950 pt-16">
        <Image
          src={heroImage}
          alt="Forklift moving pallets inside a fully racked warehouse"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-steel-950 to-transparent" />
        <Container className="relative py-24 text-left">
          <div className="max-w-2xl">
            <p
              className="hero-rise flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary"
              style={{ animationDelay: "100ms" }}
            >
              <span className="h-px w-10 bg-primary" />
              Schenectady, NY · Since 1990
            </p>
            <h1
              className="hero-rise mt-6 font-display text-6xl leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "250ms" }}
            >
              Everything that
              <br />
              moves your
              <br />
              <span className="text-primary">facility.</span>
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-white/80"
              style={{ animationDelay: "400ms" }}
            >
              Pallet rack, shelving, conveyors, dock equipment and more — designed, sourced, installed
              and serviced by Upstate New York&apos;s material handling specialists. Now with online
              ordering for stocked equipment.
            </p>
            <div className="hero-rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "550ms" }}>
              <ButtonLink href="/shop" size="lg" className="shadow-lg hover:-translate-y-1">
                Shop equipment <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/contact?type=quote" variant="outline-light" size="lg">
                Request a free quote <ArrowUpRight className="h-5 w-5" />
              </ButtonLink>
            </div>
            <div
              className="hero-rise mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70"
              style={{ animationDelay: "700ms" }}
            >
              {["Design · Install · Service", "Same-day hand truck shipping", "35+ years serving Upstate NY"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <CircleCheck className="h-4 w-4 text-primary" /> {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </Container>
        <a
          href="#about"
          aria-label="Scroll to content"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-cue text-white/60 transition-colors hover:text-primary"
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-steel-900 py-10 text-white">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="text-center lg:text-left">
                <div className="font-display text-5xl tracking-wide text-primary">{s.value}</div>
                <div className="mt-2 text-sm text-white/70">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 bg-background py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              More than a sales organization.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Upstate Equipment Company has been serving the material handling equipment needs of
              Upstate New York businesses since its founding in June of 1990. We don&apos;t just sell
              equipment — we help you plan your space, choose the right solution, and keep it working
              for years.
            </p>
            <CheckList items={aboutPoints} className="mt-8" />
          </Reveal>
          <Reveal delay={150}>
            <div className="relative">
              <div className="rounded-xl border bg-card p-8 shadow-xl">
                <div className="font-display text-7xl tracking-wide text-primary">35+</div>
                <div className="mt-1 text-lg font-semibold">years of keeping Upstate NY moving</div>
                <div className="mt-8 grid grid-cols-2 gap-6 border-t pt-8 text-sm">
                  <div>
                    <div className="text-2xl font-bold">Dock to shelf</div>
                    <div className="mt-1 text-muted-foreground">Complete storage &amp; handling systems</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Crew-safe</div>
                    <div className="mt-1 text-muted-foreground">Ergonomics &amp; safety built into every layout</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-xl bg-primary" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Categories */}
      <section id="products" className="scroll-mt-24 bg-secondary py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Product categories"
              title="Whatever it is, we handle it."
              intro="Twelve categories of material handling equipment. Order stocked items online, or call us and we'll find it for you."
            />
          </Reveal>
          <div className="mt-14">
            <Suspense fallback={<CategoryGridSkeleton />}>
              <CategoryGrid />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="bg-background py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow="Shop online" title="In stock and ready to ship." />
            </Reveal>
            <ButtonLink href="/shop" variant="outline">
              View all products <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-12">
            <Suspense fallback={<ProductGridSkeleton count={4} />}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-steel-950 py-24 text-white">
        <Container>
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Services"
              title="From blueprint to bolt-down."
              intro="One call covers the whole project — no juggling contractors, sales reps and installers."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {serviceSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="group h-full rounded-xl border border-white/10 bg-steel-900 p-6 transition-all hover:-translate-y-1 hover:border-primary/60">
                  <div className="flex items-center justify-between">
                    <Icon name={s.icon} className="h-7 w-7 text-primary" />
                    <span className="font-display text-3xl text-white/20 transition-colors group-hover:text-primary/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/services"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-primary hover:text-white"
            >
              Explore our services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <FeatureSplit
        id="magliner"
        eyebrow="Featured · Hand equipment"
        title="Largest Magliner inventory north of NYC."
        body="We stock Magliner hand trucks, platform trucks, truck ramps and delivery equipment — plus the parts to keep them rolling. Call with your needs and chances are we assemble and ship your hand truck the same day."
        points={[
          "Hand trucks, platform trucks, ramps and delivery equipment in stock",
          "Same-day assembly and shipping on most hand trucks",
          "Replacement wheels, noses and parts for every model",
        ]}
        image="/images/hand-trucks.jpg"
        imageAlt="Row of new aluminum hand trucks lined up in a warehouse"
        cta={{ href: "/shop/hand-equipment", label: "Shop hand equipment" }}
      />
      <FeatureSplit
        id="mezzanines"
        tone="secondary"
        reverse
        eyebrow="Featured · Mezzanines"
        title="Add floor space without adding square footage."
        body="Need more floor space? Have a high-ceiling area sitting idle? We sell and install custom engineered mezzanines from Wildeck, Cogan and Cubic Design — at a cost per square foot far below new construction."
        points={[
          "Custom engineered work platforms and industrial guards",
          "Vertical reciprocating conveyors (VRCs) available",
          "Designed around your building, loads and code requirements",
        ]}
        image="/images/mezzanine.jpg"
        imageAlt="Steel mezzanine work platform with yellow safety railings inside a warehouse"
        cta={{ href: "/contact?type=quote", label: "Request a site visit" }}
      />
      <FeatureSplit
        id="dock"
        eyebrow="Featured · Dock equipment"
        title="No dock? No problem."
        body="Need to unload trucks but don't have a dock? Trying to keep the heat in — or the cold out? We design and modify existing docks to meet your needs, with hydraulic dock lifts, levelers, seals and shelters from Advance Lift, McGuire and Fairborn."
        points={[
          "Dock lifts, levelers, truck restraints and dock seals",
          "Yard ramps and portable dock plates for dockless buildings",
          "Air doors, strip curtains and high-speed roll-up doors",
        ]}
        image="/images/loading-dock.jpg"
        imageAlt="Worker loading a semi trailer through a dock leveler at a loading dock"
        cta={{ href: "/shop/dock-equipment", label: "Shop dock equipment" }}
      />

      {/* Brands */}
      <section id="brands" className="scroll-mt-24 overflow-hidden border-y border-white/10 bg-steel-900 py-16">
        <Container className="mb-10">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Brands we carry</p>
              <h2 className="mt-4 font-display text-4xl tracking-wide text-white sm:text-5xl">
                200+ manufacturer partners, one phone number.
              </h2>
            </div>
          </Reveal>
        </Container>
        <Suspense fallback={<BrandMarqueeFallback />}>
          <BrandMarquee />
        </Suspense>
        <div className="mt-10 text-center">
          <Link href="/brands" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-white">
            See the full supplier directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Four steps to a better facility." />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="relative border-t-4 border-primary pt-6">
                  <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Upstate */}
      <section className="bg-secondary py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why Upstate" title="The crew you call back." />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUpstate.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div className="h-full rounded-xl border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <Icon name={w.icon} className="h-8 w-8 text-primary" />
                  <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="bg-background py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Service area</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              Proudly serving Upstate New York.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Based on Crane Street in Schenectady and on the road across the region since 1990. If your
              facility is in New York&apos;s North Country, Capital Region, Mohawk Valley, Southern Tier
              or Hudson Valley — we&apos;ve probably worked down the road from you.
            </p>
            <a
              href={site.phone.href}
              className="mt-8 inline-flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-5 w-5 text-primary" />
              {site.phone.display}
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary"
                >
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

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 bg-steel-950 py-24 text-white">
        <Container>
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Get a quote"
              title="Talk to a material handling pro today."
              intro="Tell us what's moving — or what's stuck — and we'll take it from there. Prefer to browse first? The online store is always open."
            />
          </Reveal>
          <ContactCards className="mt-14" />
          <SameDayBand />
          <div className="mt-10">
            <ButtonLink href="/contact?type=quote" size="lg">
              Send us your project details <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
