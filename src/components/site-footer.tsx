import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { BiLogoTiktok } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <div className={"border-t-2"}>
      <footer className="container max-w-7xl py-6 md:flex-row">
        <section
          className={
            "flex max-lg:flex-col items-center max-lg:gap-6 justify-between mt-2"
          }
        >
          <div className={"flex items-center justify-center gap-2"}>
            <Image
              className="size-10 dark:invert select-none"
              src="/branding/marieteam-black.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              draggable={false}
            />
            <p className=" font-bold">MarieTeam Corp.</p>
          </div>
          <div className={"flex flex-wrap justify-center items-center gap-6"}>
            <Link
              href={"/privacy"}
              className={
                "text-muted-foreground hover:underline hover:underline-offset-4"
              }
            >
              Privacy Policy
            </Link>
            <Link
              href={"/sales-policy"}
              className={
                "text-muted-foreground hover:underline hover:underline-offset-4"
              }
            >
              Sales Policy
            </Link>
            <Link
              href={"/transportation-policy"}
              className={
                "text-muted-foreground hover:underline hover:underline-offset-4"
              }
            >
              Transportation Policy
            </Link>
          </div>
          <div className={"flex gap-5 items-center"}>
            <BsTwitterX
              className={"size-4 text-muted-foreground hover:text-primary"}
            />
            <LinkedInLogoIcon
              className={"size-4 text-muted-foreground hover:text-primary"}
            />
            <BiLogoTiktok
              className={"size-4 text-muted-foreground hover:text-primary"}
            />
            <InstagramLogoIcon
              className={"size-4 text-muted-foreground hover:text-primary"}
            />
          </div>
        </section>
        <section
          className={
            "border-t-2 py-5 mt-5 text-muted-foreground flex max-md:flex-col items-center justify-center"
          }
        >
          <p className={"text-sm"}>
            © {new Date().getFullYear()} Spectron Labs. All rights reserved.
          </p>
        </section>
      </footer>
    </div>
  );
}
