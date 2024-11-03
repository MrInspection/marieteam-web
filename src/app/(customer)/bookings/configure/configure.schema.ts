import {z} from "zod";

const seatSelectionSchema = z.object({
  seatTypeId: z.string().cuid(),
  bookedSeats: z.number().int().min(1),
});

export const configureSeatSchema = z.object({
  crossingId: z.string().cuid(),
  selectedSeats: z.array(seatSelectionSchema),
});
