"use server";

import { CrossingSearch, CrossingSchema } from "./crossing.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function searchCrossings(search: CrossingSearch) {
  try {
    const { zone, date, routeId } = search;

    const crossings = await prisma.crossing.findMany({
      where: {
        route: {
          id: routeId,
          sector: zone,
        },
        departureTime: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        boat: true,
        route: true,
        seatAvailability: true,
        pricing: true,
        captainLogs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const formattedCrossings = crossings.map((crossing) => ({
      id: crossing.id,
      departureTime: crossing.departureTime,
      boat: {
        id: crossing.boat.id,
        name: crossing.boat.name,
        length: crossing.boat.length,
        width: crossing.boat.width,
        speed: crossing.boat.speed,
        imageUrl: crossing.boat.imageUrl,
        equipment: crossing.boat.equipment,
      },
      route: {
        id: crossing.route.id,
        distance: crossing.route.distance,
        departurePort: crossing.route.departurePort,
        arrivalPort: crossing.route.arrivalPort,
        sector: crossing.route.sector,
      },
      totalPassengerSeats: crossing.totalPassengerSeats,
      totalVehicleUnder2M: crossing.totalVehicleUnder2M,
      totalVehicleOver2M: crossing.totalVehicleOver2M,
      seatAvailability: crossing.seatAvailability.map((seat) => ({
        seatType: seat.seatType,
        bookedSeats: seat.bookedSeats,
        quantity: seat.quantity,
      })),
      pricing: crossing.pricing.map((price) => ({
        seatType: price.seatType,
        seatGroup: price.seatGroup,
        period: price.period,
        amount: price.amount,
      })),
      captainLogs: crossing.captainLogs.map((log) => ({
        seaCondition: log.seaCondition,
        delayMinutes: log.delayMinutes,
        delayReason: log.delayReason,
      })),
    }));

    const validatedCrossings = formattedCrossings.map((crossing) =>
      CrossingSchema.parse(crossing)
    );

    revalidatePath("/");
    return validatedCrossings;
  } catch (error) {
    console.error("Error searching crossings:", error);
    throw new Error("Failed to search crossings");
  }
}


