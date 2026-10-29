"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonClass } from "@/components/ui/button";
import { useCartActions } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function QuantityInput({
  value,
  onChange,
  max,
  disabled,
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  disabled?: boolean;
  className?: string;
}) {
  const limit = Math.max(1, Math.min(max ?? 999, 999));
  const set = (n: number) => onChange(Math.max(1, Math.min(limit, Math.floor(n) || 1)));
  return (
    <div className={cn("inline-flex h-11 items-center rounded-md border bg-card", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= 1}
        onClick={() => set(value - 1)}
        className="flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label="Quantity"
        min={1}
        max={limit}
        value={value}
        disabled={disabled}
        onChange={(e) => set(Number(e.target.value))}
        className="h-full w-12 border-x bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= limit}
        onClick={() => set(value + 1)}
        className="flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function AddToCart({
  productId,
  name,
  stock,
}: {
  productId: string;
  name: string;
  stock: number;
}) {
  const [qty, setQty] = useState(1);
  const { add } = useCartActions();
  const [added, setAdded] = useState(false);

  if (stock <= 0) {
    return (
      <div className="space-y-3">
        <Button disabled size="lg" className="w-full sm:w-auto">
          Out of stock
        </Button>
        <p className="text-sm text-muted-foreground">
          Need it sooner?{" "}
          <Link href="/contact" className="font-semibold underline underline-offset-4">
            Ask us about lead times
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <QuantityInput value={qty} onChange={setQty} max={stock} disabled={add.isPending} />
      <Button
        size="lg"
        disabled={add.isPending}
        onClick={() =>
          add.mutate({ productId, quantity: qty, name }, { onSuccess: () => setAdded(true) })
        }
        className="flex-1 sm:flex-none"
      >
        <ShoppingCart className="h-5 w-5" />
        {add.isPending ? "Adding…" : "Add to cart"}
      </Button>
      {added && (
        <Link href="/cart" className={buttonClass("outline", "lg")}>
          View cart
        </Link>
      )}
    </div>
  );
}
