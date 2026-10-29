"use client";

import { RotateCw } from "lucide-react";
import { catchError, type ErrorInfo } from "next/error";
import { site } from "@/lib/site";

/**
 * Error boundary for one data-driven section, so a failed API call hides that
 * section instead of taking down the whole page. Pass `fallback` to render
 * static content instead of the default notice.
 */
function SectionFallback(props: { fallback?: React.ReactNode }, { retry }: ErrorInfo) {
  if (props.fallback !== undefined) return <>{props.fallback}</>;
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-6 text-sm">
      <p className="text-muted-foreground">
        This section couldn&apos;t load right now. For help, call{" "}
        <a href={site.phone.href} className="font-semibold text-foreground underline underline-offset-4">
          {site.phone.display}
        </a>
        .
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-semibold hover:border-primary"
      >
        <RotateCw className="h-4 w-4" /> Try again
      </button>
    </div>
  );
}

export const SectionBoundary = catchError(SectionFallback);
