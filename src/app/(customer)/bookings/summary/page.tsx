import OrderSummary from "@/app/(customer)/bookings/summary/order-summary";
import React from "react";
import InvalidRequest from "@/app/(customer)/bookings/error";
import type {Metadata} from "next";
import {prisma} from "@/lib/db";
import {getUser} from "@/lib/auth-session";

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

  const user = await getUser()
  const userId = user?.id;

  if (!id || typeof id !== "string" || !userId) {
    return <InvalidRequest/>;
  }

  const isValidReservation = await prisma.reservation.findUnique({
    where: {
      id: id,
      userId: userId,
      status: "PENDING",
    }
  })

  if(!isValidReservation) {
    return <InvalidRequest/>
  }

  return <OrderSummary reservationId={id} userId={userId} />
};

export default SummaryPage;
