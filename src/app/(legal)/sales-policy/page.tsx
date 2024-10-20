import BroadcastBanner from "@/components/broadcast-banner";

export default function SalesPolicyPage() {
    return (
        <>
            <BroadcastBanner
                message={"The content of this page is only for demonstration purposes and shall not be granted as a legal document from MarieTeam."} />
            <article className="container max-w-3xl py-14">
                <h1 className="text-4xl lg:text-5xl font-bold text-center mt-6">Sales Policy</h1>
                <section className={"mt-10 mb-20"}>
                    <p>
                        These Terms and Conditions of Sale (TCS) govern the contractual relationship between MarieTeam,
                        a subsidiary of Spectron Labs, and its customers, hereinafter referred to
                        as &quot;Passengers.&quot; By booking a trip aboard our maritime vessels, the Passenger accepts
                        these terms without reservation. We are committed to providing high-quality maritime
                        transportation services while respecting the rights of our Passengers.
                    </p>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.1 Purpose</h2>
                    <p className={"mt-6"}>
                        These Terms and Conditions define the terms applicable to the sale of trips aboard our maritime
                        vessels, including cruises to various destinations. They aim to inform Passengers of their
                        rights and obligations when booking and during their trip.
                    </p>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.2 Prices</h2>
                    <p className={"mt-6"}>
                        The prices of trips are indicated in euros, all taxes included (VAT). Additional fees such as
                        port taxes, insurance, and optional services (excursions, catering, etc.) will be clearly
                        specified at the time of booking. We reserve the right to modify our rates at any time without
                        prior notice, but the prices applied will be those in effect at the time of booking.
                    </p>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.3 Booking</h2>
                    <p className={"mt-6"}>
                        Booking a trip can be done online through our website or by phone. Booking confirmation will be
                        sent via email after receipt of payment. The booking is considered firm and final only after the
                        confirmation has been sent.
                    </p>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.4 Payment</h2>
                    <p className={"mt-6"}>
                        Payment for the trip must be made in full at the time of booking, unless otherwise agreed. We
                        accept payments by credit card, bank transfer, or any other secure payment method. In the event
                        of non-payment within the stipulated time, the booking will be canceled.
                    </p>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.5 Cancellation and Refunds</h2>
                    <div className={"mt-6"}>
                        Passengers may cancel their booking under the following conditions:
                        <ul className={"my-6 ml-6 list-disc [&>li]:mt-2"}>
                            <li>Cancellation more than 30 days before the departure date: full refund, minus
                                administrative fees.
                            </li>
                            <li>Cancellation between 30 and 7 days before the departure date: 50% refund of the total
                                amount.
                            </li>
                            <li>Cancellation less than 7 days before the departure date: no refund, except in cases of
                                force majeure, in accordance with applicable legislation.
                            </li>
                        </ul>
                        Cancellation requests must be submitted in writing to our customer service.
                    </div>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.6 Trip Modification</h2>
                    <p className={"mt-6"}>
                        We reserve the right to modify the itinerary or schedules due to adverse weather conditions,
                        unforeseen circumstances, or safety reasons. Passengers will be informed of these changes as
                        soon as possible. In the event of a significant change, the Passenger may choose between
                        canceling their trip or accepting the new conditions.
                    </p>
                    <h2 className={"mt-10 font-bold text-2xl"}>1.7 Complaints</h2>
                    <p className={"mt-6"}>
                        Any complaints must be addressed in writing to our customer service within 30 days following the
                        end of the trip. We commit to processing complaints within 30 working days. If the complaint is
                        justified, a refund or compensation may be offered.
                    </p>
                </section>
            </article>
        </>
    )
}