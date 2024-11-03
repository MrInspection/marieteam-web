import {addMinutes, format} from "date-fns";
import {
  Anchor,
  Clock, Tag,
  Waves,
} from "lucide-react";
import {Crossing} from "@/app/(customer)/bookings/crossing.schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {cn} from "@/lib/utils";
import {formatName, getSeaConditionInfo} from "@/utils/text-formatter";
import Image from "next/image";

type TripDetailsProps = {
  crossing: Crossing;
}

export function CrossingDetails({crossing}: TripDetailsProps) {
  const captainLog = crossing.captainLogs?.[0];
  const delayMinutes = captainLog?.delayMinutes || 0;
  const seaCondition = captainLog?.seaCondition || "CALM";
  const adjustedDepartureTime = addMinutes(crossing.departureTime, delayMinutes);

  return (
    <div className="space-y-4">
      <Image
        width={400}
        height={400}
        src={`${crossing.boat.imageUrl}`}
        alt={crossing.boat.name}
        className="rounded-xl w-full aspect-video border-2"
        draggable={false}
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              <section className="border-2 rounded-lg p-3">
                <h4 className="text-xs text-muted-foreground">Length</h4>
                <p className="text-sm font-medium text-foreground">
                  {crossing.boat.length} meters
                </p>
              </section>
              <section className="border-2 rounded-lg p-3">
                <h4 className="text-xs text-muted-foreground">Width</h4>
                <p className="text-sm font-medium text-foreground">
                  {crossing.boat.width} meters
                </p>
              </section>
              <section className="border-2 rounded-lg p-3">
                <h4 className="text-xs text-muted-foreground">Speed</h4>
                <p className="text-sm font-medium text-foreground">
                  {crossing.boat.speed} knots
                </p>
              </section>
              <section className="border-2 rounded-lg p-3">
                <h4 className="text-xs text-muted-foreground">Capacity</h4>
                <p className="text-sm font-medium text-foreground">
                  {crossing.boat.categoryCapacities.reduce(
                    (total, capacity) => total + capacity.maxCapacity,
                    0
                  )}{" "}
                  passengers
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
              <h4 className="text-xs text-muted-foreground">Departure</h4>
              <p className="text-sm font-medium">{crossing.route.departurePort}</p>
            </section>
            <div className="flex-grow mx-4 flex items-center">
              <div className="h-px bg-foreground flex-grow"/>
              <Anchor className="h-4 w-4 mx-2"/>
              <div className="h-px bg-foreground flex-grow"/>
            </div>
            <section>
              <h4 className="text-xs text-muted-foreground">Arrival</h4>
              <p className="text-sm font-medium">{crossing.route.arrivalPort}</p>
            </section>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
            <h3 className="text-xs text-muted-foreground">Departure Time</h3>
            <section className="flex items-center gap-2">
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
                  {format(adjustedDepartureTime, "HH:mm")}
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
              <Waves className="w-4 h-4"/>
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
                  <Clock className="w-4 h-4"/>
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
        <p className="font-semibold text-sm text-muted-foreground">Available Seats</p>
        <p className="text-xs text-muted-foreground">
          The amount of seats available for booking
        </p>
        <div className={"grid space-y-0.5 mt-3"}>
          {crossing.boat.categoryCapacities.map((category) => {
            const availableSeats = category.maxCapacity - category.bookedSeats;

            return (
              <div className="flex items-center" key={category.seatCategory}>
                <Tag className="size-4 mr-2"/>
                <p className="text-sm">
                  {formatName(category.seatCategory)}:{" "}
                  <span className="font-bold">
                    {availableSeats > 0 ? (
                      `${availableSeats} available`
                    ) : (
                      <span className="text-red-500 font-bold">FULL CAPACITY</span>
                    )}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
