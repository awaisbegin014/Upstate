/** Error carrying the API's user-facing message. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

async function parse<T>(res: Response): Promise<T> {
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const raw = body?.message;
    const message = Array.isArray(raw)
      ? raw[0]
      : typeof raw === "string"
        ? raw
        : "Something went wrong. Please try again.";
    throw new ApiError(message, res.status);
  }
  return body as T;
}

/**
 * Browser-side call through the Next.js /api rewrite, so session and cart
 * cookies are sent automatically.
 */
export async function api<T>(
  path: string,
  init: Omit<RequestInit, "body"> & { body?: unknown } = {},
): Promise<T> {
  const { body, headers, ...rest } = init;
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    ...rest,
    headers: {
      ...(body !== undefined && !isForm ? { "content-type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
  });
  return parse<T>(res);
}

/** Builds a query string, skipping empty values. */
export function qs(params: Record<string, string | number | boolean | undefined | null>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "" && v !== false) sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}
