import { prisma } from "@/lib/db";
import InvalidConfiguration from "@/app/(customer)/bookings/configure/not-found";
import { ConfigureSeats } from "@/app/(customer)/bookings/configure/configure-seats";
import {ChevronLeft, Clock, Leaf} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { addMinutes, format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSeaConditionInfo } from "@/app/(customer)/bookings/_components/utils";
import {ShareTripButton} from "@/app/(customer)/bookings/_components/share-crossing";
import Image from "next/image";

type ConfigurePageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ConfigurePage = async ({ searchParams }: ConfigurePageProps) => {
  const { trip } = searchParams;

  if (!trip || typeof trip !== "string") {
    return InvalidConfiguration();
  }

  const configureTrip = await prisma.crossing.findUnique({
    where: {
      id: trip,
    },
    include: {
      seatAvailability: {
        include: {
          seatType: {
            include: {
              seatCategory: true,
              Pricing: true, // Include pricing information
            },
          },
        },
      },
      boat: {
        include: {
          categoryCapacities: true,
        },
      },
      captainLogs: true,
      route: true,
    },
  });

  if (!configureTrip) {
    return InvalidConfiguration();
  }

  const seaCondition =
    configureTrip.captainLogs.length > 0
      ? configureTrip.captainLogs[0].seaCondition
      : "CALM";

  const delayMinutes =
    configureTrip.captainLogs.length > 0 &&
    configureTrip.captainLogs[0].delayMinutes
      ? configureTrip.captainLogs[0].delayMinutes
      : 0;

  const adjustedDepartureTime = addMinutes(
    configureTrip.departureTime,
    delayMinutes
  );

  return (
    <>
      <div className={"bg-muted/40"}>
        <div className={"container max-w-7xl max-lg:py-14 py-20"}>
          <div className={"flex items-center gap-2 mb-6"}>
            <Link
                href={"/bookings"}
                className={cn(buttonVariants({ variant: "outline" }))}
            >
              <ChevronLeft className={"size-4 mr-2"} />
              Back
            </Link>
            <ShareTripButton id={configureTrip.id}/>
          </div>
          <div className={"grid lg:grid-cols-3 gap-10"}>
            <div className={"lg:col-span-2"}>
              <h1 className={"font-bold text-2xl"}>
                Information about your trip
              </h1>
              <p className={"text-muted-foreground text-sm mt-0.5"}>
                Check the details of your trip and book your seats.
              </p>
              <div className={"space-y-4 mt-8"}>
                <section className={"grid lg:grid-cols-3 gap-3"}>
                  <div className={"border-2 rounded-2xl col-span-2 p-2"}>
                    <Image
                        width={400}
                        height={400}
                      src={`${configureTrip.boat.imageUrl}`}
                      alt="boat"
                      className={"max-lg:h-auto h-72 w-full rounded-xl"}
                        draggable={false}
                    />
                  </div>
                  <div
                    className={
                      "grid gap-3 max-lg:grid-cols-2 w-full max-md:col-span-2"
                    }
                  >
                    <div className={"border-2 rounded-2xl px-4 py-3"}>
                      <h4 className={"text-xs text-muted-foreground"}>
                        Transport Ship
                      </h4>
                      <p
                        className={
                          "text-sm font-medium text-foreground line-clamp-1"
                        }
                      >
                        {configureTrip.boat.name}
                      </p>
                    </div>
                    <div className={"border-2 rounded-2xl px-4 py-3"}>
                      <h4 className={"text-xs text-muted-foreground"}>
                        Dimensions
                      </h4>
                      <p
                        className={
                          "text-sm font-medium text-foreground line-clamp-1"
                        }
                      >
                        {configureTrip.boat.length} m x{" "}
                        {configureTrip.boat.width} m
                      </p>
                    </div>
                    <div className={"border-2 rounded-2xl px-4 py-3"}>
                      <h4 className={"text-xs text-muted-foreground"}>
                        Nominal Speed
                      </h4>
                      <p
                        className={
                          "text-sm font-medium text-foreground line-clamp-1"
                        }
                      >
                        {configureTrip.boat.speed} knots
                      </p>
                    </div>
                    <div className={"border-2 rounded-2xl px-4 py-3"}>
                      <h4 className={"text-xs text-muted-foreground"}>
                        Max. Capacity
                      </h4>
                      <p
                        className={
                          "text-sm font-medium text-foreground line-clamp-1"
                        }
                      >
                        {configureTrip.boat.categoryCapacities.reduce(
                          (total, capacity) => total + capacity.maxCapacity,
                          0
                        )}{" "}
                        passengers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-2 py-3 px-4 rounded-2xl  max-md:col-span-2">
                    <section>
                      <h4 className={"text-xs text-muted-foreground"}>
                        Departure
                      </h4>
                      <p className={"text-sm font-medium"}>
                        {configureTrip.route.departurePort}
                      </p>
                    </section>
                    <div className="flex-grow mx-4 flex items-center">
                      <div className="h-px bg-foreground flex-grow" />
                      <div className="h-px bg-foreground flex-grow" />
                    </div>
                    <section>
                      <h4
                        className={"text-xs text-muted-foreground text-right"}
                      >
                        Arrival
                      </h4>
                      <p className={"text-sm font-medium text-right"}>
                        {configureTrip.route.arrivalPort}
                      </p>
                    </section>
                  </div>
                  <div className={"border-2 rounded-2xl px-4 py-3"}>
                    <h4 className={"text-xs text-muted-foreground"}>
                      Departure Time
                    </h4>
                    <div className={"flex items-center gap-1.5"}>
                      <p
                        className={cn(
                          delayMinutes > 0
                            ? "line-through text-muted-foreground"
                            : "",
                          "font-medium"
                        )}
                      >
                        {format(configureTrip.departureTime, "HH:mm")}
                      </p>
                      {delayMinutes > 0 && (
                        <p className="font-bold text-orange-500">
                          {format(adjustedDepartureTime, "HH:mm")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={"border-2 rounded-2xl px-4 py-3"}>
                    <h4 className={"text-xs text-muted-foreground"}>
                      Sea Condition
                    </h4>
                    <p className={"text-sm font-medium text-foreground line-clamp-1"}>
                      {getSeaConditionInfo(seaCondition).label}
                    </p>
                  </div>

                  {delayMinutes > 0 && (
                    <Accordion
                      type="single"
                      collapsible
                      className={"col-span-2 lg:col-span-3"}
                    >
                      <AccordionItem
                        value="delay-reason"
                        className="rounded-2xl bg-orange-600/10 px-3 py-1.5 border-none"
                      >
                        <AccordionTrigger className="py-2 hover:no-underline">
                          <div className="flex items-center gap-2 text-orange-500 font-bold">
                            <Clock className="w-4 h-4" />
                            {delayMinutes} minutes delay
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm pb-2 text-muted-foreground">
                          {configureTrip.captainLogs[0].delayReason ||
                            "No reason provided."}{" "}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  <div className="border-2 rounded-xl px-4 py-3 lg:col-span-2">
                    <p className="font-bold text-foreground mb-2">Equipments</p>
                    {configureTrip.boat.equipment.map((equipment, index) => (
                      <div
                        className="flex items-center gap-2 text-sm"
                        key={index}
                      >
                        <li>{equipment}</li>
                      </div>
                    ))}
                  </div>
                  <div className={"border-2 rounded-2xl px-4 py-3 flex items-center justify-center max-h-40"}>
                    <div className={"space-y-2.5"}>
                      <Leaf className={"size-5 text-emerald-500"}/>
                      <p className={"text-sm"}>
                        We are taking actions to reduce the <strong>carbon footprint</strong> of our ships.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <ConfigureSeats crossingId={configureTrip.id}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigurePage;
