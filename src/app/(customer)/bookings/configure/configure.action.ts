"use server";

import { prisma } from "@/lib/db";
import { configureSeatSchema } from "@/app/(customer)/bookings/configure/configure.schema";
import { redirect } from "next/navigation";

export async function configureSeatAction(
    crossingId: string,
    selectedSeats: Array<{ seatTypeId: string; bookedSeats: number }>,
    totalAmount: number,
    userId: string
) {
  // Validation des données
  const validData = configureSeatSchema.safeParse({
    crossingId,
    selectedSeats,
  });

  if (!validData.success) {
    throw new Error("Les données de sélection des sièges sont invalides");
  }

  // Traiter les réservations
  const reservation = await prisma.$transaction(async (tx) => {
    // Créez la réservation d'abord
    const newReservation = await tx.reservation.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
      },
    });

    // Créez une nouvelle entrée pour chaque type de siège dans cette réservation
    for (const seat of selectedSeats) {
      const { seatTypeId, bookedSeats } = seat;

      // Créer une nouvelle entrée de siège pour cette réservation
      await tx.seat.create({
        data: {
          seatTypeId,
          crossingId,
          bookedSeats,
          reservationId: newReservation.id, // Lier la réservation à ce siège
        },
      });
    }

    return newReservation; // Retourner la nouvelle réservation
  });

  // Rediriger vers la page de confirmation avec l'ID de la réservation
  redirect(`/bookings/summary?id=${reservation.id}`);
}
