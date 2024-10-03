import { z } from "zod"

export const CrossingSearchSchema = z.object({
    zone: z.enum(["AIX", "BATZ", "BELLE_ILE_EN_MER", "BREHAT", "HOUAT", "ILE_DE_GROIX", "MOLENE", "OUESSANT", "SEIN", "YEU"]),
    date: z.coerce.date(),
    routeId: z.string()
})

export const SeatTypeSchema = z.enum(["PASSENGER", "VEHICLE_UNDER_2M", "VEHICLE_OVER_2M"])

export const SeaConditionSchema = z.enum(["CALM", "SLIGHTLY_ROUGH", "ROUGH", "VERY_ROUGH"])

export const CrossingSchema = z.object({
    id: z.string(),
    departureTime: z.date(),
    boat: z.object({
        id: z.string(),
        name: z.string(),
        length: z.number(),
        width: z.number(),
        speed: z.number(),
        equipment: z.array(z.string())
    }),
    route: z.object({
        id: z.string(),
        distance: z.number(),
        departure: z.string(),
        arrival: z.string(),
        sector: z.enum(["AIX", "BATZ", "BELLE_ILE_EN_MER", "BREHAT", "HOUAT", "ILE_DE_GROIX", "MOLENE", "OUESSANT", "SEIN", "YEU"])
    }),
    seats: z.array(z.object({
        type: SeatTypeSchema,
        available: z.number(),
        capacity: z.number()
    })),
    delayMinutes: z.number().optional(),
    seaCondition: SeaConditionSchema
})

export type CrossingSearch = z.infer<typeof CrossingSearchSchema>
export type Crossing = z.infer<typeof CrossingSchema>
