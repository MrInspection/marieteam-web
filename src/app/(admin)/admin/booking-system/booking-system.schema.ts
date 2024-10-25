import { z } from "zod";

export const BoatSchema = z.object({
    name: z.string(),
    length: z.number().positive().min(5, {
        message: "Length must be at least 5 meters",
    }),
    width: z.number().positive().min(5, {
        message: "Width must be at least 5 meters",
    }),
    speed: z.number().positive().min(1, {
        message: "Speed must be at least 1 knot",
    }),
    imageUrl: z.string().url().optional(),
    equipment: z.array(z.string()),
})

export type Boat = z.infer<typeof BoatSchema>;