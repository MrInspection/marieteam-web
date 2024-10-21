"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Anchor, ChevronRight } from "lucide-react";
import { formatName } from "@/app/(customer)/bookings/_components/utils";
import Image from "next/image";
import { format } from "date-fns";
import { createCheckoutSession } from "@/app/(customer)/bookings/summary/summary.action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type Seat = {
    id: string;
    seatType: {
        name: string;
        description: string;
        Pricing: {
            routeId: string;
            amount: number;
        }[];
    };
    bookedSeats: number;
    crossing: {
        boat: {
            name: string;
            imageUrl: string;
        };
        route: {
            id: string;
            departurePort: string;
            arrivalPort: string;
        };
        departureTime: Date;
        captainLogs?: {
            delayMinutes: number;
        }[];
    };
};

type Reservation = {
    id: string;
    totalAmount: number;
    seats: Seat[];
    userId: string;
};

type SummaryProps = {
    reservation: Reservation;
};

function OrderSummary({ reservation }: SummaryProps) {
    const boat = reservation.seats[0].crossing.boat;
    const route = reservation.seats[0].crossing.route;
    const captainLogs = reservation.seats[0].crossing.captainLogs;
    const delayMinutes = captainLogs?.[0]?.delayMinutes ?? 0;
    const departureTime = reservation.seats[0].crossing.departureTime;
    const adjustedDepartureTime = new Date(departureTime.getTime() + delayMinutes * 60000);

    const router = useRouter();

    const handleCheckout = async () => {
        try {
            const { url } = await createCheckoutSession({ reservationId: reservation.id, userId: reservation.userId });
            if (typeof url === "string") {
                router.push(url)
            }
        } catch (error) {
            toast.error(`${error}`);
            console.error(error)
        }
    };

    return (
        <>
            <section className={"container py-9"}>
                <h1 className={"text-3xl font-bold"}>Order Summary</h1>
                <p className={"text-sm text-muted-foreground"}>Reservation ID: {reservation.id}</p>
            </section>
            <div className={"bg-muted/50 dark:bg-black border-t-2"}>
                <div className="container py-16">
                    <div className={"grid lg:grid-cols-3 max-lg:gap-6 gap-10"}>
                        <div className={"lg:col-span-2"}>
                            <div className="border-2 rounded-2xl col-span-2 p-2">
                                <Image
                                    width={500}
                                    height={500}
                                    src={boat.imageUrl || "placeholder.svg"}
                                    alt="boat"
                                    className="max-lg:h-auto h-auto w-full rounded-xl"
                                    draggable={false}
                                    priority={true}
                                />
                            </div>
                        </div>
                        <div>
                            <section className={"space-y-3"}>
                                <div className={"grid grid-cols-2 gap-3"}>
                                    <div className={"border-2 rounded-2xl px-4 py-3"}>
                                        <h4 className="text-xs text-muted-foreground">Boat</h4>
                                        <p className={"line-clamp-1 text-sm font-medium"}>{boat.name}</p>
                                    </div>
                                    <div className={"border-2 rounded-2xl px-4 py-3"}>
                                        <h4 className="text-xs text-muted-foreground">Departure Time</h4>
                                        <div className="flex items-center gap-1.5">
                                            <p className={"font-medium"}>{format(departureTime, "HH:mm")}</p>
                                            {delayMinutes > 0 && (
                                                <p className="font-bold text-orange-500">
                                                    {format(adjustedDepartureTime, "HH:mm")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-2 py-3 px-4 rounded-2xl max-md:col-span-2">
                                    <section>
                                        <h4 className="text-xs text-muted-foreground">Departure</h4>
                                        <p className="text-sm font-medium">{route.departurePort}</p>
                                    </section>
                                    <div className="flex-grow mx-4 flex items-center">
                                        <div className="h-px bg-foreground flex-grow" />
                                        <Anchor className={"size-5 mx-2"} />
                                        <div className="h-px bg-foreground flex-grow" />
                                    </div>
                                    <section>
                                        <h4 className="text-xs text-muted-foreground text-right">Arrival</h4>
                                        <p className="text-sm font-medium text-right">{route.arrivalPort}</p>
                                    </section>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-lg font-semibold mt-6 mb-4">Seats Reserved</h2>
                                <div className={"grid gap-4"}>
                                    {reservation.seats.map((seat) => {
                                        const pricing = seat.seatType.Pricing.find((p) => p.routeId === route.id);
                                        const individualPrice = pricing ? pricing.amount : 0;

                                        return (
                                            <div
                                                className={
                                                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                                                }
                                                key={seat.id}
                                            >
                                                <div>
                                                    <h3 className="font-medium">{formatName(seat.seatType.name)}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {seat.seatType.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className={"text-muted-foreground"}>{seat.bookedSeats}x </span>
                                                    <span className={"font-medium"}>{individualPrice.toFixed(2)}€</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={"border-t-2 pt-4 flex items-center justify-between mt-8"}>
                                    <p className={"text-muted-foreground text-lg"}>Total Amount</p>
                                    <p className={"font-bold text-lg"}>{reservation.totalAmount.toFixed(2)}€</p>
                                </div>
                                <Button className="mt-4 w-full" size="lg" onClick={handleCheckout}>
                                    Proceed to checkout <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderSummary;
