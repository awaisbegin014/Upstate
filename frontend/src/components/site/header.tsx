"use client";

import { ArrowRight, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useSession } from "@/hooks/use-session";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/shop") return pathname.startsWith("/shop") || pathname.startsWith("/products");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinkList({ pathname }: { pathname?: string }) {
  return (
    <>
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname && isActive(pathname, item.href) ? "text-primary" : "text-white/80",
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

/** usePathname can suspend on dynamic routes, so it lives in its own boundary. */
function ActiveNavLinks() {
  return <NavLinkList pathname={usePathname()} />;
}

/** Closes the mobile menu and search when the route changes. */
function RouteChangeCloser({ onChange }: { onChange: () => void }) {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onChange();
  }, [pathname, onChange]);
  return null;
}

function CartButton() {
  const { data } = useCart();
  const count = data?.itemCount ?? 0;
  return (
    <Link
      href="/cart"
      aria-label={`Cart${count ? `, ${count} items` : ""}`}
      className="relative rounded-md p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

function AccountButton() {
  const { user } = useSession();
  const href = user ? (user.role === "ADMIN" ? "/admin" : "/account") : "/login";
  const label = user ? (user.role === "ADMIN" ? "Admin panel" : "My account") : "Sign in";
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="rounded-md p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
    >
      <User className="h-5 w-5" />
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const router = useRouter();
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-steel-950/95 text-white backdrop-blur">
      <Suspense fallback={null}>
        <RouteChangeCloser onChange={closeAll} />
      </Suspense>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-baseline gap-2" aria-label={`${site.shortName} home`}>
          <span className="font-display text-2xl tracking-wide text-primary">UPSTATE</span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:inline">
            Equipment Co.
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          <Suspense fallback={<NavLinkList />}>
            <ActiveNavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={site.phone.href}
            className="mr-2 hidden items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-primary xl:flex"
          >
            <Phone className="h-4 w-4" />
            {site.phone.display}
          </a>
          <button
            type="button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-md p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </button>
          <AccountButton />
          <CartButton />
          <Link
            href="/contact?type=quote"
            className="ml-2 hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-white/10 bg-steel-950">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-3xl gap-2 px-4 py-4 sm:px-6">
            <input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search hand trucks, casters, shelving, SKU…"
              aria-label="Search products"
              className="w-full rounded-md border border-white/15 bg-steel-900 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
            />
            <button className="rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground">Search</button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-white/10 bg-steel-950 lg:hidden" aria-label="Mobile">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-2">
              <a href={site.phone.href} className="flex items-center gap-2 px-3 py-2 font-semibold text-white/90">
                <Phone className="h-4 w-4 text-primary" /> {site.phone.display}
              </a>
              <Link
                href="/contact?type=quote"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
