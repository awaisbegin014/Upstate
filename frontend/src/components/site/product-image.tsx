import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * A product photo, or a branded placeholder (category icon on steel) when the
 * product has no image yet — admins add real photos from the admin panel.
 */
export function ProductImage({
  src,
  alt,
  icon,
  brand,
  className,
  size = "md",
}: {
  src?: string | null;
  alt: string;
  icon: string;
  brand?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  if (src) {
    return (
      // Uploaded images come through the /uploads rewrite; plain <img> keeps
      // them independent of the image optimizer.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} loading="lazy" className={cn("h-full w-full object-cover", className)} />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-steel-900 text-primary",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 14px)",
        }}
      />
      <Icon
        name={icon}
        className={cn("relative", size === "sm" ? "h-7 w-7" : size === "lg" ? "h-20 w-20" : "h-12 w-12")}
        strokeWidth={1.5}
      />
      {brand && size !== "sm" && (
        <span
          className={cn(
            "relative mt-3 font-display tracking-wider text-white/60",
            size === "lg" ? "text-3xl" : "text-xl",
          )}
        >
          {brand}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
    </div>
  );
}
