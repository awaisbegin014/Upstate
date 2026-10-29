"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
import { PageHeader } from "@/components/admin/ui";

export default function NewProductPage() {
  return (
    <>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All products
      </Link>
      <PageHeader title="New product" />
      <ProductForm />
    </>
  );
}
