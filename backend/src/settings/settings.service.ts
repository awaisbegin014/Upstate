import { Injectable } from '@nestjs/common';
import type { Prisma, StoreSettings } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StripeService } from '../payments/stripe.service.js';

const SETTINGS_ID = 'store';
const CONTENT_ID = 'site';

export type SettingsUpdate = Partial<
  Pick<
    StoreSettings,
    | 'taxRateBps'
    | 'flatShippingCents'
    | 'freeShippingThresholdCents'
    | 'pickupEnabled'
    | 'invoiceEnabled'
  >
>;

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
  ) {}

  /** The settings row, created with defaults on first use. Read-only once it exists. */
  async get(): Promise<StoreSettings> {
    const existing = await this.prisma.storeSettings.findUnique({
      where: { id: SETTINGS_ID },
    });
    if (existing) return existing;
    return this.prisma.storeSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID },
      update: {},
    });
  }

  update(data: SettingsUpdate): Promise<StoreSettings> {
    return this.prisma.storeSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID, ...data },
      update: data,
    });
  }

  /** What the storefront needs to show totals and payment choices. */
  async publicSettings() {
    const s = await this.get();
    return {
      taxRateBps: s.taxRateBps,
      flatShippingCents: s.flatShippingCents,
      freeShippingThresholdCents: s.freeShippingThresholdCents,
      pickupEnabled: s.pickupEnabled,
      paymentMethods: {
        card: this.stripe.configured,
        invoice: s.invoiceEnabled,
      },
    };
  }

  async siteContent(): Promise<Record<string, unknown>> {
    const content = await this.prisma.siteContent.findUnique({
      where: { id: CONTENT_ID },
    });
    return (content?.data as Record<string, unknown> | undefined) ?? {};
  }

  async updateSiteContent(data: Record<string, string>) {
    return this.prisma.siteContent.upsert({
      where: { id: CONTENT_ID },
      create: { id: CONTENT_ID, data: data as Prisma.InputJsonValue },
      update: { data: data as Prisma.InputJsonValue },
    });
  }
}
