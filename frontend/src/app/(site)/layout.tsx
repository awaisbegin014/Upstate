import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
