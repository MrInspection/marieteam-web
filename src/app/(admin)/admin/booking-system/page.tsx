import { BoatsManagement } from "@/app/(admin)/admin/booking-system/bs-boats"
import { prisma } from "@/lib/db"
import {RoutesManagement} from "@/app/(admin)/admin/booking-system/bs-routes";

export default async function ShipsPage() {
    const boats = await prisma.boat.findMany()
    const routes = await prisma.route.findMany()

    return (
        <>
            <h1 className="text-4xl font-bold">Booking System</h1>
            <p className="mb-8">Manage everything related to the booking system to make it work.</p>
            {/* @ts-expect-error not taking into consideration some props elements */}
            <BoatsManagement boats={boats} />
            <RoutesManagement routes={routes} />
        </>
    )
}
