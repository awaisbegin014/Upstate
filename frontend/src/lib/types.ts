/** Shapes returned by the NestJS API. */

export type Role = "CUSTOMER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  company: string | null;
  role: Role;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  imageUrl: string | null;
  sortOrder: number;
  productCount: number;
  brandCount: number;
}

export interface CategoryDetail extends Omit<Category, "productCount" | "brandCount"> {
  brands: { slug: string; name: string; description: string; website: string | null }[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  website: string | null;
  isFeatured: boolean;
  categories: { slug: string; name: string }[];
  _count: { products: number };
}

export interface ImageRef {
  url: string;
  alt: string;
}

export interface ProductCard {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  priceCents: number;
  compareAtCents: number | null;
  stock: number;
  isQuoteOnly: boolean;
  isFeatured: boolean;
  leadTime: string | null;
  images: ImageRef[];
  category: { slug: string; name: string; icon: string };
  brand: { slug: string; name: string } | null;
}

export interface ProductDetail extends ProductCard {
  description: string;
  weightLbs: number | null;
  images: (ImageRef & { id: string })[];
  specs: { label: string; value: string }[];
  brand: { slug: string; name: string; website: string | null; description: string } | null;
  related: ProductCard[];
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Totals {
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  taxRateBps: number;
}

export type Fulfillment = "SHIPPING" | "PICKUP";

export interface CartLine {
  id: string;
  quantity: number;
  lineTotalCents: number;
  issue: string | null;
  product: {
    id: string;
    slug: string;
    sku: string;
    name: string;
    priceCents: number;
    stock: number;
    isActive: boolean;
    isQuoteOnly: boolean;
    leadTime: string | null;
    image: ImageRef | null;
    category: { slug: string; name: string; icon: string };
    brand: { name: string } | null;
  };
}

export interface Cart {
  id: string | null;
  lines: CartLine[];
  itemCount: number;
  hasIssues: boolean;
  subtotalCents: number;
  totals: Record<Fulfillment, Totals>;
  notice?: string | null;
}

export interface StoreSettings {
  taxRateBps: number;
  flatShippingCents: number;
  freeShippingThresholdCents: number;
  pickupEnabled: boolean;
  paymentMethods: { card: boolean; invoice: boolean };
}

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PLACED"
  | "PROCESSING"
  | "READY_FOR_PICKUP"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  imageUrl: string | null;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
  productId: string | null;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  paymentMethod: "CARD" | "INVOICE";
  paymentStatus: PaymentStatus;
  fulfillment: Fulfillment;
  email: string;
  phone: string;
  contactName: string;
  company: string | null;
  poNumber: string | null;
  notes: string | null;
  adminNote: string | null;
  shipLine1: string | null;
  shipLine2: string | null;
  shipCity: string | null;
  shipState: string | null;
  shipPostalCode: string | null;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  taxRateBps: number;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface Inquiry {
  id: string;
  kind: "QUOTE" | "CONTACT";
  status: "NEW" | "IN_PROGRESS" | "CLOSED";
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  productSlug: string | null;
  productName: string | null;
  createdAt: string;
}
