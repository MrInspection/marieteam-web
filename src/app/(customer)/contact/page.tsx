import ContactForm from "@/app/(customer)/contact/contact-form";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Contact Us - MarieTeam",
};

export default function ContactPage() {
  return (
    <>
      <main className="flex flex-col flex-grow">
        <div className="container grid gap-10 my-16 max-w-3xl">
          <div>
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Have a question? We&apos;d love to hear from you.
            </p>
          </div>
          <ContactForm/>
        </div>
      </main>
    </>
  )
}