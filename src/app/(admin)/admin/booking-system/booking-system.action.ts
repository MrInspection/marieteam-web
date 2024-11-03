"use server"

import {prisma} from "@/lib/db";
import {
  BoatInput,
  Crossing,
  CrossingInput,
  Route,
  RouteInput
} from "@/app/(admin)/admin/booking-system/booking-system.schema";
import {revalidatePath} from "next/cache";

export async function RegisterBoat(boat: BoatInput) {
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
    throw new Error("Failed to register boat");
  } finally {
    revalidatePath("/admin/booking-system");
  }
}

export async function RegisterRoute(route: RouteInput) {
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
    throw new Error("Failed to register route");
  } finally {
    revalidatePath("/admin/booking-system");
  }
}

export async function UpdateRoute(id: string, route: Route) {
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
    throw new Error("Failed to update route");
  } finally {
    revalidatePath("/admin/booking-system");
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
    throw new Error("Failed to register crossing");
  } finally {
    revalidatePath("/admin/booking-system");
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
    throw new Error("Failed to update crossing");
  } finally {
    revalidatePath("/admin/booking-system");
  }
}
