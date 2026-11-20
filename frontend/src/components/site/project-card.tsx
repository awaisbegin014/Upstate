import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/site";
import { ProjectPhotos } from "./project-photos";
import { Reveal } from "./reveal";
import { Container, SectionHeading } from "./section";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
      <ProjectPhotos title={project.title} photos={project.photos} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold">
              {t}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.body}</p>
      </div>
    </article>
  );
}

/** Matches the teaser intro: weekend dock lift, pick-and-pack, drive-in rack. */
const DEFAULT_PICKS = [
  "Dock lift where there was no dock",
  "Complete picking & packing system",
  "36' high drive-in rack",
];

/** Three jobsite stories with a link to the full Projects page. */
export function ProjectsTeaser({
  className,
  picks = DEFAULT_PICKS,
}: {
  className?: string;
  /** Titles of the projects to show, in order (looked up by title, so adding projects never shifts them). */
  picks?: readonly string[];
}) {
  const shown = picks.map((title) => {
    const project = projects.find((p) => p.title === title);
    if (!project) throw new Error(`ProjectsTeaser: no project titled "${title}" in lib/site.ts`);
    return project;
  });

  return (
    <section className={className ?? "bg-background py-24"}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow="From the field"
              title="Recent work across Upstate NY."
              intro="Dock lifts poured and installed over a weekend, pick-and-pack systems, drive-in rack and custom walkways."
            />
          </Reveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-foreground/20 px-5 py-3 text-sm font-bold hover:border-primary hover:bg-primary/10"
          >
            See all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, n) => (
            <Reveal key={project.title} delay={n * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
