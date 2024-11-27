import {z} from "zod";
import {GeographicalZone, SeaCondition} from "@prisma/client";

export const CrossingSearchSchema = z.object({
  zone: z.nativeEnum(GeographicalZone),
  date: z.date(),
  routeId: z.string(),
});

export const CrossingSchema = z.object({
  id: z.string(),
  departureTime: z.date(),
  boat: z.object({
    id: z.string(),
    name: z.string(),
    length: z.number(),
    width: z.number(),
    speed: z.number(),
    imageUrl: z.string().nullable(),
    equipment: z.array(z.string()),
    categoryCapacities: z.array(
      z.object({
        seatCategory: z.string(),
        maxCapacity: z.number(),
        bookedSeats: z.number(),
        availableSeats: z.number(),
      })
    ),
  }),
  route: z.object({
    id: z.string(),
    distance: z.number(),
    departurePort: z.string(),
    arrivalPort: z.string(),
    geographicalZone: z.nativeEnum(GeographicalZone),
  }),
  seatAvailability: z.array(
    z.object({
      seatType: z.string(),
      seatCategory: z.string(),
      bookedSeats: z.number(),
      quantity: z.number(),
      capacityMax: z.number(),
    })
  ),
  captainLogs: z
    .array(
      z.object({
        seaCondition: z.nativeEnum(SeaCondition),
        delayMinutes: z.number().optional(),
        delayReason: z.string().optional(),
      })
    )
    .optional(),
});

export type CrossingSearch = z.infer<typeof CrossingSearchSchema>;
export type Crossing = z.infer<typeof CrossingSchema>;
