"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { useAuthActions } from "@/hooks/use-session";
import type { User } from "@/lib/types";

/** Only same-site relative paths are allowed as a post-login redirect. */
function safeNext(next: string | null, user: User) {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return user.role === "ADMIN" ? "/admin" : "/account";
}

export function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuthActions();
  const next = params.get("next");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        login.mutate(
          { email: String(f.get("email")), password: String(f.get("password")) },
          { onSuccess: ({ user }) => router.replace(safeNext(next, user)) },
        );
      }}
    >
      <Field label="Email">
        <Input name="email" type="email" required autoComplete="email" autoFocus />
      </Field>
      <Field label="Password">
        <Input name="password" type="password" required autoComplete="current-password" />
      </Field>
      {login.error && <p className="text-sm font-medium text-destructive">{login.error.message}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={login.isPending}>
        {login.isPending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link
          href={next ? `/register?next=${encodeURIComponent(next)}` : "/register"}
          className="font-semibold text-foreground underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { register } = useAuthActions();
  const next = params.get("next");

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
        register.mutate(
          {
            email: f.email,
            password: f.password,
            firstName: f.firstName,
            lastName: f.lastName,
            phone: f.phone || undefined,
            company: f.company || undefined,
          },
          { onSuccess: ({ user }) => router.replace(safeNext(next, user)) },
        );
      }}
    >
      <Field label="First name" required>
        <Input name="firstName" required autoComplete="given-name" />
      </Field>
      <Field label="Last name" required>
        <Input name="lastName" required autoComplete="family-name" />
      </Field>
      <Field label="Company" className="sm:col-span-2">
        <Input name="company" autoComplete="organization" />
      </Field>
      <Field label="Email" required>
        <Input name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Phone">
        <Input name="phone" type="tel" autoComplete="tel" />
      </Field>
      <Field label="Password" required hint="At least 8 characters." className="sm:col-span-2">
        <Input name="password" type="password" required minLength={8} autoComplete="new-password" />
      </Field>
      {register.error && (
        <p className="text-sm font-medium text-destructive sm:col-span-2">{register.error.message}</p>
      )}
      <Button type="submit" size="lg" className="w-full sm:col-span-2" disabled={register.isPending}>
        {register.isPending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground sm:col-span-2">
        Already have an account?{" "}
        <Link
          href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"}
          className="font-semibold text-foreground underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
