"use client";

import {Button} from "@/components/ui/button";
import {Anchor, ChevronRight, Loader} from "lucide-react";
import {formatName} from "@/utils/text-formatter";
import Image from "next/image";
import {format} from "date-fns";
import {createCheckoutSession, GetReservation} from "@/app/(customer)/bookings/summary/summary.action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {useMutation, useQuery} from "@tanstack/react-query";
import React from "react";
import OrderSummarySkeleton from "@/app/(customer)/bookings/summary/order-summary-skeleton";

type OrderSummaryProps = {
  reservationId: string;
  userId: string;
};

export default function OrderSummary({reservationId, userId}: OrderSummaryProps) {
  const router = useRouter();

  const {data: reservation, isFetching} = useQuery({
    queryKey: ['reservation', reservationId, userId],
    queryFn: () => GetReservation({reservationId, userId}),
  });

  const {mutate: CreateSession, isPending: isCreatingSession} = useMutation({
    mutationFn: () => createCheckoutSession({reservationId, userId}),
    onSuccess: ({url}) => {
      if (typeof url === "string") {
        router.push(url);
      }
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  if(!reservation || isFetching) {
    return <OrderSummarySkeleton />
  }

  const boat = reservation.seats[0].crossing.boat;
  const route = reservation.seats[0].crossing.route;
  const captainLogs = reservation.seats[0].crossing.captainLogs;
  const delayMinutes = captainLogs?.[0]?.delayMinutes ?? 0;
  const departureTime = reservation.seats[0].crossing.departureTime;
  const adjustedDepartureTime = new Date(departureTime.getTime() + delayMinutes * 60000);

  return (
    <main className="flex flex-col flex-grow bg-muted/50 dark:bg-black">
      <section className="bg-background">
        <div className="container py-9">
          <h1 className="text-3xl font-bold tracking-tight">Order Summary</h1>
          <p className="text-sm/7 text-muted-foreground">Reservation ID: {reservation.id}</p>
        </div>
      </section>
      <section className="border-t-2">
        <div className="container py-16">
          <div className="grid lg:grid-cols-3 max-lg:gap-6 gap-10">
            <div className="lg:col-span-2">
              <div className="border-2 rounded-2xl col-span-2 p-2">
                <Image
                  width={500}
                  height={500}
                  src={boat.imageUrl || "placeholder.svg"}
                  alt="boat"
                  className="max-lg:h-auto h-auto w-full rounded-xl"
                  draggable={false}
                  priority={true}
                />
              </div>
            </div>
            <div>
              <section className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 rounded-2xl px-4 py-3">
                    <h4 className="text-xs text-muted-foreground">Boat</h4>
                    <p className="line-clamp-1 text-sm font-medium">{boat.name}</p>
                  </div>
                  <div className="border-2 rounded-2xl px-4 py-3">
                    <h4 className="text-xs text-muted-foreground">Departure Time</h4>
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
                </div>
                <div
                  className="flex items-center justify-between border-2 py-3 px-4 rounded-2xl max-md:col-span-2">
                  <section>
                    <h4 className="text-xs text-muted-foreground">Departure</h4>
                    <p className="text-sm font-medium">{route.departurePort}</p>
                  </section>
                  <div className="flex-grow mx-4 flex items-center">
                    <div className="h-px bg-foreground flex-grow"/>
                    <Anchor className="size-5 mx-2"/>
                    <div className="h-px bg-foreground flex-grow"/>
                  </div>
                  <section>
                    <h4 className="text-xs text-muted-foreground text-right">Arrival</h4>
                    <p className="text-sm font-medium text-right">{route.arrivalPort}</p>
                  </section>
                </div>
              </section>
              <section>
                <h2 className="text-lg font-semibold mt-6">Seats Reserved</h2>
                <ScrollArea className="lg:h-52 mt-4">
                  <div className="grid gap-4">
                    {reservation.seats.map((seat) => {
                      const pricing = seat.seatType.Pricing.find((p) => p.routeId === route.id);
                      const individualPrice = pricing ? pricing.amount : 0;
                      return (
                        <div
                          className="border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                          key={seat.id}
                        >
                          <div>
                            <h3 className="font-medium">{formatName(seat.seatType.name)}</h3>
                            <p className="text-sm text-muted-foreground">
                              {seat.seatType.description}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{seat.bookedSeats}x </span>
                            <span className="font-medium">{individualPrice.toFixed(2)}€</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <ScrollBar/>
                </ScrollArea>
                <div className="border-t-2 pt-4 flex items-center justify-between mt-8">
                  <p className="text-muted-foreground text-lg">Total Amount</p>
                  <p className="font-bold text-lg">{reservation.totalAmount.toFixed(2)}€</p>
                </div>
                <Button className="mt-4 w-full" size="lg" onClick={() => CreateSession()} disabled={isCreatingSession}>
                  {isCreatingSession && <Loader className="size-4 animate-spin"/>}
                  Proceed to checkout <ChevronRight className="w-4 h-4"/>
                </Button>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
