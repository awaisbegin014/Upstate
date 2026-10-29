import {
  Armchair,
  ArrowRight,
  ArrowUpFromLine,
  Boxes,
  ClipboardList,
  Cylinder,
  Disc3,
  Forklift,
  Hand,
  HardHat,
  Layers,
  LayoutGrid,
  Package,
  PackageCheck,
  PencilRuler,
  Phone,
  Rows3,
  ShieldCheck,
  Truck,
  Warehouse,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/**
 * Icons referenced by key from data (category.icon in the database, site.ts).
 * Add an entry here to make a new key available in the admin panel.
 */
export const ICONS: Record<string, LucideIcon> = {
  "disc-3": Disc3,
  "arrow-right": ArrowRight,
  truck: Truck,
  warehouse: Warehouse,
  cylinder: Cylinder,
  hand: Hand,
  armchair: Armchair,
  "arrow-up-from-line": ArrowUpFromLine,
  forklift: Forklift,
  layers: Layers,
  boxes: Boxes,
  "layout-grid": LayoutGrid,
  "rows-3": Rows3,
  package: Package,
  "clipboard-list": ClipboardList,
  "pencil-ruler": PencilRuler,
  "package-check": PackageCheck,
  "hard-hat": HardHat,
  wrench: Wrench,
  "shield-check": ShieldCheck,
  phone: Phone,
};

export const ICON_KEYS = Object.keys(ICONS);

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = ICONS[name] ?? Package;
  return <C {...props} />;
}
