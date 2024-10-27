import ContactForm from "@/app/(customer)/contact/contact-form";


export default function ContactPage() {
    return (
        <>
            <main className="flex flex-col flex-grow">
                <div className="container grid grid-cols-2 gap-10 my-16 max-w-6xl">
                    <div>
                        <h1 className="text-5xl font-bold">Contact Us</h1>
                        <p className="text-muted-foreground text-sm">
                            Have a question? We&apos;d love to hear from you.
                        </p>
                    </div>
                    <ContactForm/>
                </div>
            </main>
        </>
    )
}