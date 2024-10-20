import { z } from 'zod'

export const configureSeatsSchema = z.object({
    crossingId: z.string(),
    selectedSeats: z.record(z.string(), z.number().int().min(0))
})

export type ConfigureSeatsInput = z.infer<typeof configureSeatsSchema>
