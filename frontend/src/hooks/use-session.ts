"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import { useHydrated } from "./use-hydrated";

export const SESSION_KEY = ["session"] as const;

/** The signed-in user. Reports "pending" until hydration so markup matches the server. */
export function useSession(): { user: User | null; isPending: boolean } {
  const hydrated = useHydrated();
  const query = useQuery({
    queryKey: SESSION_KEY,
    queryFn: () => api<{ user: User | null }>("/auth/session"),
    staleTime: 60_000,
  });
  if (!hydrated) return { user: null, isPending: true };
  return { user: query.data?.user ?? null, isPending: query.isPending };
}

/** Sign-in / sign-up / sign-out. Each refreshes the session and the cart (guest carts merge on sign-in). */
export function useAuthActions() {
  const qc = useQueryClient();
  const refresh = async (user: User | null) => {
    qc.setQueryData(SESSION_KEY, { user });
    await qc.invalidateQueries({ queryKey: ["cart"] });
    await qc.invalidateQueries({ queryKey: ["orders"] });
  };

  const login = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      api<{ user: User }>("/auth/login", { method: "POST", body }),
    onSuccess: ({ user }) => refresh(user),
  });

  const register = useMutation({
    mutationFn: (body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
      company?: string;
    }) => api<{ user: User }>("/auth/register", { method: "POST", body }),
    onSuccess: ({ user }) => refresh(user),
  });

  const logout = useMutation({
    mutationFn: () => api("/auth/logout", { method: "POST" }),
    onSettled: () => {
      qc.clear();
      qc.setQueryData(SESSION_KEY, { user: null });
    },
  });

  return { login, register, logout };
}
