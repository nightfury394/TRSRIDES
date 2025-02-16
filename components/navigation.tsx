"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLanguage } from "@/store/slices/languageSlice"
import { Button } from "@/components/ui/button"
import type { RootState } from "@/store/store"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { chauffeurServices } from "@/app/data/chauffeur-services"
import { logisticsServices } from "@/app/data/logistics-services"

const translations = {
  en: {
    services: "Services",
    fleet: "Our Fleet",
    contact: "Contact",
    book: "Book Now",
    carRental: "Car Rental",
    chauffeur: "Chauffeur",
    logistics: "Logistics",
    chauffeurOptions: {
      airportTransfers: "Airport Transfers",
      eventsWeddings: "Events and Weddings",
      businessTransfers: "Business/Corporate Transfers",
      errandServices: "Errand Services",
    },
    logisticsOptions: {
      delivery: "Delivery",
      sameDayDelivery: "Same Day Delivery",
      expressDelivery: "Express Delivery",
      moving: "Moving Services",
      residentialMoving: "Residential Moving",
      commercialMoving: "Commercial Moving",
      specializedTransport: "Specialized Transport",
    },
  },
  pl: {
    services: "Usługi",
    fleet: "Nasza Flota",
    contact: "Kontakt",
    book: "Zarezerwuj",
    carRental: "Wynajem Samochodów",
    chauffeur: "Usługi Szoferskie",
    logistics: "Logistyka",
    chauffeurOptions: {
      airportTransfers: "Transfery Lotniskowe",
      eventsWeddings: "Wydarzenia i Wesela",
      businessTransfers: "Transfery Biznesowe/Korporacyjne",
      errandServices: "Usługi Zlecone",
    },
    logisticsOptions: {
      delivery: "Dostawy",
      sameDayDelivery: "Dostawa Tego Samego Dnia",
      expressDelivery: "Ekspresowa Dostawa",
      moving: "Usługi Przeprowadzkowe",
      residentialMoving: "Przeprowadzki Mieszkań",
      commercialMoving: "Przeprowadzki Biur",
      specializedTransport: "Transport Specjalistyczny",
    },
  },
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const language = useSelector((state: RootState) => state.language.current)
  const t = translations[language]

  return (
    <nav className="bg-white border-b-4 border-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              <img src="/logo.jpg" alt="TRS Rides" className="w-[100px]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-2">
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setLanguage("en"))}
              >
                EN
              </Button>
              <Button
                variant={language === "pl" ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setLanguage("pl"))}
              >
                PL
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
                {t.services} <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/services/car-rental">{t.carRental}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full">
                      {t.chauffeur} <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {chauffeurServices.map((service) => (
                        <DropdownMenuItem key={service.id}>
                          <Link href={`/services/chauffeur/${service.id}`}>{t.chauffeurOptions[service.titleKey]}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full">
                      {t.logistics} <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {logisticsServices.map((service) => (
                        <DropdownMenuItem key={service.id}>
                          <Link href={`/services/logistics/${service.id}`}>{t.logisticsOptions[service.titleKey]}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#fleet" className="text-gray-600 hover:text-gray-900">
              {t.fleet}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              {t.contact}
            </a>
            <Button>{t.book}</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                {t.services} <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/services/car-rental" className="w-full">
                    {t.carRental}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full">
                      {t.chauffeur} <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {chauffeurServices.map((service) => (
                        <DropdownMenuItem key={service.id}>
                          <Link href={`/services/chauffeur/${service.id}`} className="w-full">
                            {t.chauffeurOptions[service.titleKey]}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full">
                      {t.logistics} <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {logisticsServices.map((service) => (
                        <DropdownMenuItem key={service.id}>
                          <Link href={`/services/logistics/${service.id}`} className="w-full">
                            {t.logisticsOptions[service.titleKey]}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a
              href="#fleet"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t.fleet}
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t.contact}
            </a>
            <div className="px-3 py-2">
              <Button className="w-full">{t.book}</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


