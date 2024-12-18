import {z} from "zod";
import {GeographicalZone} from "@prisma/client";

export const BoatInputSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
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
  equipment: z.array(z.string()).min(1, {
    message: "At least one equipment is required",
  }),
})
export const BoatSchema = BoatInputSchema.extend({
  id: z.string().cuid(),
});

export type BoatInput = z.infer<typeof BoatInputSchema>;
export type Boat = z.infer<typeof BoatSchema>;

export const RouteInputSchema = z.object({
  distance: z.number().positive().min(5, {
    message: "Distance must be at least 5 meters",
  }),
  departurePort: z.string().min(3, {
    message: "Departure port must be at least 3 characters long",
  }),
  arrivalPort: z.string().min(3, {
    message: "Arrival port must be at least 3 characters long",
  }),
  geographicalZone: z.nativeEnum(GeographicalZone, {
    message: "Please select a geographical zone",
  }),
});
export const RouteSchema = RouteInputSchema.extend({
  id: z.string().cuid(),
});

export type RouteInput = z.infer<typeof RouteInputSchema>;
export type Route = z.infer<typeof RouteSchema>;

export const CrossingInputSchema = z.object({
  departureTime: z.date({
    message: "Please select a departure date and time",
  }),
  boatId: z.string().cuid({
    message: "Please select a boat",
  }),
  routeId: z.string().cuid({
    message: "Please select a route",
  }),
})
export const CrossingSchema = CrossingInputSchema.extend({
  id: z.string().cuid(),
});

export type CrossingInput = z.infer<typeof CrossingInputSchema>;
export type Crossing = z.infer<typeof CrossingSchema>;
