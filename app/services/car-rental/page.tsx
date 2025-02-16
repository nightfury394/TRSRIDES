"use client"

import Image from "next/image"
import { Car, CheckCircle, Clock, Shield } from "lucide-react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { RootState } from "@/store/store"
import { carRentalTranslations } from "@/app/translations/car-rental"
import Link from "next/link"

export default function CarRental() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = carRentalTranslations[language]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Luxury car fleet"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{t.hero.subtitle}</p>
          <Button size="lg" className="bg-gray-900 hover:bg-gray-900  text-gra-900 hover:text-white">
            {t.hero.cta}
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.benefits.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.cards.map((card, index) => (
              <Card key={index}>
                <CardHeader>
                  {index === 0 && <Car className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 1 && <Clock className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 2 && <Shield className="w-12 h-12 text-gray-900 mb-4" />}
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.fleet.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.fleet.vehicles.map((vehicle) => (
              <Card key={vehicle.name}>
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt={vehicle.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{vehicle.name}</CardTitle>
                  <CardDescription>{vehicle.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4">
                    <Link href="/">{t.fleet.bookNow}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.process.title}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.process.steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.faq.title}</h2>
          <Accordion type="single" collapsible className="max-w-5xl mx-auto">
            {t.faq.questions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}

