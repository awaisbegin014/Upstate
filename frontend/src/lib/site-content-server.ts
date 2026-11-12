import "server-only";
import { mergeSiteContent, type SiteContent } from "./content";
import { serverApi } from "./server-api";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    return mergeSiteContent(
      await serverApi<Partial<SiteContent>>("/store/content"),
    );
  } catch {
    return mergeSiteContent();
  }
}
