"use server"

import {prisma} from "@/lib/db";
import {BoatInput, Crossing, CrossingInput, Route, RouteInput} from "@/app/admin/booking-system/booking-system.schema";

export async function getBoats() {
  return await prisma.boat.findMany({
    select: {
      id: true,
      name: true,
      speed: true,
      width: true,
      length: true,
      equipment: true,
    }
  })
}

export async function addBoat(boat: BoatInput) {
  try {
    await prisma.boat.create({
      data: {
        name: boat.name,
        length: boat.length,
        width: boat.width,
        speed: boat.speed,
        imageUrl: boat.imageUrl,
        equipment: boat.equipment,
      },
    });
  } catch (error) {
    console.error(error)
    throw new Error("Failed to register boat");
  }
}

export async function getRoutes() {
  return await prisma.route.findMany()
}

export async function addRoute(route: RouteInput) {
  try {
    await prisma.route.create({
      data: {
        distance: route.distance,
        departurePort: route.departurePort,
        arrivalPort: route.arrivalPort,
        geographicalZone: route.geographicalZone,
      },
    });
  } catch (error) {
    console.error(error)
    throw new Error("Failed to register route");
  }
}

export async function updateRoute(id: string, route: Route) {
  try {
    const updatedRoute = await prisma.route.update({
      where: {
        id: id,
      },
      data: {
        distance: route.distance,
        departurePort: route.departurePort,
        arrivalPort: route.arrivalPort,
        geographicalZone: route.geographicalZone,
      },
    });
    return updatedRoute
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update route");
  }
}

export async function RegisterCrossing(crossing: CrossingInput) {
  try {
    await prisma.crossing.create({
      data: {
        departureTime: crossing.departureTime,
        boatId: crossing.boatId,
        routeId: crossing.routeId,
      },
    });
  } catch (error) {
    console.error(error)
    throw new Error("Failed to register crossing");
  }
}

export async function UpdateCrossing(id: string, crossing: Crossing) {
  try {
    await prisma.crossing.update({
      where: {
        id: id,
      },
      data: {
        departureTime: crossing.departureTime,
        boatId: crossing.boatId,
        routeId: crossing.routeId,
      },
    });
    return crossing;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update crossing");
  }
}
