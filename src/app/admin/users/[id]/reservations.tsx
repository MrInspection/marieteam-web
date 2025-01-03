"use client";

import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Anchor, Eye, ReceiptEuro} from 'lucide-react';
import {formatName} from "@/utils/text-formatter";
import {cn} from "@/lib/utils";
import {GetUserOrders} from "@/app/(customer)/orders/orders.action";
import {Reservation, BillingAddress, Seat, SeatType, Crossing, Boat, Route, Pricing} from "@prisma/client";

type OrderWithDetails = Reservation & {
  billingAddress: BillingAddress | null;
  seats: (Seat & {
    seatType: SeatType & {
      Pricing: Pricing[];
    };
    crossing: Crossing & {
      boat: Boat;
      route: Route;
    };
  })[];
};

export function Reservations({userId}: { userId: string }) {
  const {data: orders, isFetching} = useQuery({
    queryKey: ["user-orders", userId],
    queryFn: async () => {
      return GetUserOrders(userId);
    },
  });

  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);

  if(!orders || orders.length === 0) {
    return (
      <div
        className="border-2 border-primary-40 rounded-2xl border-dashed p-8 flex flex-col items-center justify-center h-96">
        <ReceiptEuro className="size-10 text-muted-foreground"/>
        <h1 className="text-lg mt-4 font-semibold">No orders</h1>
        <p className="mt-2 mb-4 text-muted-foreground text-sm">
          This user doesn&apos;t have any orders yet.
        </p>
      </div>
    )
  }

  return (
    <section className="border rounded-xl px-6 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-lg:hidden">Order ID</TableHead>
            <TableHead className="max-sm:hidden">Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="max-sm:hidden">Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            [...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(6)].map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded"/>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : orders && orders.length > 0 ? (
            orders.map((order: OrderWithDetails) => (
              <TableRow key={order.id}>
                <TableCell className="max-lg:hidden">{order.id}</TableCell>
                <TableCell className="max-sm:hidden">
                  {order.billingAddress?.name ?? "No Billing Information"}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="max-sm:hidden">{order.totalAmount.toFixed(2)} €</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      order.status === "PAID"
                        ? "bg-emerald-100/70 dark:bg-emerald-700/20 text-emerald-500"
                        : "bg-yellow-700/10 dark:bg-yellow-700/20 text-yellow-500",
                      "text-xs font-medium px-2 py-1 rounded-lg w-fit"
                    )}
                  >
                    {order.status}
                  </div>
                </TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="size-5"/> View
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-screen overflow-y-auto p-0">
                      <SheetHeader className="border-b p-6">
                        <SheetTitle className="text-left">
                          Order Details
                          <p className="text-muted-foreground font-normal text-sm">{selectedOrder?.id}</p>
                        </SheetTitle>
                      </SheetHeader>
                      <section className="p-6">
                        {selectedOrder && selectedOrder.seats[0] && (
                          <div className="space-y-3">
                            <div className="grid gap-3">
                              <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                <h3 className="text-xs text-muted-foreground">Boat</h3>
                                <p className="text-sm font-medium">
                                  {selectedOrder.seats[0].crossing.boat.name}
                                </p>
                              </div>
                              <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mt-1">
                                  <section>
                                    <h4 className="text-xs text-muted-foreground">Departure</h4>
                                    <p className="text-sm font-medium">
                                      {selectedOrder.seats[0].crossing.route.departurePort}
                                    </p>
                                  </section>
                                  <div className="flex-grow mx-4 flex items-center">
                                    <div className="h-px bg-foreground flex-grow"/>
                                    <Anchor className="h-4 w-4 mx-2"/>
                                    <div className="h-px bg-foreground flex-grow"/>
                                  </div>
                                  <section>
                                    <h4 className="text-xs text-muted-foreground">Arrival</h4>
                                    <p className="text-sm font-medium">
                                      {selectedOrder.seats[0].crossing.route.arrivalPort}
                                    </p>
                                  </section>
                                </div>
                              </div>
                              <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                <h3 className="text-xs text-muted-foreground">Departure Time</h3>
                                <p className="text-sm font-medium">
                                  {new Date(selectedOrder.seats[0].crossing.departureTime).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                              <h3 className="font-semibold mb-2">Reservation Details</h3>
                              {selectedOrder.seats.map((seat) => (
                                <div key={seat.id} className="flex items-center justify-between text-sm">
                                  <p className="font-medium">{formatName(seat.seatType.name)}</p>
                                  <div>
                                    <span className="text-muted-foreground">{seat.bookedSeats}x</span>{" "}
                                    <span className="font-medium">
                                        {seat.seatType.Pricing[0]?.amount.toFixed(2)} €
                                      </span>
                                  </div>
                                </div>
                              ))}
                              <div className="flex items-center justify-between border-t mt-4 pt-2 text-sm">
                                <h3 className="font-semibold">Amount Paid</h3>
                                <p className="font-bold">{selectedOrder.totalAmount.toFixed(2)} €</p>
                              </div>
                            </div>
                            {selectedOrder.billingAddress ? (
                              <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                <h3 className="font-semibold mb-2">Billing Information</h3>
                                <p className="text-sm text-muted-foreground">{selectedOrder.billingAddress.name}</p>
                                <p
                                  className="text-sm text-muted-foreground">{selectedOrder.billingAddress.street}</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedOrder.billingAddress.postalCode}{" "}
                                  {selectedOrder.billingAddress.city ?? ""}
                                </p>
                                <p
                                  className="text-sm text-muted-foreground">{selectedOrder.billingAddress.country}</p>
                              </div>
                            ) : (
                              <div
                                className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg h-40 flex flex-col items-center justify-center">
                                <p className="text-muted-foreground text-sm text-center">
                                  No billing address available for pending
                                  reservations.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}