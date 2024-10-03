"use server"

import { CrossingSearch, CrossingSchema } from "./crossing.schema"
import { revalidatePath } from "next/cache"
import {prisma} from "@/lib/db";

export async function searchCrossings(search: CrossingSearch) {
    try {
        const { zone, date, routeId } = search

        const crossings = await prisma.crossing.findMany({
            where: {
                route: {
                    id: routeId,
                    sector: zone
                },
                departureTime: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999))
                }
            },
            include: {
                boat: true,
                route: true,
                seats: true,
                captainLogs: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            }
        })

        const formattedCrossings = crossings.map(crossing => ({
            id: crossing.id,
            departureTime: crossing.departureTime,
            boat: {
                id: crossing.boat.id,
                name: crossing.boat.name,
                length: crossing.boat.length,
                width: crossing.boat.width,
                speed: crossing.boat.speed,
                equipment: crossing.boat.equipment
            },
            route: {
                id: crossing.route.id,
                distance: crossing.route.distance,
                departure: crossing.route.departure,
                arrival: crossing.route.arrival,
                sector: crossing.route.sector
            },
            seats: crossing.seats.map(seat => ({
                type: seat.type,
                available: seat.available,
                capacity: seat.available // Assuming total capacity is the same as available for simplicity
            })),
            delayMinutes: crossing.captainLogs[0]?.delayMinutes,
            seaCondition: crossing.captainLogs[0]?.seaCondition || "CALM"
        }))

        const validatedCrossings = formattedCrossings.map(crossing => CrossingSchema.parse(crossing))

        revalidatePath("/")
        return validatedCrossings
    } catch (error) {
        console.error("Error searching crossings:", error)
        throw new Error("Failed to search crossings")
    }
}
