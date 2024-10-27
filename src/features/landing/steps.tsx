import Image from "next/image";
import React from "react";

export function BookingSteps() {
    return (
        <>
            <div className="container">

                <div className="flex flex-col items-center justify-center mb-16">
                    <h1 className="text-5xl font-bold">Book your dream vacation</h1>
                    <p className="text-muted-foreground mt-2 text-lg">Going on a trip has never been easier than with
                        MarieTeam</p>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    <section className="border-t-2 pt-6">
                        <p className="text-sm">Step 1</p>
                        <h1 className="text-xl font-medium mt-2">Choose your destination</h1>
                        <p className="text-muted-foreground mt-4">
                            Select your destination within the 10 geographical zones proposed around France by
                            MarieTeam.
                        </p>
                    </section>
                    <section className="border-t-2 pt-6">
                        <p className="text-sm">Step 2</p>
                        <h1 className="text-xl font-medium mt-2">Configure your trip</h1>
                        <p className="text-muted-foreground mt-4">
                            Select your cruise and configure the seats you want to book for your trip within our fleet
                            of boats.
                        </p>
                    </section>
                    <section className="border-t-2 pt-6">
                        <p className="text-sm">Step 3</p>
                        <h1 className="text-xl font-medium mt-2">Enjoy your trip</h1>
                        <p className="text-muted-foreground mt-4">
                            Enjoy your trip on board our fleet of boats and enjoy the beautiful coastal scenery with
                            unmatched comfort.
                        </p>
                    </section>
                    <section
                        className="col-span-full border-2 mt-6 -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <Image
                            src={`/images/marieteam.png`}
                            alt="Spectron Labs"
                            height={866} width={1364} quality={100}
                            className="rounded-md bg-background p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900"
                            draggable={false}/>
                    </section>
                </div>
            </div>
        </>
    )
}