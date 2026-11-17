-- Client revisions (November 2026): supplier directory clean-up and freight policy.
--
-- Data-only changes so an existing database matches `prisma/data/*` without a
-- re-seed (the seed never overwrites products that already exist). Every
-- statement is a no-op on a fresh database, where the seed creates the same state.

-- ---------------------------------------------------------------- shipping
-- The $49 flat rate / free-over-$1,000 offer is withdrawn: freight is quoted
-- per order. A flat rate of 0 now means "quoted separately" at checkout. Only
-- the untouched old defaults are reset, so a rate set in Admin → Settings stays.
ALTER TABLE "StoreSettings"
  ALTER COLUMN "flatShippingCents" SET DEFAULT 0,
  ALTER COLUMN "freeShippingThresholdCents" SET DEFAULT 0;

UPDATE "StoreSettings"
SET "flatShippingCents" = 0,
    "freeShippingThresholdCents" = 0,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "flatShippingCents" = 4900
  AND "freeShippingThresholdCents" = 100000;

-- ---------------------------------------------------------------- products
-- Pushback & drive-in systems move from W. C. Cardinal (out of business) to Ridg-U-Rak.
UPDATE "Product"
SET "brandId" = (SELECT "id" FROM "Brand" WHERE "slug" = 'ridg-u-rak'),
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "sku" = 'PUSHBACK-SYS'
  AND "brandId" IN (SELECT "id" FROM "Brand" WHERE "slug" = 'w-c-cardinal-co');

-- Valley Craft is no longer represented. Order history keeps its line items
-- (OrderItem.productId is SET NULL); open carts drop the item (CASCADE).
DELETE FROM "Product" WHERE "sku" = 'VC-DRUMLIFT';

UPDATE "ProductSpec"
SET "value" = 'Cogan, Specialized Storage Solutions'
WHERE "value" = 'Cogan, Cubic Design';

-- The Magline loop-handle hand truck photo shows pneumatic wheels.
UPDATE "ProductSpec"
SET "value" = '10" pneumatic'
WHERE "label" = 'Wheels'
  AND "value" = '10" balloon cushion'
  AND "productId" IN (SELECT "id" FROM "Product" WHERE "sku" = 'MAG-2W-500');

-- ------------------------------------------------------------------ brands
-- Out of business, dead links, or no longer represented.
DELETE FROM "Brand"
WHERE "slug" IN (
  'w-c-cardinal-co',
  'beech-engineering-and-mfg',
  'fairbanks-casters',
  'fairbanks-company',
  'h-wilson-company',
  'interthor',
  'pramac-industries',
  'rehrig-international',
  'valley-craft-inc'
);

-- Cubic Designs now operates as Specialized Storage Solutions.
UPDATE "Brand"
SET "name" = 'Specialized Storage Solutions',
    "slug" = 'specialized-storage-solutions',
    "description" = 'Storage Mezzanines (formerly Cubic Designs)',
    "website" = 'https://www.specializedstorage.com/solutions/mezzanines/storage-mezzanines',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'cubic-design'
  AND NOT EXISTS (SELECT 1 FROM "Brand" WHERE "slug" = 'specialized-storage-solutions');

-- Corrected supplier websites.
UPDATE "Brand" SET "website" = 'https://toyota-forklifts.rs/guides/hand-pallet-truck-guide/', "updatedAt" = CURRENT_TIMESTAMP WHERE "slug" = 'b-t';
UPDATE "Brand" SET "website" = 'https://www.gksweb.com/', "updatedAt" = CURRENT_TIMESTAMP WHERE "slug" = 'hillman-rollers';
UPDATE "Brand" SET "website" = 'https://www.liftrite.com/', "updatedAt" = CURRENT_TIMESTAMP WHERE "slug" = 'liftrite';
UPDATE "Brand" SET "website" = 'https://www.milwaukeehandtrucks.com/', "updatedAt" = CURRENT_TIMESTAMP WHERE "slug" = 'milwaukee-truck';
UPDATE "Brand" SET "website" = 'https://www.pucelenterprises.com/', "updatedAt" = CURRENT_TIMESTAMP WHERE "slug" = 'pucel-enterprises';
