"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout-form";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/navigation";
import ContactSupport from "@/components/ContactSupport";
import { Footer } from "@/components/ui/Footer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const translations = {
  en: {
    title: "Payment",
    summary: "Booking Summary",
    total: "Total Amount",
    email: "Email Address",
  },
  pl: {
    title: "Płatność",
    summary: "Podsumowanie Rezerwacji",
    total: "Łączna Kwota",
    email: "Adres Email",
  },
};

export default function Payment() {
  const language = useSelector((state: RootState) => state.language.current);
  const booking = useSelector((state: RootState) => state.booking);
  const t = translations[language];
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: booking.fare * 100 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 justify-between bg-gray-50 p-0 md:p-8 ">
          {/* Booking Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md text-md md:text-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {t.summary}
            </h2>

            <div className="space-y-3 text-gray-700">
              <p className="flex justify-between">
                <span className="font-medium">Service:</span>{" "}
                {booking.serviceType}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Pickup:</span>{" "}
                {booking.pickupLocation?.address}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Dropoff:</span>{" "}
                {booking.dropoffLocation?.address}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Date:</span>{" "}
                {new Date(booking.pickupDate!).toLocaleDateString()}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Time:</span> {booking.pickupTime}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Vehicle:</span>{" "}
                {booking.selectedVehicle}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Additional Services:</span>{" "}
                {booking.additionalServices?.join(", ")}
              </p>
              <p className="flex justify-between text-lg font-semibold">
                <span>{t.total}:</span>{" "}
                <span className="text-blue-600">
                  PLN{booking.fare?.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-0 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl text-center mt-4 font-semibold mb-4 text-gray-800">
              Payment Details
            </h2>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ContactSupport />
    </div>
  );
}
