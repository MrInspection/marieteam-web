import BroadcastBanner from "@/components/broadcast-banner";

export default function PrivacyPage() {
    return (
        <>
            <BroadcastBanner
                message={"The content of this page is only for demonstration purposes and shall not be granted as a legal document from MarieTeam."}/>
            <article className="container max-w-3xl py-14">
                <h1 className="text-4xl lg:text-5xl font-bold text-center mt-6">Privacy Policy</h1>
                <section className={"mt-10 mb-20"}>
                    <p>
                        This Privacy Policy outlines how MarieTeam, a subsidiary of Spectron Labs, collects, uses, and
                        protects
                        the personal information of its Passengers. We are committed to safeguarding your privacy and
                        ensuring that
                        your personal data is handled in compliance with applicable data protection laws, including the
                        General Data
                        Protection Regulation (GDPR).
                    </p>
                    <h3 className={"mt-10 font-bold text-2xl"}>1.1 Data Collection</h3>
                    <p className={"mt-6"}>
                        As part of our services, we collect personal data such as name, address, email, phone number,
                        payment information,
                        and specific details related to travel reservations. This data is collected in accordance with
                        the principles of
                        data minimization and relevance. We ensure that only the necessary information is collected for
                        the specified purposes.
                    </p>
                    <h3 className={"mt-10 font-bold text-2xl"}>1.2 Data Use</h3>
                    <p className={"mt-6"}>
                        The collected data is used exclusively for managing reservations, improving our services, and
                        communicating with
                        Passengers. We do not share personal data with third parties without the explicit consent of the
                        Passengers, except
                        as required by law. Any use of data for marketing purposes will be subject to obtaining prior
                        consent from the Passengers.
                    </p>
                    <h3 className={"mt-10 font-bold text-2xl"}>1.3 Data Security</h3>
                    <p className={"mt-6"}>
                        We implement all necessary technical and organizational measures to protect Passengers&apos; data
                        against loss, theft,
                        or unauthorized access. Our website uses encryption protocols to ensure the security of
                        transactions and personal
                        information. Regular security audits are conducted to evaluate the effectiveness of our measures
                        and ensure compliance
                        with industry standards.
                    </p>
                    <h3 className={"mt-10 font-bold text-2xl"}>1.4 User Rights</h3>
                    <p className={"mt-6"}>
                        In accordance with the General Data Protection Regulation (GDPR), Passengers have the following
                        rights:
                    </p>
                    <ul className={"my-6 ml-6 list-disc [&gt;li]:mt-2"}>
                        <li><strong>Right of Access:</strong> The right to consult the personal data we hold.</li>
                        <li><strong>Right to Rectification:</strong> The right to correct inaccurate or incomplete data.
                        </li>
                        <li><strong>Right to Erasure:</strong> The right to request the deletion of personal data,
                            subject to our legal obligations for data retention.
                        </li>
                        <li><strong>Right to Data Portability:</strong> The right to receive data in a structured,
                            commonly used format and to transmit it to another data controller, if applicable.
                        </li>
                        <li><strong>Right to Object:</strong> The right to object to the processing of personal data for
                            direct marketing purposes.
                        </li>
                    </ul>
                    <p>
                        To exercise any of these rights, Passengers can contact us using the contact information
                        provided below.
                    </p>

                    <h3 className={"mt-10 font-bold text-2xl"}>1.5 Data Retention</h3>
                    <p className={"mt-6"}>
                        Personal data of Passengers is retained for the duration necessary to fulfill the purposes for
                        which it was collected,
                        unless there is a legal obligation to retain it longer. We regularly review our data retention
                        policies to ensure
                        compliance and to minimize the storage of unnecessary personal data.
                    </p>

                    <h3 className={"mt-10 font-bold text-2xl"}>1.6 Changes to the Privacy Policy</h3>
                    <p className={"mt-6"}>
                        We reserve the right to update this Privacy Policy at any time. Any changes will be communicated
                        to Passengers via
                        email or through our website. Passengers are encouraged to review this policy periodically to
                        stay informed about
                        how we are protecting their information.
                    </p>

                    <h3 className={"mt-10 font-bold text-2xl"}>1.7 Contact Information</h3>
                    <p className={"mt-6"}>
                        For any questions, concerns, or requests regarding this Privacy Policy, Passengers can contact
                        us at:
                    </p>
                    <ul className={"my-6 ml-6 list-disc [&gt;li]:mt-2"}>
                        <li>Email: [insert email address]</li>
                        <li>Phone: [insert phone number]</li>
                        <li>Address: [insert physical address]</li>
                    </ul>
                </section>
            </article>
        </>
    )
}