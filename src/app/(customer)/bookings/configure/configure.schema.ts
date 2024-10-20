import { z } from "zod";

const seatSelectionSchema = z.object({
    seatTypeId: z.string().cuid(), // Assurez-vous que l'ID est un cuid
    bookedSeats: z.number().int().min(1, "La quantité de sièges doit être d'au moins 1"),
});

export const configureSeatSchema = z.object({
    crossingId: z.string().cuid(), // Assurez-vous que le crossingId est également un cuid
    selectedSeats: z.array(seatSelectionSchema),
});

export type ConfigureSeatInput = z.infer<typeof configureSeatSchema>;
