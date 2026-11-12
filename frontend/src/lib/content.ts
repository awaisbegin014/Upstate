import { aboutPoints, faqs, serviceLines, site } from "./site";

export interface SiteContent {
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

export const defaultSiteContent: SiteContent = {
  phoneDisplay: site.phone.display,
  phoneHref: site.phone.href,
  phoneTagline: "One Direct Number · Local & Long Distance",
  street: site.address.street,
  cityStateZip: `${site.address.city}, ${site.address.state} ${site.address.zip}`,
  fax: site.fax,
  catalogUrl: site.catalogUrl,
  heroEyebrow: "Schenectady, NY · Since 1990",
  heroHeading: "Everything that moves your facility.",
  heroBody:
    "Pallet rack, shelving, conveyors, dock equipment and more — designed, sourced, installed and serviced by Upstate New York's material handling specialists. Now with online ordering for stocked equipment.",
  turnkeyBadge: "Turnkey Engineering vs. Catalog Orders",
  turnkeyHeading:
    "Beyond the Catalog: Complete Layout, Construction & Installation",
  turnkeyBody:
    "Anyone can order a commodity item from a catalog. Our true specialty is where engineering, layout, and heavy installation meet: cutting through building exterior walls, excavating concrete pit floors, and installing complete turnkey dock operations (industrial doors, levelers, seals, and truck restraints) — plus complete warehouse pallet racking layouts engineered for maximum storage and forklift turning clearances.",
  aboutEyebrow: "Who we are",
  aboutHeading: "More than a sales organization.",
  aboutBody:
    "Upstate Equipment Company has been serving the material handling equipment needs of Upstate New York businesses since its founding in June of 1990. We don't just sell equipment — we help you plan your space, choose the right solution, and keep it working for years.",
  aboutPoint1: aboutPoints[0],
  aboutPoint2: aboutPoints[1],
  aboutPoint3: aboutPoints[2],
  serviceRackTitle: serviceLines[0].title,
  serviceRackBody: serviceLines[0].body.join(" "),
  serviceDockTitle: serviceLines[2].title,
  serviceDockBody: serviceLines[2].body.join(" "),
  serviceMezzanineTitle: serviceLines[3].title,
  serviceMezzanineBody: serviceLines[3].body.join(" "),
  serviceHandTruckTitle: serviceLines[4].title,
  serviceHandTruckBody: serviceLines[4].body.join(" "),
  faq1Q: faqs[0].q,
  faq1A: faqs[0].a,
  faq2Q: faqs[1].q,
  faq2A: faqs[1].a,
  faq3Q: faqs[2].q,
  faq3A: faqs[2].a,
};

export function mergeSiteContent(
  value?: Partial<SiteContent> | null,
): SiteContent {
  return { ...defaultSiteContent, ...(value ?? {}) };
}

export function editableFaqs(content: SiteContent) {
  return [
    { q: content.faq1Q, a: content.faq1A },
    { q: content.faq2Q, a: content.faq2A },
    { q: content.faq3Q, a: content.faq3A },
    ...faqs.slice(3),
  ];
}

export function editableServiceLines(content: SiteContent) {
  const overrides: Record<string, { title: string; body: string }> = {
    "pallet-rack": {
      title: content.serviceRackTitle,
      body: content.serviceRackBody,
    },
    dock: { title: content.serviceDockTitle, body: content.serviceDockBody },
    mezzanines: {
      title: content.serviceMezzanineTitle,
      body: content.serviceMezzanineBody,
    },
    "hand-trucks": {
      title: content.serviceHandTruckTitle,
      body: content.serviceHandTruckBody,
    },
  };
  return serviceLines.map((line) => {
    const override = overrides[line.id];
    return override
      ? { ...line, title: override.title, body: [override.body] }
      : line;
  });
}
