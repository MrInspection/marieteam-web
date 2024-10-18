import { format } from "date-fns";
import {
  Anchor,
  Car,
  Clock,
  Truck,
  Users,
  Waves,
} from "lucide-react";
import { Crossing } from "@/app/(customer)/bookings/crossing.schema";
import { SeaCondition } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface TripDetailsProps {
  crossing: Crossing;
}

export function CrossingDetails({ crossing }: TripDetailsProps) {
  const getSeaConditionInfo = (condition: SeaCondition) => {
    switch (condition) {
      case "CALM":
        return {
          color: "text-emerald-500",
          bgColor: "bg-green-100",
          label: "Calm",
        };
      case "SLIGHTLY_ROUGH":
        return {
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          label: "Slightly Rough",
        };
      case "ROUGH":
        return {
          color: "text-orange-500",
          bgColor: "bg-orange-100",
          label: "Rough",
        };
      case "VERY_ROUGH":
        return {
          color: "text-purple-700",
          bgColor: "bg-purple-100",
          label: "Very Rough",
        };
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          label: "Unknown",
        };
    }
  };

  const captainLog = crossing.captainLogs?.[0];
  const delayMinutes = captainLog?.delayMinutes || 0;
  const seaCondition = captainLog?.seaCondition || "CALM";

  // Récupérer les capacités maximales pour les différentes catégories de sièges
  const getCapacityForCategory = (categoryName: string) => {
    const capacity = crossing.boat.categoryCapacities.find(
        (capacity) => capacity.seatCategory === categoryName
    );
    return capacity ? capacity.maxCapacity : 0;
  };

  return (
      <div className="space-y-4">
        <img
            src={crossing.boat.imageUrl || "/placeholder.svg"}
            alt={crossing.boat.name}
            className="rounded-xl w-full aspect-video border-2 grayscale"
        />
        <Accordion type="single" collapsible className={"mt-4"}>
          <AccordionItem
              value="delay-reason"
              className="rounded-lg bg-muted/80 dark:bg-muted/50 px-3 py-1.5 border-none"
          >
            <AccordionTrigger className="py-2 hover:no-underline">
              {crossing.boat.name}
            </AccordionTrigger>
            <AccordionContent className="text-sm pb-2 text-muted-foreground">
              <div className={"grid grid-cols-2 gap-2 mt-2"}>

                <section className={"border-2 rounded-lg p-3"}>
                  <h4 className={"text-xs text-muted-foreground"}>Length</h4>
                  <p className={"text-sm font-medium text-foreground"}>{crossing.boat.length} meters</p>
                </section>
                <section className={"border-2 rounded-lg p-3"}>
                  <h4 className={"text-xs text-muted-foreground"}>Width</h4>
                  <p className={"text-sm font-medium text-foreground"}>{crossing.boat.width} meters</p>
                </section>
                <section className={"border-2 rounded-lg p-3"}>
                  <h4 className={"text-xs text-muted-foreground"}>Speed</h4>
                  <p className={"text-sm font-medium text-foreground"}>{crossing.boat.speed} knots</p>
                </section>
                <section className={"border-2 rounded-lg p-3"}>
                  <h4 className={"text-xs text-muted-foreground"}>Capacity</h4>
                  <p className={"text-sm font-medium text-foreground"}>
                    {crossing.boat.categoryCapacities.reduce(
                        (total, capacity) => total + capacity.maxCapacity,
                        0
                    )} passengers
                   </p>
                </section>
              </div>
              <div className="border-2 rounded-lg p-3 mt-3">
                <p className="font-bold text-foreground mb-2">Equipments</p>
                {crossing.boat.equipment.map((equipment, index) => (
                    <div className="flex items-center gap-2 text-sm" key={index}>
                      <li>{equipment}</li>
                    </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <section>
          <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center justify-between mt-1">
              <section>
                <h4 className={"text-xs text-muted-foreground"}>Departure</h4>
                <p className={"text-sm font-medium"}>
                  {crossing.route.departurePort}
                </p>
              </section>
              <div className="flex-grow mx-4 flex items-center">
                <div className="h-px bg-foreground flex-grow" />
                <Anchor className="h-4 w-4 mx-2" />
                <div className="h-px bg-foreground flex-grow" />
              </div>
              <section>
                <h4 className={"text-xs text-muted-foreground"}>Arrival</h4>
                <p className={"text-sm font-medium"}>
                  {crossing.route.arrivalPort}
                </p>
              </section>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
              <h3 className="text-xs text-muted-foreground">Departure Time</h3>
              <section className={"flex items-center gap-2"}>
                <p
                    className={cn(
                        delayMinutes > 0 ? "line-through text-muted-foreground" : "",
                        "font-medium"
                    )}
                >
                  {format(crossing.departureTime, "HH:mm")}
                </p>
                {delayMinutes > 0 && (
                    <p className="font-bold text-orange-500">
                      {format(
                          new Date(
                              crossing.departureTime.getTime() + delayMinutes * 60000
                          ),
                          "HH:mm"
                      )}
                    </p>
                )}
              </section>
            </div>
            <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Sea Condition</p>
              <div
                  className={`flex items-center space-x-1 ${
                      getSeaConditionInfo(seaCondition).color
                  }`}
              >
                <Waves className="w-4 h-4" />
                <span className="text-sm">
                {getSeaConditionInfo(seaCondition).label}
              </span>
              </div>
            </div>
          </div>
          {delayMinutes > 0 && (
              <Accordion type="single" collapsible className={"mt-3"}>
                <AccordionItem
                    value="delay-reason"
                    className="rounded-lg bg-orange-600/10 px-3 py-1.5 border-none"
                >
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center gap-2 text-orange-500 font-bold">
                      <Clock className="w-4 h-4" />
                      {delayMinutes} minutes delay
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm pb-2 text-muted-foreground">
                    {captainLog?.delayReason || "No reason provided."}{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          )}
        </section>
        <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
          <p className="font-semibold text-sm text-muted-foreground">
            Available Seats
          </p>
          <p className={"text-xs text-muted-foreground"}>
            The amount of seats available for booking
          </p>
          <div className={"grid space-y-0.5 mt-3"}>
            <div className={"flex items-center"}>
              <Users className={"size-4 mr-2"} />
              <p className="text-sm">
                Passenger:{" "}
                <span className="font-bold">
                {(() => {
                  const passengerSeat = crossing.seatAvailability.find(
                      (seat) => seat.seatCategory === "PASSENGER"
                  );
                  const availableSeats = passengerSeat
                      ? getCapacityForCategory("PASSENGER") -
                      (passengerSeat.bookedSeats || 0)
                      : getCapacityForCategory("PASSENGER");

                  return availableSeats > 0 ? (
                      availableSeats + " available"
                  ) : (
                      <span className={"text-red-500 font-bold"}>
                      FULL CAPACITY
                    </span>
                  );
                })()}
              </span>
              </p>
            </div>
            <div className={"flex items-center"}>
              <Car className={"size-4 mr-2"} />
              <p className="text-sm">
                Vehicle Under 2m:{" "}
                <span className={"font-bold"}>
                {(() => {
                  const vehicleUnder2mSeat = crossing.seatAvailability.find(
                      (seat) => seat.seatCategory === "VEHICLE_UNDER_2M"
                  );
                  const availableSeats = vehicleUnder2mSeat
                      ? getCapacityForCategory("VEHICLE_UNDER_2M") -
                      (vehicleUnder2mSeat.bookedSeats || 0)
                      : getCapacityForCategory("VEHICLE_UNDER_2M");

                  return availableSeats > 0 ? (
                      availableSeats + " available"
                  ) : (
                      <span className={"text-red-500 font-bold"}>
                      FULL CAPACITY
                    </span>
                  );
                })()}
              </span>
              </p>
            </div>
            <div className={"flex items-center"}>
              <Truck className={"size-4 mr-2"} />
              <p className="text-sm">
                Vehicle Over 2m:{" "}
                <span className={"font-bold"}>
                {(() => {
                  const vehicleOver2mSeat = crossing.seatAvailability.find(
                      (seat) => seat.seatCategory === "VEHICLE_OVER_2M"
                  );
                  const availableSeats = vehicleOver2mSeat
                      ? getCapacityForCategory("VEHICLE_OVER_2M") -
                      (vehicleOver2mSeat.bookedSeats || 0)
                      : getCapacityForCategory("VEHICLE_OVER_2M");

                  return availableSeats > 0 ? (
                      availableSeats + " available"
                  ) : (
                      <span className={"text-red-500 font-bold"}>
                      FULL CAPACITY
                    </span>
                  );
                })()}
              </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
