import { ChevronDown, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/** The small uppercase label with a yellow rule that opens each section. */
export function Eyebrow({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "muted" | "primary";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em]",
        tone === "primary" ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      <span className="h-px w-10 bg-primary" /> {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow tone={dark ? "primary" : "muted"}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 font-display text-5xl leading-none tracking-wide sm:text-6xl",
          dark && "text-white",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-lg", dark ? "text-white/70" : "text-muted-foreground")}>{intro}</p>
      )}
    </div>
  );
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/**
 * Full-screen dark hero at the top of inner pages, matching the home hero.
 * `min-h-svh` fills the visible viewport (mobile toolbars included) but lets
 * the section grow when content is taller, e.g. on landscape phones.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image = "/images/hero-warehouse.jpg",
  highlights,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  /** Short check-marked selling points under the hero copy. */
  highlights?: string[];
  /** CTAs, breadcrumbs or quick links, rendered under the intro. */
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className="relative flex min-h-svh items-center overflow-hidden bg-steel-950 pt-16 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-steel-950 to-transparent" />
        <Container className="relative py-12 sm:py-16">
          <Eyebrow tone="primary" className="hero-rise">
            {eyebrow}
          </Eyebrow>
          <h1
            className="hero-rise mt-5 max-w-4xl text-balance font-display text-[2.75rem] leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="hero-rise mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ animationDelay: "240ms" }}
            >
              {intro}
            </p>
          )}
          {children && (
            <div className="hero-rise" style={{ animationDelay: "360ms" }}>
              {children}
            </div>
          )}
          {highlights && highlights.length > 0 && (
            <ul
              className="hero-rise mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70"
              style={{ animationDelay: "480ms" }}
            >
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 shrink-0 text-primary" /> {h}
                </li>
              ))}
            </ul>
          )}
        </Container>
        <a
          href="#after-hero"
          aria-label="Scroll to content"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-cue text-white/60 transition-colors hover:text-primary sm:block"
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </section>
      <div id="after-hero" className="scroll-mt-16" />
    </>
  );
}

/** Primary + secondary call-to-action pair used in heroes. */
export function HeroActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">{children}</div>;
}
