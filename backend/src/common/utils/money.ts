/** Checkout settings that affect totals. */
export interface PricingSettings {
  taxRateBps: number;
  flatShippingCents: number;
  freeShippingThresholdCents: number;
}

export interface Totals {
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  taxRateBps: number;
}

/**
 * Order totals in integer cents. Pickup orders ship free. Shipping is taxed
 * along with the goods, as New York requires when the goods are taxable.
 */
export function computeTotals(
  subtotalCents: number,
  settings: PricingSettings,
  fulfillment: 'SHIPPING' | 'PICKUP',
): Totals {
  let shippingCents = 0;
  if (fulfillment === 'SHIPPING' && subtotalCents > 0) {
    const free =
      settings.freeShippingThresholdCents > 0 &&
      subtotalCents >= settings.freeShippingThresholdCents;
    shippingCents = free ? 0 : settings.flatShippingCents;
  }
  const taxCents = Math.round(
    ((subtotalCents + shippingCents) * settings.taxRateBps) / 10_000,
  );
  return {
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents: subtotalCents + shippingCents + taxCents,
    taxRateBps: settings.taxRateBps,
  };
}
