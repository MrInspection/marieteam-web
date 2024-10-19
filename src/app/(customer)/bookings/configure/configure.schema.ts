import { z } from "zod";

export const configureSeatsSchema = z.object({
    crossingId: z.string().cuid(),
    totalAmount: z.number(),
    selectedSeats: z
        .array(
            z.object({
                seatTypeId: z.string().cuid(),
                seatCount: z.number().min(1),
            })
        )
        .nonempty("You must select at least one seat"),
});

export type ConfigureSeatsInput = z.infer<typeof configureSeatsSchema>;
