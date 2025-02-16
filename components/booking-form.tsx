"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { setBookingDetails } from "@/store/slices/bookingSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, CalendarIcon, Clock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

const translations = {
  en: {
    pickup: "Pickup Location",
    dropoff: "Drop-off Location",
    date: "Pickup Date",
    time: "Pickup Time",
    services: {
      chauffeur: "Chauffeur",
      logistics: "Logistics",
      rental: "Car Rental",
    },
    book: "Book Now",
  },
  pl: {
    pickup: "Miejsce odbioru",
    dropoff: "Miejsce docelowe",
    date: "Data odbioru",
    time: "Godzina odbioru",
    services: {
      chauffeur: "Szofer",
      logistics: "Logistyka",
      rental: "Wynajem",
    },
    book: "Zarezerwuj",
  },
}

// Mock function to simulate location search
const searchLocations = async (query: string): Promise<string[]> => {
  // In a real app, this would be an API call to a geocoding service
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
  return [`${query} Street`, `${query} Avenue`, `${query} Boulevard`, `${query} Square`, `${query} Park`]
}

export function BookingForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const language = useSelector((state: RootState) => state.language.current);
  const booking = useSelector((state: RootState) => state.booking);
  const t = translations[language];

  const [date, setDate] = useState<Date>();
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);

  const handleLocationSearch = async (query: string, type: "pickup" | "dropoff") => {
    if (query.length > 2) {
      const results = await searchLocations(query);
      if (type === "pickup") {
        setPickupSuggestions(results);
      } else {
        setDropoffSuggestions(results);
      }
    } else {
      if (type === "pickup") {
        setPickupSuggestions([]);
      } else {
        setDropoffSuggestions([]);
      }
    }
  };

  const handleLocationSelect = (location: string, type: "pickup" | "dropoff") => {
    dispatch(setBookingDetails({ [`${type}Location`]: { address: location } }));

    if (type === "pickup") {
      setPickupInput(location);
      setPickupSuggestions([]);
    } else {
      setDropoffInput(location);
      setDropoffSuggestions([]);
    }
  };

  const handleBookNow = () => {
    if (booking.pickupLocation && booking.dropoffLocation && booking.pickupDate && booking.pickupTime) {
      router.push("/vehicle-selection");
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs defaultValue="chauffeur" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            {Object.entries(t.services).map(([key, label]) => (
              <TabsTrigger key={key} value={key} onClick={() => dispatch(setBookingDetails({ serviceType: key }))}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="grid gap-4">
            {/* Pickup Location Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t.pickup}
                className="pl-10"
                value={pickupInput} // Bind input value
                onChange={(e) => {
                  setPickupInput(e.target.value);
                  handleLocationSearch(e.target.value, "pickup");
                }}
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                  {pickupSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleLocationSelect(suggestion, "pickup")}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dropoff Location Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t.dropoff}
                className="pl-10"
                value={dropoffInput} // Bind input value
                onChange={(e) => {
                  setDropoffInput(e.target.value);
                  handleLocationSearch(e.target.value, "dropoff");
                }}
              />
              {dropoffSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleLocationSelect(suggestion, "dropoff")}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : t.date}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    dispatch(setBookingDetails({ pickupDate: date?.toISOString() }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="time"
                className="pl-10"
                onChange={(e) => dispatch(setBookingDetails({ pickupTime: e.target.value }))}
              />
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleBookNow}>
            {t.book}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}



