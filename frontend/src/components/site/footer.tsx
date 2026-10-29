import { ArrowUpRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

const explore = [
  { href: "/shop", label: "Shop all products" },
  { href: "/services", label: "Services" },
  { href: "/brands", label: "Brands we carry" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const popular = [
  { href: "/shop/hand-equipment", label: "Hand Equipment" },
  { href: "/shop/racks", label: "Racks" },
  { href: "/shop/shelving", label: "Shelving" },
  { href: "/shop/conveyors", label: "Conveyors" },
  { href: "/shop/dock-equipment", label: "Dock Equipment" },
  { href: "/shop/casters-and-wheels", label: "Casters & Wheels" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-steel-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl tracking-wide text-primary">UPSTATE</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Equipment Co., Inc.
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{site.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/60 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Popular categories</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {popular.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/60 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={site.mapUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <a href={site.phone.href} className="transition-colors hover:text-primary">
                  {site.phone.display}
                </a>
                <br />
                <a href={site.tollFree.href} className="transition-colors hover:text-primary">
                  {site.tollFree.display} {site.tollFree.digits}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Fax {site.fax}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${site.contacts[0].email}`} className="hover:text-primary">
                {site.contacts[0].email}
              </a>
            </li>
          </ul>
          <a
            href={site.catalogUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-white"
          >
            Full supplier catalog <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 pt-6 text-xs text-white/40 sm:px-6 lg:px-10">
        <span>© Upstate Equipment Co., Inc. All rights reserved.</span>
        <span>Serving Upstate New York since 1990</span>
      </div>
    </footer>
  );
}
