"use server";

import {prisma} from "@/lib/db";
import {configureSeatSchema} from "@/app/(customer)/bookings/configure/configure.schema";
import {redirect} from "next/navigation";

export async function configureSeatAction(
  crossingId: string,
  selectedSeats: Array<{ seatTypeId: string; bookedSeats: number }>,
  totalAmount: number,
  userId: string
) {

  const validData = configureSeatSchema.safeParse({
    crossingId,
    selectedSeats,
  });

  if (!validData.success) {
    throw new Error("Invalid seat selection data");
  }

  const reservation = await prisma.$transaction(async (tx) => {
    const newReservation = await tx.reservation.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
      },
    });

    for (const seat of selectedSeats) {
      const {seatTypeId, bookedSeats} = seat;
      await tx.seat.create({
        data: {
          seatTypeId,
          crossingId,
          bookedSeats,
          reservationId: newReservation.id,
        },
      });
    }

    return newReservation;
  });

  redirect(`/bookings/summary?id=${reservation.id}`);
}
