import { prisma } from "@/lib/db";
import InvalidRequest from "@/app/(customer)/bookings/error";
import { ConfigureSeats } from "@/app/(customer)/bookings/configure/configure-seats";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ShareTripButton } from "@/app/(customer)/bookings/_components/share-crossing";
import TripInformation from "@/app/(customer)/bookings/_components/trip-information";
import {auth} from "@/auth/auth";
import BroadcastBanner from "@/components/broadcast-banner";
import React from "react";

type ConfigurePageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const ConfigurePage = async ({ searchParams }: ConfigurePageProps) => {
    const { trip } = searchParams;

    if (!trip || typeof trip !== "string") {
        return InvalidRequest();
    }

    const configureTrip = await prisma.crossing.findUnique({
        where: {
            id: trip,
        },
        include: {
            boat: {
                include: {
                    categoryCapacities: true,
                },
            },
            captainLogs: true,
            route: true,
        },
    });

    if (!configureTrip) {
        return InvalidRequest();
    }

    const session = await auth()
    const userId = session?.user?.id

    const seatCategories = await prisma.seatCategory.findMany({
        include: {
            seatTypes: {
                include: {
                    seats: {
                        where: {
                            crossingId: trip,
                        },
                        select: {
                            bookedSeats: true,
                        },
                    },
                    Pricing: {
                        where: {
                            routeId: configureTrip.routeId,
                        },
                        select: {
                            amount: true,
                        },
                    },
                },
            },
            categoryCapacities: {
                where: {
                    boatId: configureTrip.boatId,
                },
                select: {
                    maxCapacity: true,
                },
            },
        },
    });

    const formattedSeatCategories = seatCategories.map((category) => {
        // Capacité maximale pour cette catégorie de sièges
        const maxCapacity = category.categoryCapacities[0]?.maxCapacity || 0;

        // Total des sièges déjà réservés dans cette catégorie
        const totalBookedSeats = category.seatTypes.reduce((total, type) => {
            return total + type.seats.reduce((seatTotal, seat) => seatTotal + seat.bookedSeats, 0);
        }, 0);

        // Capacité restante pour la catégorie
        const remainingCapacity = maxCapacity - totalBookedSeats;

        return {
            id: category.id,
            name: category.name,
            maxCapacity: remainingCapacity, // La capacité totale restante pour la catégorie
            seatTypes: category.seatTypes.map((type) => {
                const bookedSeats = type.seats.reduce(
                    (total, seat) => total + seat.bookedSeats,
                    0
                );
                const availableSeats = Math.min(
                    remainingCapacity,
                    maxCapacity - bookedSeats
                );

                return {
                    id: type.id,
                    name: type.name,
                    description: type.description || "",
                    price: type.Pricing.length > 0 ? type.Pricing[0].amount : 0,
                    seatCategoryId: category.id,
                    availableSeats,
                };
            }),
        };
    });

    const seaCondition =
        configureTrip.captainLogs.length > 0
            ? configureTrip.captainLogs[0].seaCondition
            : "CALM";

    const delayMinutes =
        configureTrip.captainLogs.length > 0 &&
        configureTrip.captainLogs[0].delayMinutes
            ? configureTrip.captainLogs[0].delayMinutes
            : 0;

    return (
        <>
            {!userId &&
                <BroadcastBanner
                    variant="warning"
                    message="Please create an account or log in to continue with your reservation and complete the checkout process."
                />
            }
            <div className="bg-muted/40 dark:bg-black">
                <div className="container max-lg:py-14 py-20">
                    <div className="flex items-center gap-2 mb-6">
                        <Link
                            href="/bookings"
                            className={cn(buttonVariants({variant: "outline"}))}
                        >
                            <ChevronLeft className="size-4 mr-2" />
                            Back
                        </Link>
                        <ShareTripButton id={configureTrip.id}/>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-10">
                        <TripInformation
                            boat={configureTrip.boat}
                            route={configureTrip.route}
                            departureTime={configureTrip.departureTime}
                            seaCondition={seaCondition}
                            delayMinutes={delayMinutes}
                            delayReason={configureTrip.captainLogs[0]?.delayReason}
                        />
                        <ConfigureSeats
                            crossingId={configureTrip.id}
                            seatCategories={formattedSeatCategories}
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfigurePage;
