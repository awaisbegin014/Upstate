"use client";

import { ArrowRight, ArrowUpRight, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
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
      {mainNav.map((item) => {
        const active = pathname ? isActive(pathname, item.href) : false;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-3.5 py-2 text-sm font-semibold tracking-wide transition-all rounded-md",
              active
                ? "text-primary font-bold bg-white/5"
                : "text-white/80 hover:text-white hover:bg-white/5",
            )}
          >
            {item.label}
            {active && (
              <span className="absolute bottom-0 inset-x-3.5 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
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
      className="relative rounded-lg p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute 0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">
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
      className="rounded-lg p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      <User className="h-5 w-5" />
    </Link>
  );
}

/**
 * Authentic Upstate Equipment Pyramid & Ascending Staircase Emblem.
 * Faithfully vectorized from the original corporate seal.
 */
export function UpstateEmblem({ className = "h-10 w-10 text-primary" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" className={className} fill="currentColor" aria-hidden="true">
      {/* Top/Left Peak with descending staircase */}
      <polygon points="50,6 64.3,32 50,32 50,44 40,44 40,56 30,56 30,68 20,68 20,80 9.2,80" />
      {/* Bottom/Right Base with matching ascending staircase */}
      <polygon points="94,86 38,86 38,74 48,74 48,62 58,62 58,50 68,50 68,38 73,38" />
    </svg>
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

      {/* Top Utility Bar with Stressed Local Direct Dial and Corporate Address */}
      <div className="border-b border-white/10 bg-steel-950/95 py-2 text-xs text-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Direct Line with Pulse */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 font-medium text-white/75">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                Direct Line:
              </span>
              <a
                href={site.phone.href}
                className="text-sm font-extrabold text-primary hover:text-white transition-colors tracking-wide"
                title="Call direct: 518.370.7000"
              >
                {site.phone.display}
              </a>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline text-[11px] text-white/60">
              Local &amp; Long Distance (No 800 Needed)
            </span>
          </div>

          {/* Right: Address & Fax & Catalog */}
          <div className="hidden md:flex items-center gap-4 text-xs text-white/65">
            <span>
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </span>
            <span className="text-white/20">•</span>
            <span>Fax: {site.fax}</span>
            <span className="text-white/20">•</span>
            <a
              href={site.catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/80 hover:text-primary transition-colors"
            >
              <span>Digital Catalog</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 shrink-0"
          aria-label={`${site.shortName} home`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-steel-900 border border-white/10 p-1.5 transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(12,169,64,0.25)]">
            <UpstateEmblem className="h-full w-full text-primary transition-transform group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-cooper text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors leading-tight">
              Upstate Equipment <span className="text-primary font-normal">Co., Inc.</span>
            </div>
            <span className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 whitespace-nowrap">
              Schenectady, NY · Material Handling Since 1990
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex" aria-label="Main">
          <Suspense fallback={<NavLinkList />}>
            <ActiveNavLinks />
          </Suspense>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-lg p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <AccountButton />
          <CartButton />
          <Link
            href="/contact?type=quote"
            className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md bg-primary px-3.5 py-2 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get a Quote</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
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
            <button className="rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground">
              Search
            </button>
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
