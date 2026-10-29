import { Clock, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactCards } from "@/components/site/blocks";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Container, PageHero } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote",
  description:
    "Contact Upstate Equipment Co., 1417 Crane Street, Schenectady, NY 12303. Phone 518.370.7000, toll free 800.7.MAGLINE, fax 518.370.7002.",
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
        intro="Tell us what's moving — or what's stuck — and we'll take it from there."
      />
      <section className="bg-steel-950 pb-16 text-white">
        <Container>
          <ContactCards />
        </Container>
      </section>

      <section className="bg-background py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="font-display text-5xl tracking-wide">Request a quote or ask a question</h2>
            <p className="mt-3 text-muted-foreground">
              Include equipment, quantities, dimensions and your timeline — or just describe the
              problem. We usually reply within one business day.
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
                Call {site.tollFree.display} {site.tollFree.digits}. Chances are we can assemble and ship your
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
    </>
  );
}
