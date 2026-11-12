/**
 * Business details and page copy. Facts and wording come from the original
 * upstateeq.com; headlines and section copy follow the redesign.
 */
export const site = {
  name: "Upstate Equipment Co., Inc.",
  shortName: "Upstate Equipment",
  founded: "June 1990",
  description:
    "Material handling equipment — designed, sourced, installed and serviced for Upstate New York businesses since 1990.",
  address: {
    street: "1417 Crane Street",
    city: "Schenectady",
    state: "NY",
    zip: "12303",
  },
  phone: { display: "518.370.7000", href: "tel:+15183707000" },
  fax: "518.370.7002",
  contacts: [
    { name: "Jim Reinhardt", email: "jimr@upstateeq.com" },
    { name: "Tom Newell", email: "tomn@upstateeq.com" },
  ],
  catalogUrl: "http://theonlinecatalog.com/upstateeq",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=1417+Crane+Street+Schenectady+NY+12303",
  mapEmbedUrl:
    "https://www.google.com/maps?q=1417+Crane+Street,+Schenectady,+NY+12303&output=embed",
};

export const mainNav = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/brands", label: "Brands" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: "1990", label: "Family-run since June 1990" },
  { value: "12+", label: "Equipment categories stocked & sourced" },
  { value: "#1", label: "Largest Magliner inventory north of NYC" },
  { value: "200+", label: "Manufacturer partners" },
];

export const aboutPoints = [
  "Serving the material handling needs of Upstate NY businesses since 1990",
  "Much more than a sales organization — we design, layout, source, install and service",
  "From dock equipment and pallet rack to conveyor systems and ergonomics",
];

export const serviceSteps = [
  {
    icon: "clipboard-list",
    title: "Consult & Site Walkthrough",
    body: "We come to you, measure your space and learn how your operation actually runs.",
  },
  {
    icon: "pencil-ruler",
    title: "Design & Layout",
    body: "Storage and flow plans engineered around your products, pallets and people.",
  },
  {
    icon: "package-check",
    title: "Sourcing & Procurement",
    body: "The right equipment at the right price from 200+ trusted manufacturers.",
  },
  {
    icon: "hard-hat",
    title: "Installation",
    body: "Professional installation of racking, mezzanines, conveyors and dock equipment.",
  },
  {
    icon: "wrench",
    title: "Service & Parts",
    body: "Repairs, replacements and advice long after the invoice is paid.",
  },
] as const;

export const howItWorks = [
  {
    title: "Call or site visit",
    body: "Tell us what's slowing you down. We'll walk your floor or work from your drawings.",
  },
  {
    title: "Design & quote",
    body: "You get a layout and a clear, itemized proposal — no surprises.",
  },
  {
    title: "Delivery & install",
    body: "We deliver, assemble and install on a schedule that fits your operation.",
  },
  {
    title: "Service after the sale",
    body: "Parts, repairs and expansions handled by the same team that sold it.",
  },
];

export const whyUpstate = [
  {
    icon: "shield-check",
    title: "Local since 1990",
    body: "Family-run, Upstate NY based, and accountable to the businesses we serve.",
  },
  {
    icon: "hard-hat",
    title: "Turnkey installs",
    body: "Design through bolt-down — one call handles the whole project.",
  },
  {
    icon: "package-check",
    title: "Stock on hand",
    body: "Pallet jacks, casters and Magliner hand trucks ready for same-day shipment.",
  },
  {
    icon: "phone",
    title: "Real people answer",
    body: "Call and you'll talk to someone who knows warehouses, not a call center.",
  },
] as const;

export const serviceAreas = [
  "Capital Region",
  "Albany",
  "Schenectady",
  "Troy",
  "Saratoga Springs",
  "Glens Falls",
  "Utica",
  "Syracuse",
  "Binghamton",
  "Kingston",
  "Hudson Valley",
  "North Country",
];

