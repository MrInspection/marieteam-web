import { format } from "date-fns";
import { ArrowRight, Anchor, Clock, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Crossing } from "@/app/(customer)/bookings/crossing.schema";
import { SeaCondition } from "@prisma/client";

interface TripCardProps {
  crossing: Crossing;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function CrossingCard({
                               crossing,
                               isSelected,
                               onSelect,
                             }: TripCardProps) {
  const getSeaConditionInfo = (condition: SeaCondition) => {
    switch (condition) {
      case "CALM":
        return {
          color: "text-green-500",
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
  const delayMinutes = captainLog?.delayMinutes;
  const seaCondition = captainLog?.seaCondition || "CALM";

  // Récupérer les capacités maximales pour les différentes catégories de sièges
  const getCapacityForCategory = (categoryName: string) => {
    const capacity = crossing.boat.categoryCapacities.find(
        (capacity) => capacity.seatCategory === categoryName
    );
    return capacity ? capacity.maxCapacity : 0;
  };

  // Check available seats
  const passengerSeat = crossing.seatAvailability.find(
      (seat) => seat.seatCategory === "PASSENGER"
  );
  const vehicleUnder2mSeat = crossing.seatAvailability.find(
      (seat) => seat.seatCategory === "VEHICLE_UNDER_2M"
  );
  const vehicleOver2mSeat = crossing.seatAvailability.find(
      (seat) => seat.seatCategory === "VEHICLE_OVER_2M"
  );

  const isPassengerFull = passengerSeat
      ? passengerSeat.bookedSeats >= getCapacityForCategory("PASSENGER")
      : getCapacityForCategory("PASSENGER") <= 0;

  const isVehicleUnder2mFull = vehicleUnder2mSeat
      ? vehicleUnder2mSeat.bookedSeats >= getCapacityForCategory("VEHICLE_UNDER_2M")
      : getCapacityForCategory("VEHICLE_UNDER_2M") <= 0;

  const isVehicleOver2mFull = vehicleOver2mSeat
      ? vehicleOver2mSeat.bookedSeats >= getCapacityForCategory("VEHICLE_OVER_2M")
      : getCapacityForCategory("VEHICLE_OVER_2M") <= 0;

  const isFullyBooked =
      isPassengerFull && isVehicleUnder2mFull && isVehicleOver2mFull;

  // Calculate available seats
  const totalAvailableSeats = (() => {
    const availablePassengers = passengerSeat
        ? getCapacityForCategory("PASSENGER") - passengerSeat.bookedSeats
        : getCapacityForCategory("PASSENGER");

    const availableUnder2m = vehicleUnder2mSeat
        ? getCapacityForCategory("VEHICLE_UNDER_2M") - vehicleUnder2mSeat.bookedSeats
        : getCapacityForCategory("VEHICLE_UNDER_2M");

    const availableOver2m = vehicleOver2mSeat
        ? getCapacityForCategory("VEHICLE_OVER_2M") - vehicleOver2mSeat.bookedSeats
        : getCapacityForCategory("VEHICLE_OVER_2M");

    return availablePassengers + availableUnder2m + availableOver2m;
  })();

  return (
      <div>
        <input
            type="radio"
            id={crossing.id}
            name="trip"
            value={crossing.id}
            className="sr-only"
            onChange={() => !isFullyBooked && onSelect(crossing.id)}
            disabled={isFullyBooked}
        />
        <Label
            htmlFor={crossing.id}
            className={cn(
                "flex flex-col rounded-2xl border-2 p-4 cursor-pointer transition-all overflow-hidden group bg-background",
                isSelected
                    ? "bg-emerald-50 border-emerald-500 dark:bg-emerald-700/15 dark:border-emerald-700 border-2 shadow-md"
                    : isFullyBooked
                        ? "opacity-50 cursor-not-allowed" // Disable hover effect for fully booked
                        : "hover:ring-2 ring-emerald-500 dark:ring-emerald-700"
            )}
        >
          <div className="flex flex-col space-y-4 w-full rounded-2xl p-4">
            <section className="flex items-center justify-between w-full pb-2.5">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Departure</div>
                <div className="font-semibold text-lg">
                  {crossing.route.departurePort}
                </div>
              </div>
              <div className="flex flex-col items-center flex-grow px-4">
                <div className="w-full h-0.5 bg-muted-foreground/60 relative">
                  <ArrowRight className="absolute top-1/2 -right-1 transform -translate-y-1/2 text-muted-foreground/60" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-1.5 rounded-full max-md:hidden">
                    <Anchor className="size-8 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Arrival</div>
                <div className="font-semibold text-lg">
                  {crossing.route.arrivalPort}
                </div>
              </div>
            </section>
            <section className="flex justify-between items-center pt-4 border-t-2">
              <div className="flex items-center space-x-4">
                <div className={"flex items-center gap-2"}>
                  <div
                      className={cn(
                          delayMinutes && delayMinutes > 0
                              ? "line-through text-muted-foreground"
                              : "",
                          "text-sm font-medium"
                      )}
                  >
                    <div className={"flex items-center gap-1.5"}>
                      <Clock className="w-4 h-4" />
                      {format(crossing.departureTime, "HH:mm")}
                    </div>
                  </div>
                  {delayMinutes && delayMinutes > 0 && (
                      <p className="text-sm font-bold text-orange-500">
                        {format(
                            new Date(
                                crossing.departureTime.getTime() + delayMinutes * 60000
                            ),
                            "HH:mm"
                        )}
                      </p>
                  )}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className={"hover:cursor-help"}>
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
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Sea condition: {getSeaConditionInfo(seaCondition).label}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                {isFullyBooked ? (
                    <div className="text-red-500 font-bold">Not bookable</div>
                ) : (
                    <div className="text-muted-foreground font-medium">
                      {totalAvailableSeats} available seats
                    </div>
                )}
              </div>
            </section>
          </div>
        </Label>
      </div>
  );
}
