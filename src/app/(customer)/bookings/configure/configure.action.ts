"use server"

import { prisma } from "@/lib/db";
import { configureSeatSchema } from "@/app/(customer)/bookings/configure/configure.schema";

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
  await prisma.$transaction(async (tx) => {
    // Créez la réservation d'abord
    const reservation = await tx.reservation.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
      },
    });

    // Insérez ou mettez à jour les sièges réservés
    for (const seat of selectedSeats) {
      const { seatTypeId, bookedSeats } = seat;

      // Vérifiez si le siège est déjà réservé pour ce crossingId
      const existingSeat = await tx.seat.findUnique({
        where: {
          crossingId_seatTypeId: {
            crossingId,
            seatTypeId,
          },
        },
      });

      if (existingSeat) {
        // Si le siège existe déjà, mettez à jour le bookedSeats
        await tx.seat.update({
          where: {
            id: existingSeat.id,
          },
          data: {
            bookedSeats: existingSeat.bookedSeats + bookedSeats,
            reservationId: reservation.id, // Assurez-vous que cela est mis à jour
          },
        });
      } else {
        // Sinon, créez une nouvelle réservation de siège
        await tx.seat.create({
          data: {
            seatTypeId,
            crossingId,
            bookedSeats,
            reservationId: reservation.id,
          },
        });
      }
    }
  });
}