export const faqs = [
  {
    q: "Do you install what you sell?",
    a: "Yes. We design, lay out, source, install and service everything we quote — pallet rack, shelving, conveyor systems, dock equipment and engineered mezzanines.",
  },
  {
    q: "I need to unload trucks but I don't have a dock.",
    a: "We specialize in that. Hydraulic dock lifts, yard ramps, portable dock plates and custom dock design can get you loading and unloading without construction.",
  },
  {
    q: "How fast can I get a hand truck?",
    a: "We carry the largest Magliner hand truck and parts inventory north of New York City. In most cases we assemble and ship your hand truck the same day — call 518.370.7000.",
  },
  {
    q: "Can you help me add floor space without moving?",
    a: "Custom engineered mezzanines can double your usable square footage at a cost per square foot far below new construction — often using ceiling space you already have.",
  },
  {
    q: "Where do you deliver and install?",
    a: "Throughout Upstate New York — the Capital Region and beyond — plus nearby western New England. If you're close enough to call us, we'll get there.",
  },
  {
    q: "Can I buy online and pay by invoice?",
    a: "Yes. Stocked items can be ordered online with a credit card (when enabled) or on invoice — add your PO number at checkout. Engineered items such as mezzanines, dock levelers and conveyor systems are quoted per job.",
  },
];

/** From the original site's description of what Upstate distributes and installs. */
export const equipmentWeSupply = [
  "Hand trucks",
  "Pallet jacks",
  "Cargo restraints",
  "Lift tables",
  "Shelving",
  "Pallet rack",
  "Lockers",
  "Cabinets",
  "Carts",
  "Work tables",
  "Conveyors",
  "Dock equipment",
  "Industrial doors",
  "Mezzanines",
  "Storage systems",
  "Ergonomic equipment",
];

/** Company milestones drawn from upstateeq.com. */
export const milestones = [
  {
    label: "June 1990",
    title: "Founded in Schenectady",
    body: "Upstate Equipment Company opens on Crane Street to serve the material handling needs of Upstate New York businesses.",
  },
  {
    label: "Magliner",
    title: "Hand truck specialists",
    body: "We build the largest inventory of Magliner hand trucks and parts north of New York City — with same-day assembly and delivery.",
  },
  {
    label: "Catalog",
    title: "An online catalog",
    body: "We add an online product catalog so customers can browse equipment from the manufacturers we represent.",
  },
  {
    label: "Today",
    title: "Order online",
    body: "Stocked equipment can be ordered online, while engineered systems are still designed, quoted and installed by our team.",
  },
];

/** What happens after someone sends the contact / quote form. */
export const nextSteps = [
  {
    title: "We read every request",
    body: "Your message goes straight to our sales team — not a call center or a chatbot.",
  },
  {
    title: "We call or visit",
    body: "For bigger projects we'll walk your floor, measure and talk through how your operation runs.",
  },
  {
    title: "You get a clear quote",
    body: "A layout where it helps, and an itemized proposal with lead times and installation.",
  },
];

