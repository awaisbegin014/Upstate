import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountBenefits } from "@/components/site/account-benefits";
import { RegisterForm } from "@/components/site/auth-forms";
import { Container } from "@/components/site/section";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

export default function RegisterPage() {
  return (
    <div className="bg-secondary pt-16">
      <Container className="grid items-start gap-8 py-16 lg:grid-cols-[1fr_420px] lg:gap-12">
        <div className="w-full max-w-xl justify-self-center rounded-xl border bg-card p-8 shadow-sm lg:justify-self-end">
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
        <AccountBenefits />
      </Container>
    </div>
  );
}
