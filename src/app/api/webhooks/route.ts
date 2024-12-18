import {headers} from "next/headers";
import {stripe} from "@/lib/stripe";
import Stripe from "stripe";
import {prisma} from "@/lib/db";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", {status: 400});
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        return new Response("Missing email in customer details", {status: 400});
      }

      const session = event.data.object as Stripe.Checkout.Session
      const {userId, reservationId} = session.metadata || {
        userId: null,
        reservationId: null,
      }

      if (!userId || !reservationId) {
        return new Response("Invalid request metadata", {status: 400})
      }

      const billingAddress = session.customer_details!.address

      await prisma.reservation.update({
        where: {
          id: reservationId,
          userId: userId,
        },
        data: {
          status: "PAID",
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!,
            }
          }
        }
      })
    }

    return NextResponse.json({result: event, ok: true});
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: "Something went wrong", ok: false}, {status: 500});
  }
}