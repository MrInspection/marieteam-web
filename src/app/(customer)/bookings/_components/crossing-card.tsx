import {format} from "date-fns";
import {Anchor, Clock, Users, Waves} from "lucide-react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Crossing} from "@/app/(customer)/bookings/crossing.schema";
import {getSeaConditionInfo} from "@/utils/text-formatter";

type TripCardProps = {
  crossing: Crossing;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function CrossingCard({crossing, isSelected, onSelect}: TripCardProps) {
  const captainLog = crossing.captainLogs?.[0];
  const delayMinutes = captainLog?.delayMinutes;
  const seaCondition = captainLog?.seaCondition || "CALM";

  // Check if all seat categories are fully booked
  const isFullyBooked = crossing.boat.categoryCapacities.every(
    (category) => category.availableSeats <= 0
  );

  // Calculate total available seats
  const totalAvailableSeats = crossing.boat.categoryCapacities.reduce(
    (total, category) => total + category.availableSeats,
    0
  );

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
              ? "opacity-60 dark:opacity-50 cursor-not-allowed" // Disable hover effect for fully booked
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
            <div className="flex-grow mx-4 flex items-center">
              <div className="h-px bg-foreground flex-grow"/>
              <Anchor className="size-8 mx-2"/>
              <div className="h-px bg-foreground flex-grow"/>
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
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    delayMinutes && delayMinutes > 0
                      ? "line-through text-muted-foreground"
                      : "",
                    "text-sm font-medium"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4"/>
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
                  <TooltipTrigger className="hover:cursor-help">
                    <div
                      className={`flex items-center space-x-1 ${
                        getSeaConditionInfo(seaCondition).color
                      }`}
                    >
                      <Waves className="w-4 h-4"/>
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
                <div className="text-muted-foreground font-medium flex items-center gap-2">
                  {totalAvailableSeats} <Users className="size-4"/>
                </div>
              )}
            </div>
          </section>
        </div>
      </Label>
    </div>
  );
}
