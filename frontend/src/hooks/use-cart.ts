"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Cart, StoreSettings } from "@/lib/types";
import { useHydrated } from "./use-hydrated";

export const CART_KEY = ["cart"] as const;

/** The current cart. Reports "pending" until hydration so markup matches the server. */
export function useCart(): { data: Cart | undefined; isPending: boolean; error: Error | null } {
  const hydrated = useHydrated();
  const query = useQuery({
    queryKey: CART_KEY,
    queryFn: () => api<Cart>("/cart"),
  });
  if (!hydrated) return { data: undefined, isPending: true, error: null };
  return { data: query.data, isPending: query.isPending, error: query.error };
}

export function useStoreSettings() {
  return useQuery({
    queryKey: ["store-settings"],
    queryFn: () => api<StoreSettings>("/store/settings"),
    staleTime: 5 * 60_000,
  });
}

export function useCartActions() {
  const qc = useQueryClient();
  const set = (cart: Cart) => qc.setQueryData(CART_KEY, cart);
  const onError = (e: Error) => toast.error(e.message);

  const add = useMutation({
    mutationFn: (v: { productId: string; quantity: number; name?: string }) =>
      api<Cart>("/cart/items", {
        method: "POST",
        body: { productId: v.productId, quantity: v.quantity },
      }),
    onSuccess: (cart, v) => {
      set(cart);
      if (cart.notice) toast.warning(cart.notice);
      else toast.success(v.name ? `${v.name} added to cart` : "Added to cart");
    },
    onError,
  });

  const update = useMutation({
    mutationFn: (v: { itemId: string; quantity: number }) =>
      api<Cart>(`/cart/items/${v.itemId}`, { method: "PATCH", body: { quantity: v.quantity } }),
    onSuccess: set,
    onError,
  });

  const remove = useMutation({
    mutationFn: (itemId: string) => api<Cart>(`/cart/items/${itemId}`, { method: "DELETE" }),
    onSuccess: set,
    onError,
  });

  return { add, update, remove };
}
