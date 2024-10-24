import {HeroSection} from "@/features/landing/hero-section";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default async function Home() {
  return (
      <>
          <SiteHeader />
          <HeroSection />
          <div className={"container min-h-screen my-16"}>
          </div>
          <SiteFooter />
      </>
  );
}
