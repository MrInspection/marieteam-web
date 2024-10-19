export default function OrderSummaryPage() {
    return (
        <>
            <div className={"bg-muted/40"}>
                <div className={"container max-w-7xl max-lg:py-14 py-20"}>
                    <div className={"grid lg:grid-cols-2 gap-10"}>
                        <section>
                            <h1 className={"font-bold text-2xl"}>Order Summary</h1>
                            <p className={"text-muted-foreground text-sm"}>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        </section>
                        <section>
                            Emebedded Stripe Checkout
                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}
