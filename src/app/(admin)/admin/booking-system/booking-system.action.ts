"use server"

import {prisma} from "@/lib/db";
import {
    BoatInput,
    Crossing,
    CrossingInput,
    Route,
    RouteInput
} from "@/app/(admin)/admin/booking-system/booking-system.schema";

/**
 * Register a new boat in the database.
 * @param boat - The details of the boat to register.
 * @returns The created boat or an error if validation fails.
 */

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
    }
}

/**
 *  Register a new route in the database.
 * @param route - The details of the route to register.
 * @returns The created route or an error if validation fails.
 */

export async function RegisterRoute(route: RouteInput) {
    try {
        const newRoute = await prisma.route.create({
            data: {
                distance: route.distance,
                departurePort: route.departurePort,
                arrivalPort: route.arrivalPort,
                geographicalZone: route.geographicalZone,
            },
        });
        return newRoute;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to register route");
    }
}

/**
 * Update a route in the database.
 * @param id
 * @param route - The details of the route to update.
 * @returns The updated route or an error if validation fails.
 */

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
        return updatedRoute;
    } catch (error) {
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
        throw new Error("Failed to update crossing");
    }
}