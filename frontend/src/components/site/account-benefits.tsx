import { CircleCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

const BENEFITS = [
  "Check out faster with your company details saved",
  "Add a PO number to every order",
  "See your order history and status in one place",
  "Your cart follows you when you sign in",
];

/** Side panel on the sign-in and register pages. */
export function AccountBenefits() {
  return (
    <aside className="rounded-xl bg-steel-950 p-8 text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Why an account?</p>
      <h2 className="mt-3 font-display text-4xl leading-none tracking-wide">Ordering made for businesses.</h2>
      <ul className="mt-6 space-y-3">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-white/80">
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {b}
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/70">
        Prefer to order by phone?
        <a href={site.phone.href} className="mt-2 flex items-center gap-2 text-lg font-bold text-white hover:text-primary">
          <Phone className="h-5 w-5 text-primary" /> {site.phone.display}
        </a>
      </div>
    </aside>
  );
}
