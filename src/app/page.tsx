import Image from "next/image";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
      <>
          <SiteHeader />
          <div className="flex flex-col items-center justify-center h-screen bg-muted/40">
              <div className={"flex items-center justify-center gap-2 border-2 p-20 rounded-xl"}>
                  <Image
                      className="dark:invert size-16"
                      src="/branding/marieteam-logo.svg"
                      alt="Next.js logo"
                      width={180}
                      height={38}
                      priority
                  />
                  <p className="text-2xl font-bold">MarieTeam</p>
              </div>


          </div>
          <SiteFooter />
      </>
  );
}
