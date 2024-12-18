import {auth} from "@/auth/auth";
import {buttonVariants} from "@/components/ui/button";
import {ReceiptEuro} from "lucide-react";
import Link from "next/link";
import {prisma} from "@/lib/db";
import {Orders} from "@/app/(customer)/orders/orders";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
  title: "My Orders - MarieTeam",
};

export default async function OrdersPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) return redirect("/sign-in");

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
    <main className="bg-muted/40 dark:bg-black flex flex-col flex-grow">
      <section className="border-b">
        <div className="container max-w-7xl py-10">
          <h1 className="text-3xl font-medium tracking-tight">My Orders</h1>
          <p className="text-sm/7 text-muted-foreground mt-1">View the transaction history of and details of your
            orders.</p>
        </div>
      </section>
      <section className="container max-w-7xl py-10">
        {reservations.length === 0 ? (
          <div
            className="border-2 border-primary-40 rounded-2xl border-dashed p-8 flex flex-col items-center justify-center h-96">
            <ReceiptEuro className="size-10 text-muted-foreground"/>
            <h1 className="text-lg mt-4 font-semibold">No orders</h1>
            <p className="mt-2 mb-4 text-muted-foreground text-sm">
              You don&apos;t have any orders yet. Create one below.
            </p>
            <Link
              href="/bookings"
              className={buttonVariants({variant: "outline"})}
            >
              Create order
            </Link>
          </div>
        ) : (
          <>
            {/* @ts-expect-error Not taking into consideration some props elements */}
            <Orders reservations={reservations}/>
          </>
        )}
      </section>
    </main>
  );
}
