import "server-only";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ApiError } from "./api";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

/** One fetch per path per request, however many components ask for it. */
const fetchJson = cache(async (path: string) => {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api${path}`, { cache: "no-store" });
  } catch (e) {
    // Connection refused / DNS failure: the API process isn't reachable.
    console.error(
      `[server-api] Could not reach the API at ${API_URL}. Is the backend running? (cd backend && npm run start:dev)`,
      e,
    );
    throw new ApiError("The store is temporarily unavailable. Please try again shortly.", 503);
  }
  if (!res.ok) {
    let message = `API request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body?.message === "string") message = body.message;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(message, res.status);
  }
  return res.json() as Promise<unknown>;
});

/**
 * Server Component fetch straight to the NestJS API. Uncached across
 * requests: callers sit inside <Suspense> so catalog data is always fresh
 * after admin edits.
 */
export async function serverApi<T>(path: string): Promise<T> {
  return (await fetchJson(path)) as T;
}

/** Like serverApi, but a 404 renders the not-found page. */
export async function serverApiOr404<T>(path: string): Promise<T> {
  try {
    return await serverApi<T>(path);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }
}
