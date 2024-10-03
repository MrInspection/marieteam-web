"use server"


import { Sector } from "@prisma/client"
import {prisma} from "@/lib/db";

export async function getZones(): Promise<Sector[]> {
    try {
        const zones = await prisma.route.findMany({
            select: {
                sector: true
            },
            distinct: ['sector']
        })
        return zones.map(zone => zone.sector)
    } catch (error) {
        console.error("Error fetching zones:", error)
        throw new Error("Failed to fetch zones")
    }
}

export async function getRoutes() {
    try {
        const routes = await prisma.route.findMany({
            select: {
                id: true,
                departure: true,
                arrival: true
            }
        })
        return routes
    } catch (error) {
        console.error("Error fetching routes:", error)
        throw new Error("Failed to fetch routes")
    }
}
