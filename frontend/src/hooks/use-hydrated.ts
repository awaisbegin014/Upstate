"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False on the server and while React is hydrating, true afterwards.
 *
 * Client-fetched data (session, cart) can arrive while a later part of the
 * page is still hydrating — e.g. the header fetches the cart before a streamed
 * page segment hydrates. Rendering that data during hydration would not match
 * the server HTML (React error #418), so shared hooks hide it until hydrated.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
