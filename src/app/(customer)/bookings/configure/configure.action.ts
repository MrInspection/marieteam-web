"use server"

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

    // Insérez ou mettez à jour les sièges réservés
    for (const seat of selectedSeats) {
      const { seatTypeId, bookedSeats } = seat;

      // Vérifiez si le siège est déjà réservé pour ce crossingId et si la réservation est active
      const existingSeat = await tx.seat.findFirst({
        where: {
          crossingId,
          seatTypeId,
          reservationId: null, // Vérifie si le siège n'est pas encore réservé
        },
      });

      if (existingSeat) {
        // Si le siège existe déjà et n'est pas réservé, mettez à jour le bookedSeats
        await tx.seat.update({
          where: {
            id: existingSeat.id,
          },
          data: {
            bookedSeats: existingSeat.bookedSeats + bookedSeats,
            reservationId: newReservation.id, // Assurez-vous que cela est mis à jour
          },
        });
      } else {
        // Sinon, créez une nouvelle réservation de siège
        await tx.seat.create({
          data: {
            seatTypeId,
            crossingId,
            bookedSeats,
            reservationId: newReservation.id,
          },
        });
      }
    }

    return newReservation; // Retourner la nouvelle réservation
  });

  // Rediriger vers la page de confirmation avec l'ID de la réservation
  redirect(`/bookings/summary?id=${reservation.id}`);
}
