"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { setBookingDetails } from "@/store/slices/bookingSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Briefcase, Package, Star, Users } from "lucide-react"
import toast from "react-hot-toast"

const translations = {
  en: {
    title: "Select Your Vehicle",
    totalFare: "Total Fare",
    select: "Select",
    continueToPayment: "Continue to Payment",
    vehicleDetails: "Vehicle Details",
    additionalServices: "Additional Services",
    passengerCapacity: "Passenger Capacity",
    luggageCapacity: "Luggage Capacity",
    cargoCapacity: "Cargo Capacity",
    amenities: "Amenities",
    childSeat: "Child Seat",
    refreshments: "Refreshments",
  },
  pl: {
    title: "Wybierz Pojazd",
    totalFare: "Całkowita Opłata",
    select: "Wybierz",
    continueToPayment: "Przejdź do Płatności",
    vehicleDetails: "Szczegóły Pojazdu",
    additionalServices: "Dodatkowe Usługi",
    passengerCapacity: "Liczba Pasażerów",
    luggageCapacity: "Pojemność Bagażnika",
    cargoCapacity: "Ładowność",
    amenities: "Udogodnienia",
    childSeat: "Fotelik dla Dziecka",
    refreshments: "Przekąski",
  },
}

interface Vehicle {
  id: string
  name: string
  desc: string
  image: string
  category: string
  basePrice: number
  pricePerKm: number
  passengerCapacity: number
  luggageCapacity: number
  cargoCapacity: string
}

const calculateDistance = (pickup: string, dropoff: string) => {
  return Math.floor(Math.random() * 50) + 10
}

export default function VehicleSelection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const dispatch = useDispatch()
  const router = useRouter()
  const language = useSelector((state: RootState) => state.language.current)
  const booking = useSelector((state: RootState) => state.booking)
  const t = translations[language]

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [fare, setFare] = useState<number | null>(null)
  const [additionalServices, setAdditionalServices] = useState<string[]>([])

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`/api/vehicles?lang=${language}`)
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles")
      }
      const data = await response.json()
      setVehicles(data)
    } catch (error) {
      toast.error("Failed to fetch vehicles. Please try again.")
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  useEffect(() => {
    if (booking.pickupLocation && booking.dropoffLocation) {
      const distance = calculateDistance(booking.pickupLocation.address, booking.dropoffLocation.address)
      dispatch(setBookingDetails({ distance }))
    }
  }, [booking.pickupLocation, booking.dropoffLocation, dispatch])

  const calculateFare = (vehicle: Vehicle) => {
    const distance = booking.distance || 0
    return vehicle.basePrice + distance * vehicle.pricePerKm
  }

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId)
    const vehicle = vehicles.find((v) => v.name === vehicleId)
    if (vehicle) {
      const calculatedFare = calculateFare(vehicle)
      setFare(calculatedFare)
      dispatch(setBookingDetails({ selectedVehicle: vehicleId, fare: calculatedFare }))
    }
  }

  const handleAdditionalService = (service: string) => {
    setAdditionalServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const handleContinueToPayment = () => {
    if (selectedVehicle && fare) {
      dispatch(setBookingDetails({ additionalServices }))
      router.push("/payment")
    } else {
      alert("Please select a vehicle")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <h1 className="text-4xl font-bold text-center pt-8">{t.title}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {vehicles
          .filter((vehicle) => vehicle.category === booking.serviceType)
          .map((vehicle) => (
            <div
              key={vehicle.id}
              className={`group relative overflow-hidden transition-all duration-200 
            ${selectedVehicle === vehicle.id ? "ring-2 ring-primary border-none" : "border border-gray-200"}
            rounded-xl bg-white hover:shadow-lg`}
            >
              <div className="relative">
                <img
                  src={vehicle.image || "/car.jpeg"}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800">{vehicle.name}</h2>
                  <p className="text-lg font-bold text-primary">${calculateFare(vehicle).toFixed(2)}</p>
                </div>

                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {t.passengerCapacity}: {vehicle.passengerCapacity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {t.luggageCapacity}: {vehicle.luggageCapacity}
                    </span>
                  </div>

                  {vehicle.category === "logistics" && (
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {t.cargoCapacity}: {vehicle.cargoCapacity}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800">{t.amenities}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{t.childSeat}</span>
                  </div>
                </div>

                <Button
                  className={`w-full ${selectedVehicle === vehicle.id ? "bg-primary text-white" : "bg-white text-primary border-primary"}`}
                  variant={selectedVehicle === vehicle.id ? "default" : "outline"}
                  onClick={() => handleVehicleSelect(vehicle.name)}
                >
                  {selectedVehicle === vehicle.id ? "Selected" : "Select Vehicle"}
                </Button>
              </div>
            </div>
          ))}
      </div>

      {selectedVehicle && (
        <Card className="mt-8 rounded-lg shadow-lg border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">{t.additionalServices}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant={additionalServices.includes("childSeat") ? "default" : "outline"}
                onClick={() => handleAdditionalService("childSeat")}
                className="w-full"
              >
                {t.childSeat}
              </Button>

              <Button
                variant={additionalServices.includes("refreshments") ? "default" : "outline"}
                onClick={() => handleAdditionalService("refreshments")}
                className="w-full"
              >
                {t.refreshments}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedVehicle && (
        <div className="mt-8 text-center">
          <Button size="lg" onClick={handleContinueToPayment} className="bg-primary text-white hover:bg-primary-dark">
            {t.continueToPayment}
          </Button>
        </div>
      )}
    </div>
  )
}