/** Service lines from the original Services page, with the suppliers named there. */
export const serviceLines = [
  {
    id: "pallet-rack",
    title: "Pallet Rack, Shelving & Storage Systems",
    image: "/images/hero-warehouse.jpg",
    body: [
      "We can provide, and install, all types of pallet storage racks, including standard pallet racks, pushback racks, flow racks and bulk storage racks. We can also reconfigure your existing pallet rack system to better meet your needs.",
      "Our experienced sales representatives will be happy to work with you to design your pallet storage area, and we will be happy to make on-site calls to assist you in measuring, layout and design of your custom storage system.",
    ],
    suppliers: [
      ["Ridg-U-Rak", "Pallet rack and bulk storage rack"],
      ["Wireway/Husky", "Pallet rack and wire partitions"],
      ["W. C. Cardinal Company", "Pallet rack and wire partitions"],
      ["Konstant", "Pallet rack, cantilever rack and mezzanines"],
      ["Penco Products", "Pallet rack, shelving, lockers, cabinets"],
    ],
    category: "racks",
  },
  {
    id: "lift-tables",
    title: "In-Plant Lift Tables & Ergonomics",
    image: "/images/mezzanine.jpg",
    body: [
      "Ergonomics in production and warehousing: lift tables, turntables and pallet positioners bring the work to the worker and cut the bending and reaching that lead to injuries.",
    ],
    suppliers: [["Southworth", "Lift tables, turntables, pallet positioners"]],
    category: "lifting-equipment",
  },
  {
    id: "dock",
    title: "Dock Lifts, Dock Levelers & Dock Seals",
    image: "/images/loading-dock.jpg",
    body: [
      "Need to unload trucks but don't have a dock? Need to keep heat in or cold out — or heat out and cold in?",
      "We can help design a new dock or modify your existing dock to meet your needs.",
    ],
    suppliers: [
      ["Advance Lift", "Hydraulic dock lifts"],
      ["McGuire", "Dock levelers, truck restraints and dock seals"],
      ["Fairborn", "Dock seals and shelters"],
    ],
    category: "dock-equipment",
  },
  {
    id: "mezzanines",
    title: "Mezzanines",
    image: "/images/mezzanine.jpg",
    body: [
      "Do you need additional floor space? Do you have a high-ceiling area that is underutilized?",
      "We sell and install custom engineered mezzanines that can increase your floor space at a cost per square foot that is much less than new construction.",
    ],
    suppliers: [
      ["Cubic Design", "Mezzanines and industrial guards"],
      ["Cogan", "Mezzanines and wire partitioning"],
    ],
    category: "lifting-equipment",
  },
  {
    id: "hand-trucks",
    title: "Hand Trucks",
    image: "/images/hand-trucks.jpg",
    body: [
      "We have the largest inventory of MAGLINER brand hand trucks and hand truck parts north of New York City.",
      "Call us with your needs at 518.370.7000. Chances are we can assemble and ship your hand truck the same day.",
    ],
    suppliers: [["Magline", "Hand trucks, platform trucks, truck ramps and delivery equipment"]],
    category: "hand-equipment",
  },
  {
    id: "pallet-jacks",
    title: "Pallet Jacks",
    image: "/images/hero-warehouse.jpg",
    body: ["We stock Lift-Rite and BT pallet jacks for immediate shipment."],
    suppliers: [
      ["LiftRite", "Pallet jacks, lifters and stackers"],
      ["BT", "Pallet jacks and stackers"],
    ],
    category: "hand-equipment",
  },
] as const;

export const supplierUrls: Record<string, string> = {
  "Advance Lift": "https://www.advancelifts.com",
  "Advance Lifts": "https://www.advancelifts.com",
  McGuire: "https://www.wbmcguire.com",
  Fairborn: "https://www.fairbornusa.com",
  Magline: "https://www.magliner.com",
  "Ridg-U-Rak": "https://www.ridgurak.com",
  "Wireway/Husky": "https://www.wirewayhusky.com",
  "W. C. Cardinal Company": "https://www.wccardinal.com",
  Konstant: "https://www.konstant.com",
  "Penco Products": "https://www.pencoproducts.com",
  Southworth: "https://www.southworthproducts.com",
  Cogan: "https://www.cogan.com",
  "Cubic Design": "https://www.cubicdesign.com",
  LiftRite: "https://www.liftrite.com",
  BT: "https://www.toyota-forklifts.eu",
};

