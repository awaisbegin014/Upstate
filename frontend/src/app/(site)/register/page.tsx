import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "@/components/site/auth-forms";
import { Container } from "@/components/site/section";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

export default function RegisterPage() {
  return (
    <div className="bg-secondary pt-16">
      <Container className="flex justify-center py-16">
        <div className="w-full max-w-xl rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="font-display text-5xl tracking-wide">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Save your company details, order online and keep every invoice in one place.
          </p>
          <div className="mt-6">
            <Suspense>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
