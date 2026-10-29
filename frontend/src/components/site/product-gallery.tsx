"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";

export function ProductGallery({
  images,
  name,
  icon,
  brand,
}: {
  images: { id: string; url: string; alt: string }[];
  name: string;
  icon: string;
  brand?: string | null;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-card shadow-sm">
        <ProductImage src={current?.url} alt={current?.alt || name} icon={icon} brand={brand} size="lg" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "aspect-square overflow-hidden rounded-md border-2 bg-card",
                i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <ProductImage src={img.url} alt="" icon={icon} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
