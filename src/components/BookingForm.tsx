"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { setBookingDetails } from "../store/slices/bookingSlice"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const translations = {
  en: {
    pickup: "Pickup Location",
    dropoff: "Drop-off Location",
    date: "Pickup Date",
    time: "Pickup Time",
    type: "Transfer Type",
    oneWay: "One Way",
    return: "Return",
    book: "Book Now",
    services: {
      chauffeur: "Chauffeur Service",
      logistics: "Logistics",
      rental: "Car Rental",
    },
  },
  pl: {
    pickup: "Miejsce odbioru",
    dropoff: "Miejsce docelowe",
    date: "Data odbioru",
    time: "Godzina odbioru",
    type: "Typ transferu",
    oneWay: "W jedną stronę",
    return: "Powrót",
    book: "Zarezerwuj",
    services: {
      chauffeur: "Usługi szoferskie",
      logistics: "Logistyka",
      rental: "Wynajem samochodów",
    },
  },
}

export default function BookingForm() {
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.language.current)
  const booking = useSelector((state: RootState) => state.booking)
  const t = translations[language]

  const [showMap, setShowMap] = useState(false)

  const handleLocationSelect = async (address: string, type: "pickup" | "dropoff") => {
    // In a real app, you would use a geocoding service here
    const mockCoordinates = {
      pickup: { lat: 52.2297, lng: 21.0122 },
      dropoff: { lat: 52.2297, lng: 21.0122 },
    }

    dispatch(
      setBookingDetails({
        [`${type}Location`]: {
          address,
          ...mockCoordinates[type],
        },
      }),
    )
    setShowMap(true)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex gap-4">
          {Object.entries(t.services).map(([key, label]) => (
            <button
              key={key}
              onClick={() => dispatch(setBookingDetails({ serviceType: key }))}
              className={`px-4 py-2 rounded-lg ${booking.serviceType === key ? "bg-black text-white" : "bg-gray-100"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder={t.pickup}
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleLocationSelect(e.target.value, "pickup")}
          />
          <input
            type="text"
            placeholder={t.dropoff}
            className="w-full p-3 border rounded-lg"
            onChange={(e) => handleLocationSelect(e.target.value, "dropoff")}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="p-3 border rounded-lg"
              onChange={(e) => dispatch(setBookingDetails({ pickupDate: e.target.value }))}
            />
            <input
              type="time"
              className="p-3 border rounded-lg"
              onChange={(e) => dispatch(setBookingDetails({ pickupTime: e.target.value }))}
            />
          </div>
          <select
            className="w-full p-3 border rounded-lg"
            onChange={(e) => dispatch(setBookingDetails({ transferType: e.target.value }))}
          >
            <option value="oneWay">{t.oneWay}</option>
            <option value="return">{t.return}</option>
          </select>
          <button className="w-full bg-black text-white p-3 rounded-lg">{t.book}</button>
        </div>
      </div>

      <div className="h-[400px] rounded-lg overflow-hidden">
        {showMap && (
          <MapContainer center={[52.2297, 21.0122]} zoom={13} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {booking.pickupLocation && <Marker position={[booking.pickupLocation.lat, booking.pickupLocation.lng]} />}
            {booking.dropoffLocation && (
              <Marker position={[booking.dropoffLocation.lat, booking.dropoffLocation.lng]} />
            )}
          </MapContainer>
        )}
      </div>
    </div>
  )
}

