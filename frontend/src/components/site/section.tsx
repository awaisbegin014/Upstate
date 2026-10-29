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

/** Dark banner at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-steel-950 pt-16 text-white">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/90 to-steel-950/40" />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow tone="primary" className="hero-rise">
          {eyebrow}
        </Eyebrow>
        <h1
          className="hero-rise mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-white/75"
            style={{ animationDelay: "240ms" }}
          >
            {intro}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