/** Jobsite photos from the original Photos page (thumbnails — originals are no longer online). */
export const projects = [
  {
    title: "Dock lift where there was no dock",
    body: "Our customer did not have a dock but needed to unload drums of solvent from a tractor trailer. They were having to unload at a different location and transport the drums in a pickup truck. We formed and poured the pad on Friday and installed this Advance dock lift the following Monday morning.",
    tags: ["Dock equipment", "Installation"],
    photos: ["stiefel-dock-lift-2", "stiefel-dock-lift-1", "stiefel-dock-lift-3"],
  },
  {
    title: "Hydraulic lift replaces a 50-year-old mechanical lift",
    body: "Removed a 50 year old mechanical lift, formed a new pit within the old pit and installed a new hydraulic lift.",
    tags: ["Dock equipment"],
    photos: ["leader-herald-dock-lift-2", "leader-herald-dock-lift"],
  },
  {
    title: "Custom knee-wall ladder",
    body: "Custom knee-wall ladder — 6 steps on one side, 3 steps on the other — with rubber-cushioned foot pads.",
    tags: ["Ladders", "Custom fabrication"],
    photos: ["stiefel-roof-ladder-2", "stiefel-roof-ladder-1"],
  },
  {
    title: "Complete picking & packing system",
    body: "Ridg-U-Rak 2-deep pushback storage above, pallet flow to the pick aisle below, 4 bays of Unex SpanTrack carton flow to the pick aisle, ACSI conveyor to the packing station, Sinco rack guard on the picking side of the rack and a Garlin conveyor crossover.",
    tags: ["Racks", "Conveyors", "Design & layout"],
    photos: ["stiefel-pick-line-3", "stiefel-pick-line-4", "stiefel-pick-line-1", "stiefel-pick-line-2"],
  },
  {
    title: "Fairborn dock seals",
    body: "Fairborn dock seals installed to keep conditioned air in at the dock doors.",
    tags: ["Dock equipment"],
    photos: ["hannay-dock-seals2", "hannay-dock-seals1"],
  },
  {
    title: "McGuire common-side dock shelters",
    body: "McGuire common-side dock shelters — before and after.",
    tags: ["Dock equipment"],
    photos: ["unifirst-before1", "unifirst-after-1"],
  },
  {
    title: "36' high drive-in rack",
    body: "36 ft high drive-in rack for storage of plastic shipping containers.",
    tags: ["Racks"],
    photos: ["taconic-drive-in-2", "taconic-drive-in-1", "taconic-drive-in-3"],
  },
  {
    title: "Wedge-shaped mezzanine",
    body: "Custom wedge-shaped mezzanine by Cubic Design — before and after.",
    tags: ["Mezzanines"],
    photos: ["ticonderoga-mezzanine-1", "ticonderoga-mezzanine-after"],
  },
  {
    title: "Custom walkway at Fort Ticonderoga",
    body: "Custom fabricated walkway, Fort Ticonderoga, NY — before and after.",
    tags: ["Custom fabrication"],
    photos: ["ticonderoga-walkway-3", "ticonderoga-walkway-1", "ticonderoga-walkway-2"],
  },
  {
    title: "High-speed door at a concrete plant",
    body: "High-speed roll-up door installed at a concrete plant.",
    tags: ["Doors"],
    photos: ["lafarge-hi-speed-door1"],
  },
  {
    title: "In-plant office buildings",
    body: "Modular in-plant offices that add private space inside the warehouse.",
    tags: ["In-plant offices"],
    photos: ["fgi-inplant1", "kb-toys-1"],
  },
  {
    title: "Chemical storage drive-in rack",
    body: "Drive-in rack for chemical storage.",
    tags: ["Racks"],
    photos: ["surpass-chemical-3", "surpass-chemical-1", "surpass-chemical-2"],
  },
  {
    title: "Selective, structural & pushback rack",
    body: "Selective rack with wire decks, structural rack outside, and 3-deep pushback back-to-back for 6 deep total.",
    tags: ["Racks"],
    photos: ["nexans-newburgh-3", "nexans-newburgh-1", "nexans-newburgh-2", "nexans-outside-rack-1", "stiefel-pushback"],
  },
  {
    title: "Custom walkways and catwalks",
    body: "Custom fabricated walkways and catwalks for electrical and boiler rooms.",
    tags: ["Custom fabrication"],
    photos: [
      "stiefel-labs-electric-room-walkway1",
      "stiefel-labs-boiler-walkway2",
      "stiefel-labs-boiler-walkway1",
    ],
  },
  {
    title: "Custom ball transfer cart",
    body: "Custom engineered and fabricated ball transfer cart designed for multi-directional material positioning and heavy parts transfer.",
    tags: ["Carts", "Custom fabrication"],
    photos: ["custom-ball-transfer-cart"],
  },
  {
    title: "Wire partitions & security enclosures",
    body: "Wireway/Husky wire partition cage installed for secure inventory containment, tool crib security and driver access control.",
    tags: ["Wire partitions", "Security"],
    photos: ["stiefel-wire-partitions"],
  },
  {
    title: "Custom aluminum handrail & safety access",
    body: "Custom aluminum handrail installation and OSHA-compliant warehouse mezzanine access ladder.",
    tags: ["Custom fabrication", "Ladders"],
    photos: ["stiefel-custom-aluminum-handrail", "target-ladder"],
  },
];
