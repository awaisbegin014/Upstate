import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Container, SectionHeading } from "./section";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  const count = project.photos.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
      {count === 1 ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-steel-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/projects/${project.photos[0]}.jpg`}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-1 bg-steel-950 p-1",
            count === 2
              ? "grid-cols-2"
              : count === 3
                ? "grid-cols-3"
                : count === 4
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-3 sm:grid-cols-5",
          )}
        >
          {project.photos.map((photo, j) => (
            <div
              key={photo}
              className={cn(
                "overflow-hidden rounded-sm",
                count === 2 ? "aspect-[16/10]" : "aspect-[4/3]",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/projects/${photo}.jpg`}
                alt={`${project.title} — photo ${j + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
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

/** Three jobsite stories with a link to the full Projects page. */
export function ProjectsTeaser({
  className,
  picks = [0, 3, 6],
}: {
  className?: string;
  /** Indexes into `projects`. */
  picks?: number[];
}) {
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
          {picks.map((i, n) => (
            <Reveal key={projects[i].title} delay={n * 100}>
              <ProjectCard project={projects[i]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
