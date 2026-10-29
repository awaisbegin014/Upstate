"use client";

import {
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Receipt,
  Settings,
  Tags,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuthActions, useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Warehouse },
  { href: "/admin/brands", label: "Brands", icon: Tags },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavItems({ pathname, onNavigate }: { pathname?: string; onNavigate?: () => void }) {
  return (
    <>
      {NAV.map((item) => {
        const active =
          pathname !== undefined &&
          (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-white/75 hover:bg-white/10 hover:text-white",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

function ActiveNav({ onNavigate }: { onNavigate?: () => void }) {
  return <NavItems pathname={usePathname()} onNavigate={onNavigate} />;
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useSession();
  const { logout } = useAuthActions();
  const router = useRouter();
  return (
    <div className="flex h-full flex-col bg-steel-950 text-white">
      <Link href="/admin" className="flex items-baseline gap-2 px-5 py-5" onClick={onNavigate}>
        <span className="font-display text-2xl tracking-wide text-primary">UPSTATE</span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Admin</span>
      </Link>
      <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
        <Suspense fallback={<NavItems onNavigate={onNavigate} />}>
          <ActiveNav onNavigate={onNavigate} />
        </Suspense>
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" /> View store
        </Link>
        <button
          type="button"
          onClick={() => logout.mutate(undefined, { onSettled: () => router.push("/login") })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
        {user && <p className="truncate px-3 pt-2 text-xs text-white/40">{user.email}</p>}
      </div>
    </div>
  );
}

/** Admin chrome. The API enforces the ADMIN role; this only keeps others out of the UI. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isPending && (!user || user.role !== "ADMIN")) router.replace("/login?next=/admin");
  }, [isPending, user, router]);

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary text-muted-foreground">
        Checking access…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">
        <Sidebar />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
      <div className="min-w-0">
        <div className="flex items-center justify-between border-b bg-steel-950 px-4 py-3 text-white lg:hidden">
          <span className="font-display text-xl tracking-wide text-primary">UPSTATE ADMIN</span>
          <button type="button" aria-label="Menu" onClick={() => setOpen((v) => !v)} className="p-1">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
