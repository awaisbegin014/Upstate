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
      <section className="relative flex min-h-svh items-center overflow-hidden bg-steel-950 pt-24 sm:pt-28 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/85 to-steel-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-steel-950 to-transparent" />
        <Container className={HERO.container}>
          <Eyebrow tone="primary" className="hero-rise">
            {eyebrow}
          </Eyebrow>
          <h1
            // leading must come after the font-size classes, or tailwind-merge drops it.
            className={cn("hero-rise max-w-4xl text-balance font-display tracking-wide", HERO.title, "leading-[0.95]", HERO.gapTitle)}
            style={{ animationDelay: "120ms" }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={cn("hero-rise max-w-2xl leading-relaxed text-white/80", HERO.intro, HERO.gapIntro)}
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
              className={cn("hero-rise flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70", HERO.highlights)}
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
          className={cn(
            "absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-cue text-white/60 transition-colors hover:text-primary sm:block",
            HERO.cue,
          )}
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </section>
      <div id="after-hero" className="scroll-mt-16" />
    </>
  );
}

/**
 * Hero sizing that scales with the viewport *height* as well as width, so a
 * hero always fits one screen: on a 1920×1080 monitor it matches the design,
 * on a 1366×768 laptop or a small phone the headline and spacing shrink.
 * `svh` is used (not `vh`) so mobile browser toolbars are accounted for.
 */
export const HERO = {
  container: "relative py-[clamp(1.25rem,5svh,4rem)]",
  /** Width caps match the design (2.75rem → 6rem); height caps shrink it on short screens. */
  title:
    "text-[clamp(2.25rem,min(11.5vw,7svh),2.75rem)] sm:text-[clamp(2.5rem,8svh,3.75rem)] lg:text-[clamp(2.75rem,8.5svh,4.5rem)] xl:text-[clamp(3rem,9svh,6rem)]",
  gapTitle: "mt-[clamp(0.5rem,2svh,1.25rem)]",
  intro: "text-base sm:text-[clamp(1rem,2.2svh,1.125rem)]",
  gapIntro: "mt-[clamp(0.75rem,2.5svh,1.5rem)]",
  actions: "mt-[clamp(1rem,3.5svh,2rem)] [@media(max-height:760px)]:[&>a]:py-3",
  chips: "mt-[clamp(0.75rem,3svh,2rem)]",
  highlights: "mt-[clamp(1rem,4svh,2.5rem)] max-sm:[@media(max-height:700px)]:hidden",
  /** The scroll cue would sit on top of content on short screens. */
  cue: "[@media(max-height:760px)]:hidden",
};

/** Primary + secondary call-to-action pair used in heroes. */
export function HeroActions({ children }: { children: React.ReactNode }) {
  return <div className={cn("flex flex-wrap items-center gap-3 sm:gap-4", HERO.actions)}>{children}</div>;
}

/** Wrapping row of pill links inside a hero (category or section shortcuts). */
export function HeroChips({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={label} className={cn("hidden max-w-4xl flex-wrap gap-2 sm:flex", HERO.chips, className)}>
      {children}
    </nav>
  );
}

export const heroChipClass =
  "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-primary hover:text-primary [@media(max-height:700px)]:px-3 [@media(max-height:700px)]:py-1 [@media(max-height:700px)]:text-xs";
