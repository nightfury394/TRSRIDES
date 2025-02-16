import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export async function POST(request: Request) {
  const { amount } = await request.json()

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating PaymentIntent:", error)
    return NextResponse.json({ error: "Failed to create PaymentIntent" }, { status: 500 })
  }
}

