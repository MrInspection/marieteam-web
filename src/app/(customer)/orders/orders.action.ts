"use server"

import {auth} from "@/auth/auth";
import {prisma} from "@/lib/db";

export async function GetPaidUserOrders(userId: string) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized action")
  }

  const orders = await prisma.reservation.findMany({
    where: {
      userId: userId,
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

  if (!orders || orders.length === 0) {
    return [];
  }
  return orders;
}

export async function GetUserOrders(userId: string) {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized action")
  }

  const orders = await prisma.reservation.findMany({
    where: {
      userId: userId,
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

  if (!orders || orders.length === 0) {
    return [];
  }
  return orders;
}