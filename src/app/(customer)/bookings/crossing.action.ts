"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CrossingSchema, CrossingSearch } from "./crossing.schema";
import {GeographicalZone} from "@prisma/client";

export async function getRoutes(zone: GeographicalZone) {
  try {
    return await prisma.route.findMany({
      where: {
        geographicalZone: zone,
      },
      select: {
        id: true,
        departurePort: true,
        arrivalPort: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch routes");
  }
}

export async function searchCrossings(search: CrossingSearch) {
  try {
    const { zone, date, routeId } = search;

    const crossings = await prisma.crossing.findMany({
      where: {
        route: {
          id: routeId,
          geographicalZone: zone,
        },
        departureTime: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        boat: {
          include: {
            categoryCapacities: {
              include: {
                seatCategory: true,
              },
            },
          },
        },
        route: true,
        seatAvailability: {
          include: {
            seatType: {
              include: {
                seatCategory: true,
              },
            },
          },
        },
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
        categoryCapacities: crossing.boat.categoryCapacities.map((capacity) => ({
          seatCategory: capacity.seatCategory.name,
          maxCapacity: capacity.maxCapacity,
        })),
      },
      route: {
        id: crossing.route.id,
        distance: crossing.route.distance,
        departurePort: crossing.route.departurePort,
        arrivalPort: crossing.route.arrivalPort,
        geographicalZone: crossing.route.geographicalZone,
      },
      seatAvailability: crossing.seatAvailability.map((seat) => {
        const capacity = crossing.boat.categoryCapacities.find(
            (capacity) => capacity.seatCategory.name === seat.seatType.seatCategory.name
        )?.maxCapacity;

        return {
          seatType: seat.seatType.name,
          seatCategory: seat.seatType.seatCategory.name,
          bookedSeats: seat.bookedSeats,
          quantity: seat.bookedSeats,
          capacityMax: capacity ?? 0,
        };
      }),
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
