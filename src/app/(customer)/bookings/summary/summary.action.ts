"use server";

import {prisma} from "@/lib/db";
import {stripe} from "@/lib/stripe";
import {formatName} from "@/utils/text-formatter";
import {auth} from "@/auth/auth";

type ReservationProps = {
  reservationId: string;
  userId: string;
};

export const GetReservation = async ({reservationId, userId}: ReservationProps) => {
  const session = await auth()
  if (!session || !(session.user?.id === userId)) {
    throw new Error("Unauthorized action")
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
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
    throw new Error("Reservation not found.");
  }
  return reservation;
}

type CheckoutSessionsProps = {
  reservationId: string;
  userId: string;
};

export const createCheckoutSession = async ({reservationId, userId}: CheckoutSessionsProps) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
      userId: userId,
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
              route: true,
            },
          },
        },
      },
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found.");
  }

  // Create line items for each seat in the reservation with detailed info
  const lineItems = reservation.seats.map((seat) => {
    const pricing = seat.seatType.Pricing.find((p) => p.routeId === seat.crossing.route.id);
    const individualPrice = pricing ? pricing.amount : 0; // Ensure you have a valid price
    /*const totalPrice = individualPrice * seat.bookedSeats;*/

    return {
      price_data: {
        currency: "eur", // Ensure currency is consistent
        product_data: {
          name: `${seat.bookedSeats}x ${formatName(seat.seatType.name)} seats`,
        },
        unit_amount: Math.round(individualPrice * 100), // Unit price per seat (in cents)
      },
      quantity: seat.bookedSeats, // This will multiply the unit price by the number of seats
    };
  });

  // Create the Stripe checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/summary?id=${reservation.id}`,
    payment_method_types: ["paypal", "card"],
    mode: "payment",
    billing_address_collection: "required",
    metadata: {
      userId: reservation.userId,
      reservationId: reservation.id,
    },
    line_items: lineItems, // Only the seats will be included
  });

  return {url: stripeSession.url};
};
