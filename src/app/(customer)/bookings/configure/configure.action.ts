'use server'

import { prisma } from "@/lib/db"
import { configureSeatsSchema, type ConfigureSeatsInput } from './configure.schema'

export async function configureSeatAction(crossingId: string, selectedSeats: Record<string, number>) {
    const input: ConfigureSeatsInput = { crossingId, selectedSeats }
    const validatedInput = configureSeatsSchema.parse(input)

    const crossing = await prisma.crossing.findUnique({
        where: { id: validatedInput.crossingId },
        include: {
            seatAvailability: {
                include: {
                    seatType: {
                        include: {
                            Pricing: true
                        }
                    }
                }
            }
        }
    })

    if (!crossing) {
        throw new Error('Crossing not found')
    }

    let totalAmount = 0

    for (const [seatTypeId, quantity] of Object.entries(validatedInput.selectedSeats)) {
        const seatAvailability = crossing.seatAvailability.find(sa => sa.seatTypeId === seatTypeId)
        if (!seatAvailability) {
            throw new Error(`Seat type ${seatTypeId} not available for this crossing`)
        }

        if (seatAvailability.bookedSeats + quantity > seatAvailability.seatType.Pricing[0].amount) {
            throw new Error(`Not enough seats available for seat type ${seatTypeId}`)
        }

        totalAmount += seatAvailability.seatType.Pricing[0].amount * quantity
    }

    const reservation = await prisma.reservation.create({
        data: {
            userId: 'user-id', // Replace with actual user ID from authentication
            totalAmount,
            seats: {
                create: Object.entries(validatedInput.selectedSeats).map(([seatTypeId, quantity]) => ({
                    crossingId: validatedInput.crossingId,
                    seatTypeId,
                    bookedSeats: quantity
                }))
            }
        }
    })

    return reservation
}