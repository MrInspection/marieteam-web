import { BoatsManagement } from "@/app/(admin)/admin/booking-system/bs-boats"
import { prisma } from "@/lib/db"

export default async function ShipsPage() {
    const boats = await prisma.boat.findMany()

    return (
        <>
            <h1 className="text-4xl font-bold">Booking System</h1>
            <p className="mb-8">Manage everything related to the booking system to make it work.</p>
            {/* @ts-expect-error not taking into consideration some props elements */}
            <BoatsManagement boats={boats} />
        </>
    )
}
