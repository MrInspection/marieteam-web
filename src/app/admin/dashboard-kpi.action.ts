"use server";

import {z} from "zod";
import {prisma} from "@/lib/db";
import {formatISO} from "date-fns";

const dateRangeSchema = z.object({
  from: z.date().nullable(),
  to: z.date().nullable(),
});

export async function getDashboardKPIs(from: Date, to: Date) {
  // Validate the date range
  const validationResult = dateRangeSchema.safeParse({from, to});
  if (!validationResult.success) {
    throw new Error("Invalid date range");
  }

  const fromDate = formatISO(from);
  const toDate = formatISO(to);

  // Database queries
  const totalRevenue = await prisma.reservation.aggregate({
    _sum: {totalAmount: true},
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
      status: 'PAID',
    },
  });

  const passengersTransported = await prisma.seat.aggregate({
    _sum: {
      bookedSeats: true, // Sum the bookedSeats
    },
    where: {
      reservation: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
        status: 'PAID',
      },
    },
  });

  const totalSales = await prisma.reservation.count({
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
      status: 'PAID',
    },
  });

  const avgSpending = totalRevenue._sum.totalAmount
    ? totalRevenue._sum.totalAmount / totalSales
    : 0;

  return {
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    passengersTransported: passengersTransported._sum.bookedSeats || 0, // Updated passengers count
    totalSales,
    avgSpending,
  };
}
