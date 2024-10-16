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

export function CrossingCard({ crossing, isSelected, onSelect }: TripCardProps) {
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

  return (
    <div>
      <input
        type="radio"
        id={crossing.id}
        name="trip"
        value={crossing.id}
        className="sr-only"
        onChange={() => onSelect(crossing.id)}
      />
      <Label
        htmlFor={crossing.id}
        className={cn(
          "flex flex-col rounded-2xl border-2 p-4 cursor-pointer transition-all overflow-hidden group bg-background",
          isSelected
            ? "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-700 shadow-md"
            : "hover:ring-2"
        )}
      >
        <div className="flex flex-col space-y-4 w-full rounded-2xl p-4">
          <div className="flex items-center justify-between w-full pb-2.5">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Departure</div>
              <div className="font-semibold text-lg">
                {crossing.route.departurePort}
              </div>
            </div>
            <div className="flex flex-col items-center flex-grow px-4">
              <div className="w-full h-0.5 bg-muted-foreground/60 relative">
                <ArrowRight className="absolute top-1/2 -right-1 transform -translate-y-1/2 text-muted-foreground/60" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-1.5 rounded-full">
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
          </div>

          <div className="flex justify-between items-center pt-4 border-t-2">
            <div className="flex items-center space-x-4">
              {/*<div className="flex items-center space-x-2">
                <Ship className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{crossing.boat.name}</span>
              </div>*/}
              <div
                className={cn(
                  delayMinutes && delayMinutes > 0
                    ? "line-through text-muted-foreground"
                    : "",
                  "text-sm font-medium"
                )}
              >
                {format(crossing.departureTime, "HH:mm")}
              </div>
              {delayMinutes && delayMinutes > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center space-x-1 text-red-700">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{delayMinutes} min late</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Expected delay: {delayMinutes} minutes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
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
          </div>
        </div>
      </Label>
    </div>
  );
}
