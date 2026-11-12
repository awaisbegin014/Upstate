import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteContent } from "@/lib/site-content-server";

export const instant = false;

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();
  return (
    <>
      <Header content={content} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer content={content} />
    </>
  );
}
