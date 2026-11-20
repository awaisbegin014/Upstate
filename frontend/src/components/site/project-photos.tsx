"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectPhotoSrc } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Cap on how far the viewer stretches a photo beyond its real pixel size, so
 * a small image never turns into a blur on a large screen.
 */
const MAX_UPSCALE = 1.5;

/** Horizontal swipe distance (px) that moves to the next or previous photo. */
const SWIPE_THRESHOLD = 50;

/** Columns for a strip of `count` photos, chosen so rows fill evenly where possible. */
function tileGrid(count: number) {
  if (count === 2) return "grid-cols-2";
  if (count === 3 || count === 6 || count === 9) return "grid-cols-3";
  if (count === 4) return "grid-cols-2 sm:grid-cols-4";
  if (count === 5) return "grid-cols-3 sm:grid-cols-5";
  return "grid-cols-4";
}

const LEAD_SPAN: Record<number, string> = { 2: "col-span-2", 3: "col-span-3", 4: "col-span-4" };

/**
 * In the 4-column layout (7, 8, 10+ photos), widen the first photo to fill
 * what would otherwise be empty cells at the end of the last row.
 */
function leadSpan(count: number) {
  if (tileGrid(count) !== "grid-cols-4") return undefined;
  return LEAD_SPAN[1 + ((4 - (count % 4)) % 4)];
}

/**
 * A project's photo strip. Every photo is a button that opens it in a
 * full-screen viewer, with next/previous through the rest of that project.
 */
export function ProjectPhotos({
  title,
  photos,
}: {
  title: string;
  photos: readonly string[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const count = photos.length;
  const single = count === 1;
  const lead = leadSpan(count);

  return (
    <>
      <div className={cn(single ? "bg-steel-950" : ["grid gap-1 bg-steel-950 p-1", tileGrid(count)])}>
        {photos.map((photo, i) => (
          <button
            key={photo}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Enlarge photo ${i + 1} of ${count}: ${title}`}
            aria-haspopup="dialog"
            className={cn(
              "group/photo relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-steel-950",
              single ? "aspect-[16/9]" : ["rounded-sm", count === 2 ? "aspect-[16/10]" : "aspect-[4/3]"],
              // The widened lead photo takes its height from the row instead of its own aspect ratio.
              i === 0 && lead && [lead, "aspect-auto"],
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={projectPhotoSrc(photo)}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-steel-950/45 opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Expand className="h-5 w-5" />
              </span>
            </span>
            {/* Always-visible hint for touch screens, where there is no hover. */}
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-steel-950/70 text-white [@media(hover:hover)]:hidden"
            >
              <Expand className="h-3.5 w-3.5" />
            </span>
          </button>
        ))}
      </div>
      {open !== null && (
        <PhotoViewer
          title={title}
          photos={photos}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

/** Full-screen photo viewer on the native modal <dialog> (focus trap, Esc to close, top layer). */
function PhotoViewer({
  title,
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  title: string;
  photos: readonly string[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  /** Set after a swipe so the click the browser fires next does not close the viewer. */
  const swiped = useRef(false);
  const [natural, setNatural] = useState<{ src: string; width: number } | null>(null);
  /** Photos with no full-size file; the viewer shows the card image instead. */
  const [noFull, setNoFull] = useState<ReadonlySet<string>>(() => new Set());
  const count = photos.length;
  const many = count > 1;
  const photo = photos[index];
  const src = projectPhotoSrc(photo, noFull.has(photo) ? "card" : "full");

  const go = useCallback(
    (step: number) => onIndexChange((index + step + count) % count),
    [index, count, onIndexChange],
  );

  // Open as a modal, lock page scroll, and hand focus back to the photo that
  // opened the viewer when it closes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      opener?.focus({ preventScroll: true });
    };
  }, []);

  /** Close when the click lands on the dark backdrop rather than on a control. */
  const closeOnBackdrop = (e: React.MouseEvent) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (e.target === e.currentTarget) onClose();
  };

  // Preload the neighbours so next/previous is instant.
  useEffect(() => {
    if (!many) return;
    for (const step of [1, -1]) {
      const img = new Image();
      img.src = projectPhotoSrc(photos[(index + step + count) % count], "full");
    }
  }, [index, count, many, photos]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const width = natural?.src === src ? Math.round(natural.width * MAX_UPSCALE) : undefined;
  const navButton =
    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-steel-900/80 text-white ring-1 ring-white/15 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} — photo viewer`}
      onClose={onClose}
      onKeyDown={onKeyDown}
      className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-steel-950/90 p-0 text-white backdrop:bg-transparent backdrop:backdrop-blur-md"
    >
      <div className="flex h-full flex-col" onClick={closeOnBackdrop}>
        <header className="flex shrink-0 items-start justify-between gap-4 px-4 pt-4 sm:px-6">
          <div className="min-w-0">
            <p className="truncate font-bold sm:text-lg">{title}</p>
            {many && (
              <p className="text-sm text-white/60" aria-live="polite">
                Photo {index + 1} of {count}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y touch-pinch-zoom items-center justify-center px-4 py-4 sm:px-20"
          onClick={closeOnBackdrop}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
          }}
          onPointerUp={(e) => {
            const start = swipeStart.current;
            swipeStart.current = null;
            if (start === null || !many) return;
            const dx = e.clientX - start;
            if (Math.abs(dx) >= SWIPE_THRESHOLD) {
              swiped.current = true;
              go(dx < 0 ? 1 : -1);
            }
          }}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt={`${title} — photo ${index + 1} of ${count}`}
            onLoad={(e) => setNatural({ src, width: e.currentTarget.naturalWidth })}
            onError={() => {
              if (!noFull.has(photo)) setNoFull((prev) => new Set(prev).add(photo));
            }}
            draggable={false}
            style={width ? { width } : undefined}
            // No border/shadow: with object-contain the element box can be wider
            // than the visible picture, and a frame would show the empty edges.
            className="lightbox-photo h-auto max-h-full max-w-full select-none object-contain"
          />

          {many && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={cn(navButton, "left-2 sm:left-5")}>
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className={cn(navButton, "right-2 sm:right-5")}>
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
        </div>

        {many && (
          <div className="flex shrink-0 justify-center gap-2 overflow-x-auto px-4 pb-5 pt-1">
            {photos.map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 transition focus-visible:outline-none focus-visible:ring-primary",
                  i === index ? "ring-primary" : "opacity-60 ring-transparent hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={projectPhotoSrc(photo)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}
