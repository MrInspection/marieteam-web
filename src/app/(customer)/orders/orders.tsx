"use client"

import {useState} from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Anchor, Eye} from "lucide-react";
import {formatName} from "@/utils/text-formatter";

type BillingAddress = {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
};

type Seat = {
    id: string;
    seatType: {
        name: string;
        description: string;
        Pricing: {
            routeId: string;
            amount: number;
        }[];
    };
    bookedSeats: number;
    crossing: {
        boat: {
            name: string;
            imageUrl: string;
        };
        route: {
            id: string;
            departurePort: string;
            arrivalPort: string;
        };
        departureTime: Date;
        captainLogs?: {
            delayMinutes: number;
        }[];
    };
};

type Reservations = {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: Date;
    seats: Seat[];
    userId: string;
    billingAddress: BillingAddress;
};

type OrderProps = {
    reservations: Reservations[];
};

export function Orders({reservations}: OrderProps) {
    const [selectedOrder, setSelectedOrder] = useState<Reservations | null>(null);
    const sortedReservations = [...reservations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="border rounded-2xl p-4">
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
                    {sortedReservations.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="max-lg:hidden">{order.id}</TableCell>
                            <TableCell className="max-sm:hidden">{order.billingAddress.name}</TableCell>
                            <TableCell>
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}
                            </TableCell>
                            <TableCell className="max-sm:hidden">${order.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>
                                <div
                                    className="bg-green-700/5 dark:bg-green-700/20 text-green-500 text-xs font-medium px-2 py-1 rounded-lg w-fit">
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
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle className="text-left">
                                                Order Details
                                                <p className="text-muted-foreground text-sm font-normal">ID: {selectedOrder?.id}</p>
                                            </SheetTitle>
                                        </SheetHeader>
                                        {selectedOrder && (
                                            <div className="mt-6 space-y-3">
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
                                                                <p className="text-sm font-medium">{selectedOrder.seats[0].crossing.route.departurePort}</p>
                                                            </section>
                                                            <div className="flex-grow mx-4 flex items-center">
                                                                <div className="h-px bg-foreground flex-grow"/>
                                                                <Anchor className="h-4 w-4 mx-2"/>
                                                                <div className="h-px bg-foreground flex-grow"/>
                                                            </div>
                                                            <section>
                                                                <h4 className="text-xs text-muted-foreground">Arrival</h4>
                                                                <p className="text-sm font-medium">{selectedOrder.seats[0].crossing.route.arrivalPort}</p>
                                                            </section>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                        <h3 className="text-xs text-muted-foreground">Departure
                                                            Time</h3>
                                                        <p className="text-sm font-medium">
                                                            {new Date(selectedOrder.seats[0].crossing.departureTime).toLocaleString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="font-semibold mb-2">Reservation Details</h3>
                                                    {selectedOrder.seats.map((seat) => (
                                                        <div key={seat.id}
                                                             className="flex items-center justify-between text-sm">
                                                            <p className="font-medium">{formatName(seat.seatType.name)} </p>
                                                            <div>
                                                                    <span
                                                                        className="text-muted-foreground">{seat.bookedSeats}x</span> {" "}
                                                                <span
                                                                    className="font-medium">{seat.seatType.Pricing[0].amount.toFixed(2)} €</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div
                                                        className={"flex items-center justify-between border-t mt-4 pt-2 text-sm"}>
                                                        <h3 className="font-semibold">Amount Paid</h3>
                                                        <p className="font-bold">{selectedOrder.totalAmount.toFixed(2)} €</p>
                                                    </div>
                                                </div>
                                                <div className="bg-muted/80 dark:bg-muted/50 p-3 rounded-lg">
                                                    <h3 className="font-semibold mb-2">Billing Information</h3>
                                                    <p className="text-sm">{selectedOrder.billingAddress.name}</p>
                                                    <p className="text-sm">{selectedOrder.billingAddress.street}</p>
                                                    <p className="text-sm">{selectedOrder.billingAddress.postalCode} {selectedOrder.billingAddress.city}</p>
                                                    <p className="text-sm">{selectedOrder.billingAddress.country}</p>
                                                </div>
                                            </div>
                                        )}
                                    </SheetContent>
                                </Sheet>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
