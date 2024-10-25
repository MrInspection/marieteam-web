import {auth} from "@/auth/auth";
import NotFound from "@/app/not-found";
import {buttonVariants} from "@/components/ui/button";
import {ReceiptEuro} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {prisma} from "@/lib/db";
import {Orders} from "@/app/(customer)/orders/orders";

export default async function OrdersPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) { return NotFound() }

    const reservations = await prisma.reservation.findMany({
        where: {
            userId: user.id,
            status: "PAID",
        },
        include: {
            billingAddress: true,
            seats: {
                include: {
                    seatType: {
                        include: {
                            Pricing: true,
                        },
                    },
                    crossing: {
                        include: {
                            boat: true,
                            route: true,
                            captainLogs: true,
                        },
                    },
                },
            },
        },
    });

  return (
    <>
        <div className="bg-muted/40 dark:bg-black flex flex-col flex-grow">
            <div className={"container max-w-7xl py-8"}>
                <h1 className={"text-3xl font-bold"}>My Orders</h1>
            </div>
            <div className={"border-t"}/>
            <div className={"container max-w-7xl py-8"}>
                {reservations.length === 0 && (
                    <div
                        className="border-2 rounded-2xl border-dashed p-8 flex flex-col items-center justify-center h-96">
                        <ReceiptEuro className="size-10 text-muted-foreground"/>
                        <h1 className="text-lg mt-4 font-semibold">No orders</h1>
                        <p className="mt-2 mb-4 text-muted-foreground text-sm">You don&apos;t have any orders yet.
                            Create one below.</p>
                        <Link href={"/bookings"} className={cn(buttonVariants({variant: "outline"}))}>
                            Create order
                        </Link>
                    </div>
                )}
                {/* @ts-expect-error Not taking into consideration some props elements */}
                <Orders reservations={reservations}/>
            </div>
        </div>
    </>
  );
}
