"use server"

type CheckoutSessionsProps = {
    reservationId: string
    userId: string
}


/* TODO : Stripe checkout session logic */
export const createCheckoutSession = async ({reservationId} : CheckoutSessionsProps) => {

}