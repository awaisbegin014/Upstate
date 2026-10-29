import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Upstate Equipment Co. | Material Handling Equipment — Schenectady, NY",
    template: "%s | Upstate Equipment Co.",
  },
  description:
    "Since 1990, Upstate Equipment Co. has designed, supplied, installed and serviced material handling equipment for Upstate NY businesses: pallet rack, shelving, conveyors, dock equipment, casters, mezzanines and Magliner hand trucks. Shop online or request a quote.",
  openGraph: {
    title: "Upstate Equipment Co. | Material Handling Equipment — Schenectady, NY",
    description:
      "Design, layout, sourcing, installation and service for every piece of equipment that keeps your facility moving. Serving Upstate New York since 1990.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} ${bebas.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {/* Scroll-reveal content must stay visible when JavaScript is off. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
