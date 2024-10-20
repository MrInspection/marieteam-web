"use server"

import { prisma } from "@/lib/db";
import { reservationSchema, userIdSchema } from "./configure.schema";
import { getSession } from "next-auth/react"; // Pour gérer l'authentification

export async function configureSeatAction(crossingId: string, selectedSeats: Record<string, number>, totalAmount: number) {
    // Valider les données avec Zod
    const validation = reservationSchema.safeParse({ crossingId, seats: Object.entries(selectedSeats).map(([seatTypeId, quantity]) => ({ seatTypeId, quantity })), totalAmount });

    if (!validation.success) {
        throw new Error("Invalid reservation data");
    }

    const session = await getSession();

    if (!session?.user) {
        throw new Error("User is not authenticated. Please log in.");
    }

    // Valider l'ID utilisateur
    const userIdValidation = userIdSchema.safeParse(session.user.id);
    if (!userIdValidation.success) {
        throw new Error("Invalid user ID");
    }

    const userId = session.user.id;

    // Vérifier la disponibilité des sièges et sauvegarder la réservation
    try {
        await prisma.$transaction(async (tx) => {
            // Créer la réservation
            const reservation = await tx.reservation.create({
                data: {
                    userId,
                    totalAmount,
                    status: "PENDING",
                },
            });

            // Créer chaque siège réservé
            for (const [seatTypeId, quantity] of Object.entries(selectedSeats)) {
                const seatType = await tx.seatType.findUnique({
                    where: { id: seatTypeId },
                    include: { seats: true },
                });

                if (!seatType) {
                    throw new Error("Seat type not found");
                }

                // Vérifier la disponibilité des sièges
                const availableSeats = seatType.seats.reduce((acc, seat) => acc + seat.bookedSeats, 0);
                if (availableSeats < quantity) {
                    throw new Error(`Not enough seats available for ${seatType.name}`);
                }

                // Créer les entrées de sièges réservés
                await tx.seat.create({
                    data: {
                        crossingId,
                        seatTypeId,
                        bookedSeats: quantity,
                        reservationId: reservation.id,
                    },
                });
            }
        });
    } catch (error) {
        console.error("Reservation failed:", error);
        throw new Error("Reservation failed");
    }
}
