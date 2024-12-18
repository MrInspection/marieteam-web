import React from 'react'
import Image from 'next/image'
import {format} from 'date-fns'
import {Clock, Leaf} from 'lucide-react'
import {cn} from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {getSeaConditionInfo} from "@/utils/text-formatter"

type TripInformationProps = {
  boat: {
    name: string
    imageUrl: string | null
    length: number
    width: number
    speed: number
    categoryCapacities: { maxCapacity: number }[]
    equipment: string[]
  }
  route: {
    departurePort: string
    arrivalPort: string
  }
  departureTime: Date
  seaCondition: string
  delayMinutes: number
  delayReason?: string | null
}

export default function TripInformation({
                                          boat,
                                          route,
                                          departureTime,
                                          seaCondition,
                                          delayMinutes,
                                          delayReason
                                        }: TripInformationProps) {
  const adjustedDepartureTime = new Date(departureTime.getTime() + delayMinutes * 60000)

  return (
    <div className="lg:col-span-2">
      <h1 className="font-bold text-2xl">
        Information about your trip
      </h1>
      <p className="text-muted-foreground text-sm mt-0.5">
        Check the details of your trip and book your seats.
      </p>
      <div className="space-y-4 mt-8">
        <section className="grid lg:grid-cols-3 gap-3">
          <div className="border-2 rounded-2xl col-span-2 p-2">
            <Image
              width={400}
              height={400}
              src={boat.imageUrl || 'placeholder.svg'}
              alt="boat"
              className="max-lg:h-auto h-72 w-full rounded-xl"
              draggable={false}
              priority={true}
            />
          </div>
          <div className="grid gap-3 max-lg:grid-cols-2 w-full max-md:col-span-2">
            <div className="border-2 rounded-2xl px-4 py-3">
              <h4 className="text-xs text-muted-foreground">
                Transport Ship
              </h4>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {boat.name}
              </p>
            </div>
            <div className="border-2 rounded-2xl px-4 py-3">
              <h4 className="text-xs text-muted-foreground">
                Dimensions
              </h4>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {boat.length} m x {boat.width} m
              </p>
            </div>
            <div className="border-2 rounded-2xl px-4 py-3">
              <h4 className="text-xs text-muted-foreground">
                Nominal Speed
              </h4>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {boat.speed} knots
              </p>
            </div>
            <div className="border-2 rounded-2xl px-4 py-3">
              <h4 className="text-xs text-muted-foreground">
                Max. Capacity
              </h4>
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {boat.categoryCapacities.reduce(
                  (total, capacity) => total + capacity.maxCapacity,
                  0
                )} passengers
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-2 py-3 px-4 rounded-2xl max-md:col-span-2">
            <section>
              <h4 className="text-xs text-muted-foreground">
                Departure
              </h4>
              <p className="text-sm font-medium">
                {route.departurePort}
              </p>
            </section>
            <div className="flex-grow mx-4 flex items-center">
              <div className="h-px bg-foreground flex-grow"/>
              <div className="h-px bg-foreground flex-grow"/>
            </div>
            <section>
              <h4 className="text-xs text-muted-foreground text-right">
                Arrival
              </h4>
              <p className="text-sm font-medium text-right">
                {route.arrivalPort}
              </p>
            </section>
          </div>
          <div className="border-2 rounded-2xl px-4 py-3">
            <h4 className="text-xs text-muted-foreground">
              Departure Time
            </h4>
            <div className="flex items-center gap-1.5">
              <p className={cn(
                delayMinutes > 0 && "line-through text-muted-foreground",
                "font-medium"
              )}>
                {format(departureTime, "HH:mm")}
              </p>
              {delayMinutes > 0 && (
                <p className="font-bold text-orange-500">
                  {format(adjustedDepartureTime, "HH:mm")}
                </p>
              )}
            </div>
          </div>
          <div className="border-2 rounded-2xl px-4 py-3">
            <h4 className="text-xs text-muted-foreground">
              Sea Condition
            </h4>
            <p className={cn("text-sm font-medium text-foreground line-clamp-1", getSeaConditionInfo(seaCondition).color)}>
              {getSeaConditionInfo(seaCondition).label}
            </p>
          </div>

          {delayMinutes > 0 && (
            <Accordion
              type="single"
              collapsible
              className="col-span-2 lg:col-span-3"
            >
              <AccordionItem
                value="delay-reason"
                className="rounded-2xl bg-orange-600/10 px-3 py-1.5 border-none"
              >
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-center gap-2 text-orange-500 font-bold">
                    <Clock className="w-4 h-4"/>
                    {delayMinutes} minutes delay
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm pb-2 text-muted-foreground">
                  {delayReason || "No reason provided."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <div className="border-2 rounded-xl px-4 py-3 max-md:col-span-2 lg:col-span-2">
            <p className="font-bold text-foreground mb-2">Equipment</p>
            {boat.equipment.map((equipment, index) => (
              <div
                className="flex items-center gap-2 text-sm"
                key={index}
              >
                <li>{equipment}</li>
              </div>
            ))}
          </div>
          <div className="border-2 rounded-2xl px-4 py-3 flex items-center justify-center max-md:col-span-2 max-h-fit">
            <div className="space-y-2.5">
              <Leaf className="size-5 text-emerald-500"/>
              <p className="text-sm">
                We are taking actions to reduce the <strong>carbon footprint</strong> of our ships.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}