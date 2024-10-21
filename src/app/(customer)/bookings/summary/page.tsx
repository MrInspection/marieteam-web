import NotFound from "@/app/not-found";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/db";
import OrderSummary from "@/app/(customer)/bookings/summary/order-summary";
import React from "react";

type SummaryPageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const SummaryPage = async ({ searchParams }: SummaryPageProps) => {
    const { id } = searchParams;

    const session = await auth();
    const userId = session?.user?.id;

    if (!id || typeof id !== "string" || !userId) {
        return <NotFound />;
    }

    const reservation = await prisma.reservation.findUnique({
        where: {
            id: id,
            userId: userId,
            status: "PENDING",
        },
        include: {
            seats: {
                include: {
                    seatType: {
                        include: {
                            Pricing: true,
                        },
                    },
                    crossing: {
                        include: {
                            boat: true,
                            route: true,
                            captainLogs: true,
                        },
                    },
                },
            },
        },
    });

    if (!reservation) {
        return <NotFound />;
    }

    // @ts-expect-error Pass the reservation and userId as props to the OrderSummary component
    return <OrderSummary reservation={reservation} />;
};

export default SummaryPage;
