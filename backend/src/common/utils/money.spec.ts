import { computeTotals } from './money.js';

const settings = {
  taxRateBps: 800,
  flatShippingCents: 4900,
  freeShippingThresholdCents: 100_000,
};

describe('computeTotals', () => {
  it('charges flat shipping below the threshold and taxes goods + shipping', () => {
    const t = computeTotals(10_000, settings, 'SHIPPING');
    expect(t.shippingCents).toBe(4900);
    expect(t.taxCents).toBe(Math.round((10_000 + 4900) * 0.08));
    expect(t.totalCents).toBe(10_000 + 4900 + t.taxCents);
  });

  it('ships free at or above the threshold', () => {
    expect(computeTotals(100_000, settings, 'SHIPPING').shippingCents).toBe(0);
  });

  it('never charges shipping for pickup', () => {
    const t = computeTotals(5000, settings, 'PICKUP');
    expect(t.shippingCents).toBe(0);
    expect(t.taxCents).toBe(400);
  });

  it('treats a zero threshold as "no free shipping"', () => {
    const t = computeTotals(500_000, { ...settings, freeShippingThresholdCents: 0 }, 'SHIPPING');
    expect(t.shippingCents).toBe(4900);
  });
});
