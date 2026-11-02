import { ArrowDown, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { CtaBand } from "@/components/site/blocks";
import { ProjectGallery } from "@/components/site/project-gallery";
import { Reveal } from "@/components/site/reveal";
import { Container, HeroActions, PageHero, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { howItWorks, projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Jobsite photos from Upstate Equipment installs: dock lifts, dock seals, drive-in and pushback rack, pick-and-pack systems, mezzanines, walkways and custom ladders.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work we've designed, supplied and installed."
        intro="A selection of jobsite photos from across Upstate New York — from a dock lift poured and installed over a weekend to complete pick-and-pack systems."
        image="/images/loading-dock.jpg"
        highlights={[
          `${projects.length} featured jobs`,
          "Docks, racking, mezzanines & walkways",
          "Designed and installed by our team",
        ]}
      >
        <HeroActions>
          <ButtonLink href="#after-hero" size="lg">
            View projects <ArrowDown className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/contact?type=quote" variant="outline-light" size="lg">
            Start your project <ArrowRight className="h-5 w-5" />
          </ButtonLink>
        </HeroActions>
      </PageHero>

      <section className="bg-background py-20">
        <Container>
          <SectionHeading
            eyebrow="Jobsite gallery"
            title="Every one of these started with a phone call."
            intro="Filter by the kind of work you're planning."
          />
          <div className="mt-10">
            <ProjectGallery />
          </div>
        </Container>
      </section>

      <section className="bg-secondary py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How a project comes together" title="From your floor to finished install." />
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
