import BroadcastBanner from "@/components/broadcast-banner";

export default function TransportPolicyPage() {
    return (
        <>
            <BroadcastBanner
                message={"The content on this page is for demonstration purposes only and should not be considered an official document from MarieTeam."} variant={"error"} />
            <article className="container max-w-3xl py-14">
                <h1 className="text-4xl lg:text-5xl font-bold text-center mt-6">Transport Policy</h1>
                <section className="mt-10 mb-20">
                    <p>The following General Terms and Conditions of Transport govern the rights and obligations of
                        Passengers and the company MarieTeam for journeys made on board our ships. In accordance with
                        European Union regulations, notably Regulation (EC) No. 1177/2010, we are committed to ensuring
                        the safety, comfort, and respect of the rights of our Passengers. By booking a journey with us,
                        you accept these conditions, and we thank you for your trust.
                    </p>
                    <h2 className="mt-10 font-bold text-2xl">1.1 General Terms and Conditions of Transport</h2>
                    <p className="mt-6">Passengers are bound by these terms and conditions when they book a journey
                        and the company MarieTeam for journeys made on board our ships. They are compliant with European
                        Union regulations.
                    </p>
                    <h2 className="mt-10 font-bold text-2xl">1.2 Transport Tickets</h2>
                    <p className="mt-6">The transport ticket is personal and non-transferable. It must be presented during boarding. No
                        Passenger will be allowed to board without a valid ticket. In case of loss or theft, the
                        Passenger must immediately inform the company to obtain a duplicate, subject to specific
                        conditions.
                    </p>
                    <h2 className="mt-10 font-bold text-2xl">1.3 Company Liability</h2>
                    <p className="mt-6">MarieTeam is responsible for the safety and well-being of Passengers on board. We adhere to
                        international maritime safety standards. In the event of damage or incident, we comply with the
                        provisions of the Athens Convention and Regulation (EC) No. 1177/2010. Our liability is limited
                        to the terms defined by these regulations.</p>
                    <h2 className="mt-10 font-bold text-2xl">1.4 Passenger Obligations</h2>
                    <p className="mt-6">Passengers must comply with safety rules and follow the instructions given by the onboard staff.
                        They must present themselves for boarding at least 30 minutes before departure. In case of
                        non-compliance with this obligation, access to the ship may be denied without refund.</p>
                    <h2 className="mt-10 font-bold text-2xl">1.5 Luggage</h2>
                    <p className="mt-6">Each Passenger is entitled to a limited number of personal luggage, the dimensions and weight of
                        which must comply with our guidelines. MarieTeam disclaims all responsibility in the event of
                        loss or damage to personal belongings, unless due to our negligence. Passengers are encouraged
                        to purchase travel insurance to cover their personal belongings.</p>
                    <h2 className="mt-10 font-bold text-2xl">1.6 Pets</h2>
                    <p className="mt-6">
                        Pets are not allowed on board, except for assistance animals (guide dogs, etc.), which are
                        permitted upon presentation of supporting documents and prior approval from the company.
                    </p>
                    <h2 className="mt-10 font-bold text-2xl">1.7 Modifications and Cancellations by the Company</h2>
                    <p className="mt-6">
                        MarieTeam reserves the right to modify or cancel a cruise for safety reasons, force majeure, or
                        adverse weather conditions. In case of cancellation, Passengers will have the option of a full
                        refund of the ticket price or a credit for a future journey. Passengers will be informed of any
                        itinerary changes or cancellations as soon as possible.
                    </p>
                    <h2 className="mt-10 font-bold text-2xl">1.8 Passenger Rights</h2>
                    <p className="mt-6">In accordance with Regulation (EC) No. 1177/2010, Passengers have the following rights:</p>
                    <ul className="my-6 ml-6 list-disc [&gt;li]:mt-2">
                        <li><strong>Right to Information:</strong> Passengers must be informed of the transport
                            conditions, schedules, routes, and the possibility of cancellation or refund.
                        </li>
                        <li><strong>Right to Assistance:</strong> In the event of delays or cancellations, Passengers
                            are entitled to appropriate assistance, including refreshments and, if necessary,
                            accommodation.
                        </li>
                        <li><strong>Right to Compensation:</strong> In case of delay upon arrival, Passengers may be
                            entitled to compensation in accordance with the provisions of the regulation.
                        </li>
                    </ul>
                </section>
            </article>
        </>
    )
}