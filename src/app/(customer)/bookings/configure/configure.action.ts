"use server"

import { prisma } from "@/lib/db";
import { configureSeatsSchema } from "./configure.schema";
import { redirect } from "next/navigation";

export async function saveBookedSeats(input: unknown, userId: string) {

    const result = configureSeatsSchema.safeParse(input);

    if (!result.success) {
        return { error: result.error.format() };
    }

    const { crossingId, selectedSeats } = result.data;

    try {
        const reservation = await prisma.reservation.create({
            data: {
                userId,
                totalAmount: 0,
                status: "PENDING",
                seats: {
                    create: selectedSeats.map((seat) => ({
                        crossingId,
                        seatTypeId: seat.seatTypeId,
                        bookedSeats: seat.seatCount,
                    })),
                },
            },
        });

        redirect(`/bookings/summary?reservation=${reservation.id}`);
    } catch (error) {
        console.error(error);
        return { error: "An error occurred while creating the reservation." };
    }
}
