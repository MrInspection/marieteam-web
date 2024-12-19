import {auth} from "@/auth/auth";
import {prisma} from "@/lib/db";
import OrderSummary from "@/app/(customer)/bookings/summary/order-summary";
import React from "react";
import InvalidRequest from "@/app/(customer)/bookings/error";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Order Summary - MarieTeam",
};

type SummaryPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const SummaryPage = async (props: SummaryPageProps) => {
  const searchParams = await props.searchParams;
  const {id} = searchParams;

  const session = await auth();
  const userId = session?.user?.id;

  if (!id || typeof id !== "string" || !userId) {
    return <InvalidRequest/>;
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: id,
      userId: userId,
      status: "PENDING",
    },
    include: {
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
              captainLogs: {
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!reservation) {
    return <InvalidRequest/>;
  }

  // @ts-expect-error Not taking into consideration some props elements
  return <OrderSummary reservation={reservation}/>;
};

export default SummaryPage;
