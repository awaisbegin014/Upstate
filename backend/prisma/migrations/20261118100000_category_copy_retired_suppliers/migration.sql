-- Follow-up to 20261118090000: drop retired suppliers from the category intro
-- copy so existing databases match prisma/data/categories.ts. Safe to re-run.
UPDATE "Category"
SET "description" = REPLACE("description", 'Albion, Colson, Fairbanks, Faultless', 'Albion, Colson, Faultless'),
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'casters-and-wheels'
  AND "description" LIKE '%Albion, Colson, Fairbanks, Faultless%';

UPDATE "Category"
SET "description" = REPLACE("description", 'Morse, Valley Craft, Vestil', 'Morse, Vestil'),
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'drum-equipment'
  AND "description" LIKE '%Morse, Valley Craft, Vestil%';
