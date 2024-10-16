import Image from "next/image";
import {InstagramLogoIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";
import {BiLogoTiktok} from "react-icons/bi";
import {BsTwitterX} from "react-icons/bs";

export default function SiteFooter() {
  return (
      <div className={"border-t-2"}>

          {/* TODO - Finish the UI Layot of the settings Page */}
          {/* TODO - Implement backgend code logic for the settings page */}






          <footer className="container max-w-7xl py-6 md:flex-row ">
              <div className={"grid gap-8 xl:grid-cols-3 my-10"}>
                  <div className={"xl:w-60"}>
                      <div className={"flex items-center gap-2"}>
                          <Image
                              className="size-10"
                              src="/branding/marieteam-logo.svg"
                              alt="Next.js logo"
                              width={180}
                              height={38}
                              priority
                          />
                          <p className=" font-bold">MarieTeam</p>
                      </div>
                      <p className={"text-sm text-muted-foreground mt-4 text-start"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>
                      <p className={"text-sm mt-4"}>A Spectron Labs Product.</p>

                  </div>
                  <div className={"xl:col-span-2 grid grid-cols-2 gap-8 max-xl:mt-16"}>
                      <div className={"md:grid md:grid-cols-2 md:gap-8"}>
                          <section>
                              <h3>Product</h3>
                              <ul className={"mt-4 text-sm text-muted-foreground"}>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Features</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Pricing</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Testimonials</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Integration</a></li>
                              </ul>
                          </section>
                          <section>
                              <h3>Product</h3>
                              <ul className={"mt-4 text-sm text-muted-foreground"}>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Features</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Pricing</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Testimonials</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Integration</a></li>
                              </ul>
                          </section>
                      </div>
                      <div className={"md:grid md:grid-cols-2 md:gap-8"}>
                          <section>
                              <h3>Product</h3>
                              <ul className={"mt-4 text-sm text-muted-foreground"}>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Features</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Pricing</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Testimonials</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Integration</a></li>
                              </ul>
                          </section>
                          <section>
                              <h3>Product</h3>
                              <ul className={"mt-4 text-sm text-muted-foreground"}>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Features</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Pricing</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Testimonials</a></li>
                                  <li className={"mt-2"}><a
                                      className={"hover:text-foreground transition-all duration-300"}
                                      href="">Integration</a></li>
                              </ul>
                          </section>
                      </div>
                  </div>
              </div>




              <section
                  className={"border-t-2 py-4 mt-4 text-muted-foreground flex max-md:flex-col items-center justify-between"}>
                  <p className={"text-sm"}>© {new Date().getFullYear()} MarieTeam Corporation, all rights
                      reserved.</p>
                  <div className={"flex gap-5 items-center max-md:mt-5"}>
                      <BsTwitterX className={"size-4 hover:text-primary"}/>
                      <LinkedInLogoIcon className={"size-4 hover:text-primary"}/>
                      <BiLogoTiktok className={"size-4 hover:text-primary"}/>
                      <InstagramLogoIcon className={"size-4 hover:text-primary"}/>
                  </div>
              </section>
          </footer>








      </div>
  );
}
