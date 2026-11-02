"use client";

import { useState } from "react";
import { projects } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

const TAGS = [...new Set(projects.flatMap((p) => p.tags))].sort();

/** All jobsite projects, filterable by type of work. */
export function ProjectGallery() {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => (p.tags as readonly string[]).includes(tag)) : projects;
  const chip = (on: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
      on ? "border-steel-950 bg-steel-950 text-primary" : "bg-card hover:border-primary",
    );

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        <button type="button" className={chip(!tag)} onClick={() => setTag(null)}>
          All ({projects.length})
        </button>
        {TAGS.map((t) => (
          <button key={t} type="button" className={chip(tag === t)} onClick={() => setTag(tag === t ? null : t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </>
  );
}
