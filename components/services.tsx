"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Truck, UserCheck } from "lucide-react"

const translations = {
  en: {
    title: "Our Services",
    description: "Comprehensive transportation solutions for all your needs",
    services: {
      chauffeur: {
        title: "Chauffeur Service",
        description: "Professional drivers for your comfort and safety",
      },
      logistics: {
        title: "Logistics Solutions",
        description: "Efficient transportation and delivery services",
      },
      rental: {
        title: "Car Rental",
        description: "Premium vehicles for your personal use",
      },
    },
  },
  pl: {
    title: "Nasze Usługi",
    description: "Kompleksowe rozwiązania transportowe dla Twoich potrzeb",
    services: {
      chauffeur: {
        title: "Usługi Szoferskie",
        description: "Profesjonalni kierowcy dla Twojego komfortu i bezpieczeństwa",
      },
      logistics: {
        title: "Rozwiązania Logistyczne",
        description: "Wydajne usługi transportowe i dostawcze",
      },
      rental: {
        title: "Wynajem Samochodów",
        description: "Ekskluzywne pojazdy do użytku osobistego",
      },
    },
  },
}

export function Services() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = translations[language]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <UserCheck className="h-10 w-10 mb-4" />
              <CardTitle>{t.services.chauffeur.title}</CardTitle>
              <CardDescription>{t.services.chauffeur.description}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Truck className="h-10 w-10 mb-4" />
              <CardTitle>{t.services.logistics.title}</CardTitle>
              <CardDescription>{t.services.logistics.description}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Car className="h-10 w-10 mb-4" />
              <CardTitle>{t.services.rental.title}</CardTitle>
              <CardDescription>{t.services.rental.description}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}

