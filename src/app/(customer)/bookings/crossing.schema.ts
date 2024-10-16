import { z } from "zod";
import { Sector, SeatType, SeaCondition } from "@prisma/client";

export const CrossingSearchSchema = z.object({
  zone: z.nativeEnum(Sector),
  date: z.coerce.date(),
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
  }),
  route: z.object({
    id: z.string(),
    distance: z.number(),
    departurePort: z.string(),
    arrivalPort: z.string(),
    sector: z.nativeEnum(Sector),
  }),
  totalPassengerSeats: z.number(),
  totalVehicleUnder2M: z.number(),
  totalVehicleOver2M: z.number(),
  seatAvailability: z.array(
    z.object({
      seatType: z.nativeEnum(SeatType),
      bookedSeats: z.number(),
      quantity: z.number(),
    })
  ),
  pricing: z.array(
    z.object({
      seatType: z.nativeEnum(SeatType),
      seatGroup: z.enum([
        "ADULT",
        "JUNIOR",
        "CHILD",
        "VEHICLE_UNDER_4M",
        "VEHICLE_UNDER_5M",
        "VAN",
        "CAMPING_CAR",
        "TRUCK",
      ]),
      period: z.enum(["LOW_SEASON", "MID_SEASON", "HIGH_SEASON"]),
      amount: z.number(),
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
