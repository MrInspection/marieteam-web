"use server"

import {prisma} from "@/lib/db";

type BoatProps = {
    name: string;
    length: number;
    width: number;
    speed: number;
    imageUrl?: string;
    equipment: string[];
}

/**
 * Register a new boat in the database.
 * @param boat - The details of the boat to register.
 * @returns The created boat or an error if validation fails.
 */

export async function RegisterBoat(boat: BoatProps) {
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