"use client"

import { useRouter } from "next/navigation"

export default function BookingConfirmation() {
    const router = useRouter()

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className=" mx-auto p-6 rounded-lg">
                <h1 className="text-2xl font-semibold text-center">Booking Confirmation</h1>

                <div className="mt-8 text-center">
                    <p className="text-lg text-gray-800">Your ride has been successfully booked!</p>
                    <p className="text-gray-500 mt-2">Check your email for confirmation.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg"
                    >
                        Go to Home Page
                    </button>
                </div>
            </div>
        </div>
    )
}
