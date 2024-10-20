import { z } from "zod";

// Schéma pour la validation des sièges sélectionnés
export const seatSelectionSchema = z.object({
    seatTypeId: z.string().min(1, "Seat type ID is required"),
    quantity: z.number().min(1, "At least one seat must be selected"),
});

export const reservationSchema = z.object({
    crossingId: z.string().min(1, "Crossing ID is required"),
    seats: z.array(seatSelectionSchema),
    totalAmount: z.number().min(0, "Total amount must be a positive number"),
});

// Schéma pour la validation de l'ID utilisateur
export const userIdSchema = z.string().min(1, "User ID is required");
