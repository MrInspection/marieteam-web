import Image from "next/image";
import {InstagramLogoIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";
import {BiLogoTiktok} from "react-icons/bi";
import {BsTwitterX} from "react-icons/bs";

export default function SiteFooter() {
  return (
      <div className={"border-t-2"}>
          <footer className="container py-6 md:h-80 md:flex-row">
              <div className={"flex items-center gap-2"}>
                  <Image
                      className="dark:invert size-10"
                      src="/branding/marieteam-logo.svg"
                      alt="Next.js logo"
                      width={180}
                      height={38}
                      priority
                  />
                  <p className=" font-bold">MarieTeam</p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>


              <div>
                  <h2 className={"font-medium"}>Legal</h2>
                  <div className={"text-muted-foreground"}>
                      <p className={""}>Privacy Policy</p>
                      <p className={""}>Sales Policy</p>
                      <p className={""}>Transportation Policy</p>
                      <p className={""}>Passenger Rights</p>
                  </div>
              </div>


              <section
                  className={"border-t-2 py-4 mt-4 text-muted-foreground flex max-md:flex-col items-center justify-between md:px-2.5"}>
                  <p className={"text-sm"}>© {new Date().getFullYear()} MarieTeam Corporation, all rights
                      reserved.</p>
                  <div className={"flex gap-5 items-center max-md:mt-5"}>
                      <BsTwitterX className={"size-4 hover:text-primary"}/>
                      <LinkedInLogoIcon className={"size-4 hover:text-primary"}/>
                      <BiLogoTiktok className={"size-4 hover:text-primary"} />
                      <InstagramLogoIcon className={"size-4 hover:text-primary"} />
                  </div>
              </section>
          </footer>
      </div>
  );
}
