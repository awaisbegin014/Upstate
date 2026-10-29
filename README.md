# Upstate Equipment Co. — Online Store

Full-stack e-commerce site for **Upstate Equipment Co., Inc.** (material handling equipment, 1417 Crane Street, Schenectady, NY). Customers can browse 12 equipment categories, add stocked items to a cart, check out (card via Stripe or pay on invoice), and request quotes for engineered items. Staff manage everything from an admin panel.

- **Content** comes from the original site, [upstateeq.com](https://www.upstateeq.com): services copy, contact details, the 12 product categories, the ~225-supplier directory (old "Links" page) and jobsite photos (old "Photos" page).
- **Design** follows the redesign at [upstate-iron-showcase.lovable.app](https://upstate-iron-showcase.lovable.app/): Bebas Neue + Barlow, safety-yellow on steel blues, scroll reveals and the brand marquee.

```
frontend/   Next.js 16 (App Router, React 19, Tailwind CSS v4, TanStack Query)
backend/    NestJS 12 REST API (Prisma 7, SQLite for dev, JWT cookie auth, Stripe)
```

## Quick start

Requirements: Node.js 20+ (built with Node 24).

```bash
# 1. API — http://localhost:3001/api
cd backend
npm install                  # also generates the Prisma client
cp .env.example .env         # then set JWT_SECRET and ADMIN_PASSWORD
npx prisma migrate deploy    # creates dev.db
npm run db:seed              # categories, suppliers, admin user, starter products
npm run start:dev

# 2. Storefront — http://localhost:3000
cd ../frontend
npm install
cp .env.example .env.local   # API_URL=http://localhost:3001
npm run dev
```

Sign in at `/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env` to reach the admin panel at `/admin`.

The browser only talks to the Next.js server: `/api/*` and `/uploads/*` are rewritten to the NestJS API, so the session and cart cookies are first-party.

## Features

**Storefront**
- Home page with the redesign's sections: hero, stats, categories, featured products, services, Magliner / mezzanine / dock features, brand marquee, how it works, service area, FAQ and contact.
- `/shop` and `/shop/[category]` with search, sorting, an in-stock filter, pagination, and each category's supplier list.
- `/products/[slug]` with gallery, specs, stock and lead time, add to cart, and related items. Quote-only items (mezzanines, dock levelers, conveyor systems) show a quote form instead of a price.
- Server-side cart: guests get an httpOnly cookie, and the guest cart merges into the account on sign-in.
- Checkout for signed-in customers:
  - Shipping (flat rate, free over a threshold) or free local pickup.
  - NY sales tax on goods plus shipping.
  - PO number, delivery notes, card (Stripe) or pay on invoice.
- Stock is reserved atomically at checkout. Abandoned card payments release stock and put the items back in the cart.
- Account area: order history, order details, profile and password.
- Content pages: Services, About, Projects, Brands directory (searchable and filterable) and Contact (quote form and map).

**Admin (`/admin`)**
- Dashboard: open orders, 30-day paid revenue, new inquiries, low stock, recent orders.
- Orders: filter, search, change status and payment status, internal notes. Cancelling an order restocks it.
- Products: create and edit with image upload (JPG/PNG/WebP/GIF, checked by file signature), specs, pricing, stock, and active / featured / quote-only flags.
- Categories, Brands (supplier directory), Customers (deactivate or promote to admin), Inquiries (quote and contact requests).
- Settings: tax rate, flat shipping, free-shipping threshold, pickup and invoice toggles, Stripe status.

## Payments (Stripe)

Card checkout is off until keys are set. Without them, customers see **Pay on invoice** only.

1. Put `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in `backend/.env`, and set `STORE_URL` to the public storefront URL.
2. Add a webhook endpoint at `https://<store>/api/payments/stripe/webhook` for `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.expired`.
3. Local testing: `stripe listen --forward-to localhost:3000/api/payments/stripe/webhook`.

The success page also asks Stripe directly, so orders confirm even before the webhook arrives. Refunds are issued from the Stripe dashboard; then mark the order *Refunded* in the admin panel.

## Production notes

- **Database:** dev uses SQLite (`backend/dev.db`). For production, switch to Postgres (e.g. Supabase or Neon):
  1. Set `provider = "postgresql"` in `prisma/schema.prisma`.
  2. Swap `@prisma/adapter-better-sqlite3` for `@prisma/adapter-pg` in `src/prisma/prisma.service.ts` and `prisma/seed.ts`.
  3. Regenerate the migrations.
  4. Add `mode: 'insensitive'` to the search filters noted in `catalog.service.ts`.
- **Uploads** are stored on local disk in `backend/uploads/`. Use a persistent volume, or move them to S3 or Cloudinary, on hosts with ephemeral disks.
- Set `NODE_ENV=production` so auth cookies are `Secure`, set `FRONTEND_URL` and `STORE_URL`, and use a long random `JWT_SECRET`.

## Before going live

- [ ] **Replace the starter catalog.** The 51 seeded products (`backend/prisma/data/products.ts`) use real supplier brands, but their **names, specs, prices and stock are placeholders**. Edit them in Admin → Products and upload real photos. Until a product has a photo, the store shows a branded placeholder.
- [ ] Confirm the tax rate, shipping fee and free-shipping threshold in Admin → Settings (defaults: 8%, $49, free over $1,000).
- [ ] Add Stripe keys if card payments are wanted.
- [ ] Add terms of sale, a returns policy and a privacy policy.
- [ ] Get larger jobsite photos. Only 200 px thumbnails survive on the old site; `frontend/public/projects/`.
- [ ] Optional: order and quote email notifications (not built yet; new orders and inquiries appear in the admin panel).

## Useful scripts

| Where | Command | What it does |
|---|---|---|
| backend | `npm run start:dev` | API with watch mode |
| backend | `npm run build && npm run start:prod` | Production build and start |
| backend | `npm run db:migrate` | Create or apply a migration after editing the schema |
| backend | `npm run db:seed` | Re-run the seed (updates categories, brands and admin; never overwrites existing products) |
| backend | `npm run db:studio` | Browse the database in Prisma Studio |
| backend | `npm test` | Unit tests |
| frontend | `npm run dev` / `npm run build` / `npm start` | Next.js dev, build, serve |
| frontend | `npm run lint` | ESLint |
