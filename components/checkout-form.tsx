"use client"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/src/store/store"

interface CheckoutFormProps {
  clientSecret: string
}

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const router = useRouter()
  const booking = useSelector((state: RootState) => state.booking)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/booking-confirmation` },
      redirect: "if_required", // Fix: Prevent immediate redirection
    })

    if (error) {
      setError(error.message || "An error occurred while processing your payment.")
      setProcessing(false)
      return
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        if (!booking || Object.keys(booking).length === 0) {
          throw new Error("Booking data is missing.")
        }

        const payload = { ...booking, name, email, paymentIntentId: paymentIntent.id }
        console.log("Sending booking data:", payload)

        const response = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: email,
            serviceType: booking.serviceType,
            pickupLocation: booking.pickupLocation?.address,
            dropoffLocation: booking.dropoffLocation?.address,
            pickupDate: new Date(booking.pickupDate),
            pickupTime: booking.pickupTime,
            selectedVehicle: booking.selectedVehicle,
            fare: booking.fare,
          }),
        })

        const responseData = await response.json()
        console.log("API Response:", responseData)

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to save booking data.")
        }

        router.push("/booking-confirmation") // Redirect AFTER saving booking
      } catch (err) {
        console.error("Error saving booking:", err)
        setError("Failed to save booking. Please contact support.")
      }
    }

    setProcessing(false)
  }


  return (
    <div>
      <div className="p-6 rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name on card"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Stripe Payment Element without Link */}
          <PaymentElement options={{ layout: "tabs", disableLink: true }} />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" disabled={!stripe || processing} className="w-full mt-4">
            {processing ? "Processing..." : "Pay"}
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">Powered by Stripe</p>
      </div>
    </div>
  )
}
