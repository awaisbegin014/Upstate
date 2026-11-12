import { ArrowDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactCards, FaqSection } from "@/components/site/blocks";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Reveal } from "@/components/site/reveal";
import { Container, HeroActions, PageHero, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { nextSteps, serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote",
  description:
    "Contact Upstate Equipment Co., 1417 Crane Street, Schenectady, NY 12303. Phone 518.370.7000, fax 518.370.7002.",
};

async function ContactForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const sp = await searchParams;
  return <InquiryForm defaultKind={sp.type === "question" ? "CONTACT" : "QUOTE"} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Talk to a material handling pro today."
        intro="Tell us what's moving — or what's stuck — and we'll take it from there. Call, email or send the form below."
        image="/images/hero-warehouse.jpg"
        highlights={[
          `${site.address.street}, ${site.address.city}, ${site.address.state}`,
          `Phone ${site.phone.display}`,
          `Fax ${site.fax}`,
        ]}
      >
        <HeroActions>
          <ButtonLink href={site.phone.href} size="lg">
            <Phone className="h-5 w-5" /> Call {site.phone.display}
          </ButtonLink>
          <ButtonLink href="#quote-form" variant="outline-light" size="lg">
            Send a message <ArrowDown className="h-5 w-5" />
          </ButtonLink>
        </HeroActions>
      </PageHero>

      <section className="bg-steel-950 py-16 text-white">
        <Container>
          <ContactCards />
        </Container>
      </section>

      <section id="quote-form" className="scroll-mt-16 bg-background py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-5xl tracking-wide">Request a quote or ask a question</h2>
            <p className="mt-3 text-muted-foreground">
              Include equipment, quantities, dimensions and your timeline — or just describe the problem.
              Photos or drawings help; mention them and we&apos;ll reply with where to send them.
            </p>
            <div className="mt-8">
              <Suspense fallback={<InquiryForm />}>
                <ContactForm searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <Mail className="h-5 w-5 text-primary" /> E-mail
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {site.contacts.map((c) => (
                  <li key={c.email}>
                    <div className="font-semibold">{c.name}</div>
                    <a href={`mailto:${c.email}`} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
                      {c.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <Clock className="h-5 w-5 text-primary" /> Same-day hand trucks
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Call {site.phone.display}. Chances are we can assemble and ship your
                hand truck the same day.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border">
              <iframe
                title="Map to Upstate Equipment Co."
                src={site.mapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </Container>
      </section>

      {/* What happens next */}
      <section className="bg-secondary py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What happens next" title="No runaround, just answers." />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {nextSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="border-t-4 border-primary pt-6">
                  <div className="font-display text-5xl text-foreground/15">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="bg-background py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Throughout Upstate New York."
              intro="The Capital Region and beyond, plus nearby western New England. If you're close enough to call us, we'll get there."
            />
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
    </>
  );
}
