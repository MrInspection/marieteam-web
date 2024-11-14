import {BoatsManagement} from "@/app/(admin)/admin/booking-system/bs-boats"
import {prisma} from "@/lib/db"
import {RoutesManagement} from "@/app/(admin)/admin/booking-system/bs-routes";
import {CrossingManagement} from "@/app/(admin)/admin/booking-system/bs.crossings";

export default async function ShipsPage() {
  const boats = await prisma.boat.findMany({
    select: {
      id: true,
      name: true,
      speed: true,
      width: true,
      length: true,
      equipment: true,
    }
  })
  const routes = await prisma.route.findMany()
  const crossings = await prisma.crossing.findMany()

  return (
    <>
      <h1 className="text-3xl font-bold">Booking System</h1>
      <p className="max-md:text-sm mb-8 mt-1.5">Manage everything related to the booking system to make it work.</p>
      <BoatsManagement boats={boats}/>
      <RoutesManagement routes={routes}/>
      <CrossingManagement crossings={crossings} boats={boats} routes={routes}/>
    </>
  )
}
