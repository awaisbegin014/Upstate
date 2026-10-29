import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/site/section";
import { AccountOrder } from "./account-order";

export default function AccountOrderPage({ params }: PageProps<"/account/orders/[number]">) {
  return (
    <div className="bg-secondary pt-16">
      <Container className="py-12">
        <Link href="/account" className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to my account
        </Link>
        <div className="mt-6">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-card" />}>
            <Resolved params={params} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

async function Resolved({ params }: { params: PageProps<"/account/orders/[number]">["params"] }) {
  const { number } = await params;
  return <AccountOrder number={number} />;
}
