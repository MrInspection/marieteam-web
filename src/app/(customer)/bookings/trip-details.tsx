import { format } from "date-fns"
import { Anchor} from "lucide-react"
import {Crossing} from "@/app/(customer)/bookings/crossing.schema";
import {SeaCondition} from "@prisma/client";

interface TripDetailsProps {
    crossing: Crossing
}

export function TripDetails({ crossing }: TripDetailsProps) {
    const getSeaConditionInfo = (condition: SeaCondition) => {
        switch (condition) {
            case "CALM":
                return { color: "text-green-500", bgColor: "bg-green-100", label: "Calm" }
            case "SLIGHTLY_ROUGH":
                return { color: "text-yellow-500", bgColor: "bg-yellow-100", label: "Slightly Rough" }
            case "ROUGH":
                return { color: "text-orange-500", bgColor: "bg-orange-100", label: "Rough" }
            case "VERY_ROUGH":
                return { color: "text-purple-700", bgColor: "bg-purple-100", label: "Very Rough" }
            default:
                return { color: "text-gray-500", bgColor: "bg-gray-100", label: "Unknown" }
        }
    }

    return (
        <div className="space-y-4">
            <div className="border-2 p-2 rounded-2xl">
                <img src="https://www.talamare.fr/medias/501-yacht-columbus-40s.jpg" alt={crossing.boat.name}
                     className="rounded-xl w-full aspect-video border-2 grayscale" />
                <div className="flex items-center space-x-2 border-2 px-4 py-2 rounded-xl mt-2">
                    <Anchor className="size-4" />
                    <span className="font-semibold text-sm">{crossing.boat.name}</span>
                </div>
            </div>

            <section className="grid grid-cols-2 gap-2">
                <div className="border-2 py-2 px-3 rounded-xl">
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="font-medium">{crossing.route.departure}</p>
                </div>
                <div className="border-2 py-2 px-3 rounded-xl">
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p className="font-bold">{crossing.route.arrival}</p>
                </div>
                <div className="border-2 py-2 px-3 rounded-xl">
                    <p className="text-sm text-muted-foreground">Departure Time</p>
                    <p className="font-medium">{format(crossing.departureTime, "HH:mm")}</p>
                </div>
                <div className="border-2 py-2 px-3 rounded-xl">
                    <p className="text-sm text-muted-foreground">Sea Condition</p>
                    <p className="font-medium">{getSeaConditionInfo(crossing.seaCondition).label}</p>
                </div>
            </section>

            <div>
                <h4 className="font-semibold mb-2">Available Seats:</h4>
                <div className="grid grid-cols-2 gap-2">
                    {crossing.seats.map((seat) => (
                        <div key={seat.type} className="border-2 py-2 px-3 rounded-xl">
                            <p className="text-sm text-muted-foreground">{seat.type}: {seat.available}/{seat.capacity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
