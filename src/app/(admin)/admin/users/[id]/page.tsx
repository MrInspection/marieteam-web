import {prisma} from "@/lib/db";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Orders} from "@/app/(customer)/orders/orders";
import {ChevronLeft, Calendar, Mail, User} from "lucide-react";
import {redirect} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default async function UserPage({params}: { params: { id: string } }) {
  const {id} = params;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      accounts: true,
      reservations: true,
    },
  });

  if (!user) {
    return redirect("/admin/users");
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: user.id,
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
    <div className="space-y-6">
      <Link href="/admin/users" className={cn(buttonVariants({variant: "outline", size: "sm"}))}>
        <ChevronLeft className="size-4"/> Back
      </Link>
      <div className="grid xl:grid-cols-7 gap-6">
        <div className="xl:col-span-2">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <section className="border rounded-2xl p-4">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-12">
                <AvatarImage src={user?.image?.toString()} className="shadow-md border-2 rounded-full"/>
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </section>
          <section className="border rounded-2xl p-4 mt-6">
            <h2 className="font-medium">Account Details</h2>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="size-4 text-muted-foreground"/>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground"/>
              <span className="text-sm text-muted-foreground">Joined {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="size-4 text-muted-foreground"/>
              <span className="text-sm capitalize text-muted-foreground">{user.role.toLowerCase()} Account</span>
            </div>
          </section>
        </div>
        <div className="xl:col-span-5">
        <h3 className="text-lg mb-2 font-semibold">Reservations</h3>
          {/* @ts-expect-error Not taking into consideration some props elements */}
          <Orders reservations={reservations}/>
        </div>
      </div>
    </div>
  );
}
