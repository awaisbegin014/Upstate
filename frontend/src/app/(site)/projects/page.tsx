import type { Metadata } from "next";
import { CtaBand } from "@/components/site/blocks";
import { Reveal } from "@/components/site/reveal";
import { Container, PageHero } from "@/components/site/section";
import { projects } from "@/lib/site";

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
      />
      <section className="bg-background py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card">
                <div className="grid grid-cols-3 gap-1 bg-steel-950 p-1">
                  {p.photos.map((photo, j) => (
                    // Only thumbnails of the original jobsite photos survive, so
                    // they are shown small rather than stretched.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={photo}
                      src={`/projects/${photo}.jpg`}
                      alt={`${p.title} — photo ${j + 1}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-sm object-cover"
                    />
                  ))}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
