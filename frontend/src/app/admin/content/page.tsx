"use client";

import { Check, Copy, Download, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, PageHeader } from "@/components/admin/ui";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { aboutPoints, faqs, serviceLines, site } from "@/lib/site";

const STORAGE_KEY = "upstate_site_content_draft_v1";

interface ContentState {
  phoneDisplay: string;
  phoneHref: string;
  phoneTagline: string;
  street: string;
  cityStateZip: string;
  fax: string;
  catalogUrl: string;

  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;

  turnkeyBadge: string;
  turnkeyHeading: string;
  turnkeyBody: string;

  aboutEyebrow: string;
  aboutHeading: string;
  aboutBody: string;
  aboutPoint1: string;
  aboutPoint2: string;
  aboutPoint3: string;

  serviceRackTitle: string;
  serviceRackBody: string;
  serviceDockTitle: string;
  serviceDockBody: string;
  serviceMezzanineTitle: string;
  serviceMezzanineBody: string;
  serviceHandTruckTitle: string;
  serviceHandTruckBody: string;

  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
}

const DEFAULT_STATE: ContentState = {
  phoneDisplay: site.phone.display,
  phoneHref: site.phone.href,
  phoneTagline: "Local & Long Distance (No 800 Needed)",
  street: site.address.street,
  cityStateZip: `${site.address.city}, ${site.address.state} ${site.address.zip}`,
  fax: site.fax,
  catalogUrl: site.catalogUrl,

  heroEyebrow: "Schenectady, NY · Since 1990",
  heroHeading: "Everything that moves your facility.",
  heroBody:
    "Pallet rack, shelving, conveyors, dock equipment and more — designed, sourced, installed and serviced by Upstate New York's material handling specialists. Now with online ordering for stocked equipment.",

  turnkeyBadge: "Turnkey Engineering vs. Catalog Orders",
  turnkeyHeading: "Beyond the Catalog: Complete Layout, Construction & Installation",
  turnkeyBody:
    "Anyone can order a commodity item from a catalog. Our true specialty is where engineering, layout, and heavy installation meet: cutting through building exterior walls, excavating concrete pit floors, and installing complete turnkey dock operations (industrial doors, levelers, seals, and truck restraints) — plus complete warehouse pallet racking layouts engineered for maximum storage and forklift turning clearances.",

  aboutEyebrow: "Who we are",
  aboutHeading: "More than a sales organization.",
  aboutBody:
    "Upstate Equipment Company has been serving the material handling equipment needs of Upstate New York businesses since its founding in June of 1990. We don't just sell equipment — we help you plan your space, choose the right solution, and keep it working for years.",
  aboutPoint1: aboutPoints[0] || "Serving the material handling needs of Upstate NY businesses since 1990",
  aboutPoint2: aboutPoints[1] || "Much more than a sales organization — we design, layout, source, install and service",
  aboutPoint3: aboutPoints[2] || "From dock equipment and pallet rack to conveyor systems and ergonomics",

  serviceRackTitle: serviceLines[0]?.title || "Pallet Rack, Shelving & Storage Systems",
  serviceRackBody:
    serviceLines[0]?.body.join(" ") ||
    "We can provide, and install, all types of pallet storage racks, including standard pallet racks, pushback racks, flow racks and bulk storage racks.",
  serviceDockTitle: serviceLines[2]?.title || "Dock Lifts, Dock Levelers & Dock Seals",
  serviceDockBody:
    serviceLines[2]?.body.join(" ") ||
    "Need to unload trucks but don't have a dock? We can help design a new dock or modify your existing dock to meet your needs.",
  serviceMezzanineTitle: serviceLines[3]?.title || "Mezzanines",
  serviceMezzanineBody:
    serviceLines[3]?.body.join(" ") ||
    "We sell and install custom engineered mezzanines that can increase your floor space at a cost per square foot that is much less than new construction.",
  serviceHandTruckTitle: serviceLines[4]?.title || "Hand Trucks",
  serviceHandTruckBody:
    serviceLines[4]?.body.join(" ") ||
    "We have the largest inventory of MAGLINER brand hand trucks and hand truck parts north of New York City.",

  faq1Q: faqs[0]?.q || "Do you install what you sell?",
  faq1A:
    faqs[0]?.a ||
    "Yes. We design, lay out, source, install and service everything we quote — pallet rack, shelving, conveyor systems, dock equipment and engineered mezzanines.",
  faq2Q: faqs[1]?.q || "I need to unload trucks but I don't have a dock.",
  faq2A:
    faqs[1]?.a ||
    "We specialize in that. Hydraulic dock lifts, yard ramps, portable dock plates and custom dock design can get you loading and unloading without construction.",
  faq3Q: faqs[2]?.q || "How fast can I get a hand truck?",
  faq3A:
    faqs[2]?.a ||
    "We carry the largest Magliner hand truck and parts inventory north of New York City. In most cases we assemble and ship your hand truck the same day — call 518.370.7000.",
};

