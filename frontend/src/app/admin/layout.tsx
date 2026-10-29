import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/shell";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin | Upstate Equipment" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
