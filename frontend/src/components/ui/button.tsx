import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:-translate-y-0.5 shadow-sm",
  dark: "bg-steel-950 text-primary hover:-translate-y-0.5",
  outline: "border border-foreground/20 text-foreground hover:border-primary hover:bg-primary/10",
  "outline-light": "border border-white/30 text-white hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:bg-secondary",
  danger: "bg-destructive text-white hover:opacity-90",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "px-7 py-4 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-bold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