export default function AdminContentPage() {
  const [form, setForm] = useState<ContentState>(DEFAULT_STATE);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setForm((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (key: keyof ContentState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      toast.success("Site verbiage saved to your browser session");
    } catch {
      toast.error("Failed to save changes locally");
    }
  };

  const handleCopy = () => {
    const summary = `
=== UPSTATE EQUIPMENT SITE VERBIAGE UPDATES ===

[CONTACT & HEADER]
Phone: ${form.phoneDisplay} (${form.phoneHref})
Tagline: ${form.phoneTagline}
Address: ${form.street}, ${form.cityStateZip}
Fax: ${form.fax}
Catalog URL: ${form.catalogUrl}

[HOMEPAGE HERO]
Eyebrow: ${form.heroEyebrow}
Heading: ${form.heroHeading}
Body: ${form.heroBody}

[TURNKEY ENGINEERING VS CATALOG BANNER]
Badge: ${form.turnkeyBadge}
Title: ${form.turnkeyHeading}
Text: ${form.turnkeyBody}

[ABOUT SECTION]
Eyebrow: ${form.aboutEyebrow}
Headline: ${form.aboutHeading}
Story: ${form.aboutBody}
Points:
1. ${form.aboutPoint1}
2. ${form.aboutPoint2}
3. ${form.aboutPoint3}

[SERVICES & PRODUCTS]
- ${form.serviceRackTitle}: ${form.serviceRackBody}
- ${form.serviceDockTitle}: ${form.serviceDockBody}
- ${form.serviceMezzanineTitle}: ${form.serviceMezzanineBody}
- ${form.serviceHandTruckTitle}: ${form.serviceHandTruckBody}

[KEY FAQS]
Q: ${form.faq1Q}
A: ${form.faq1A}

Q: ${form.faq2Q}
A: ${form.faq2A}

Q: ${form.faq3Q}
A: ${form.faq3A}
`.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Copied email-ready verbiage summary to clipboard");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(form, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `upstate-site-verbiage-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast.success("Downloaded verbiage backup file");
  };

  const handleReset = () => {
    if (confirm("Reset all verbiage back to initial site defaults?")) {
      setForm(DEFAULT_STATE);
      localStorage.removeItem(STORAGE_KEY);
      toast.info("Reset to default verbiage");
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        title="Site Content & Verbiage"
        description="Review and edit website copy, headings, value propositions, and contact details without code."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} title="Reset to original text">
              <RefreshCw className="h-4 w-4" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} title="Download JSON file">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} title="Copy email-ready text">
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy for Email"}
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" /> Save Verbiage
            </Button>
          </div>
        }
      />

      <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm text-foreground">
        <p className="font-semibold text-primary">
          Need to revise any text on the website?
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          You can edit any sentence or headline directly in the fields below. Click <strong>Save Verbiage</strong> to keep your drafts, or click <strong>Copy for Email</strong> to send your exact revisions to the development team with one click.
        </p>
      </div>

      {/* 1. Header & Contact Details */}
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">1. Header &amp; Contact Details</h2>
          <p className="text-xs text-muted-foreground">
            Enforces your direct phone number, Schenectady address, and eliminates old 800 numbers.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Phone Display (Direct)">
            <Input
              value={form.phoneDisplay}
              onChange={(e) => handleChange("phoneDisplay", e.target.value)}
            />
          </Field>
          <Field label="Phone Dial Link">
            <Input
              value={form.phoneHref}
              onChange={(e) => handleChange("phoneHref", e.target.value)}
            />
          </Field>
          <Field label="Phone Tagline Notice">
            <Input
              value={form.phoneTagline}
              onChange={(e) => handleChange("phoneTagline", e.target.value)}
            />
          </Field>
          <Field label="Street Address">
            <Input
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
            />
          </Field>
          <Field label="City, State, ZIP">
            <Input
              value={form.cityStateZip}
              onChange={(e) => handleChange("cityStateZip", e.target.value)}
            />
          </Field>
          <Field label="Fax Number">
            <Input
              value={form.fax}
              onChange={(e) => handleChange("fax", e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* 2. Homepage Hero & Slogan */}
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">2. Homepage Hero Section</h2>
          <p className="text-xs text-muted-foreground">
            The first statement customers see above the fold.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hero Eyebrow Tag">
            <Input
              value={form.heroEyebrow}
              onChange={(e) => handleChange("heroEyebrow", e.target.value)}
            />
          </Field>
          <Field label="Hero Display Heading">
            <Input
              value={form.heroHeading}
              onChange={(e) => handleChange("heroHeading", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Hero Introduction Paragraph">
              <Textarea
                rows={3}
                value={form.heroBody}
                onChange={(e) => handleChange("heroBody", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* 3. Turnkey Engineering vs Catalog Orders */}
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">3. Turnkey Engineering vs. Catalog Orders</h2>
          <p className="text-xs text-muted-foreground">
            Highlights Upstate&apos;s $60,000+ construction capabilities (dock cutting, pit excavation, CAD rack layout).
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Section Pill Badge">
            <Input
              value={form.turnkeyBadge}
              onChange={(e) => handleChange("turnkeyBadge", e.target.value)}
            />
          </Field>
          <Field label="Section Title">
            <Input
              value={form.turnkeyHeading}
              onChange={(e) => handleChange("turnkeyHeading", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Engineering Value Proposition Paragraph">
              <Textarea
                rows={4}
                value={form.turnkeyBody}
                onChange={(e) => handleChange("turnkeyBody", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* 4. About Us Copy */}
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">4. About Us &amp; Company Credentials</h2>
          <p className="text-xs text-muted-foreground">
            Our company story, 1990 founding, and core mission.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              value={form.aboutEyebrow}
              onChange={(e) => handleChange("aboutEyebrow", e.target.value)}
            />
          </Field>
          <Field label="Headline">
            <Input
              value={form.aboutHeading}
              onChange={(e) => handleChange("aboutHeading", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Company Story Narrative">
              <Textarea
                rows={3}
                value={form.aboutBody}
                onChange={(e) => handleChange("aboutBody", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Highlight Point 1">
            <Input
              value={form.aboutPoint1}
              onChange={(e) => handleChange("aboutPoint1", e.target.value)}
            />
          </Field>
          <Field label="Highlight Point 2">
            <Input
              value={form.aboutPoint2}
              onChange={(e) => handleChange("aboutPoint2", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Highlight Point 3">
              <Input
                value={form.aboutPoint3}
                onChange={(e) => handleChange("aboutPoint3", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* 5. Key Service Lines */}
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">5. Core Service Offerings</h2>
          <p className="text-xs text-muted-foreground">
            Descriptions for pallet racking, dock equipment, mezzanines, and Magliner hand trucks.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Pallet Rack Title">
              <Input
                value={form.serviceRackTitle}
                onChange={(e) => handleChange("serviceRackTitle", e.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Pallet Rack Description">
                <Textarea
                  rows={2}
                  value={form.serviceRackBody}
                  onChange={(e) => handleChange("serviceRackBody", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 border-t pt-4">
            <Field label="Dock Equipment Title">
              <Input
                value={form.serviceDockTitle}
                onChange={(e) => handleChange("serviceDockTitle", e.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Dock Equipment Description">
                <Textarea
                  rows={2}
                  value={form.serviceDockBody}
                  onChange={(e) => handleChange("serviceDockBody", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 border-t pt-4">
            <Field label="Mezzanines Title">
              <Input
                value={form.serviceMezzanineTitle}
                onChange={(e) => handleChange("serviceMezzanineTitle", e.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Mezzanines Description">
                <Textarea
                  rows={2}
                  value={form.serviceMezzanineBody}
                  onChange={(e) => handleChange("serviceMezzanineBody", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 border-t pt-4">
            <Field label="Hand Trucks Title">
              <Input
                value={form.serviceHandTruckTitle}
                onChange={(e) => handleChange("serviceHandTruckTitle", e.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Hand Trucks & Magliner Description">
                <Textarea
                  rows={2}
                  value={form.serviceHandTruckBody}
                  onChange={(e) => handleChange("serviceHandTruckBody", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </div>
      </Card>

      {/* 6. Frequently Asked Questions */}
      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">6. Frequently Asked Questions (FAQs)</h2>
          <p className="text-xs text-muted-foreground">
            Clear answers explaining site visits, custom dock design, and same-day delivery.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Field label="Question 1">
              <Input
                value={form.faq1Q}
                onChange={(e) => handleChange("faq1Q", e.target.value)}
              />
            </Field>
            <Field label="Answer 1">
              <Textarea
                rows={2}
                value={form.faq1A}
                onChange={(e) => handleChange("faq1A", e.target.value)}
              />
            </Field>
          </div>

          <div className="space-y-2 border-t pt-4">
            <Field label="Question 2">
              <Input
                value={form.faq2Q}
                onChange={(e) => handleChange("faq2Q", e.target.value)}
              />
            </Field>
            <Field label="Answer 2">
              <Textarea
                rows={2}
                value={form.faq2A}
                onChange={(e) => handleChange("faq2A", e.target.value)}
              />
            </Field>
          </div>

          <div className="space-y-2 border-t pt-4">
            <Field label="Question 3">
              <Input
                value={form.faq3Q}
                onChange={(e) => handleChange("faq3Q", e.target.value)}
              />
            </Field>
            <Field label="Answer 3">
              <Textarea
                rows={2}
                value={form.faq3A}
                onChange={(e) => handleChange("faq3A", e.target.value)}
              />
            </Field>
          </div>
        </div>
      </Card>
    </div>
  );
}
