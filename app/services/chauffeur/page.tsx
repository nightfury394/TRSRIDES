"use client"

import Image from "next/image"
import { useSelector } from "react-redux"
import { Car, Clock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RootState } from "@/store/store"
import { chauffeurServiceTranslations } from "@/app/translations/chauffeur-service"

export default function ChauffeurService() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = chauffeurServiceTranslations[language]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Luxury chauffeur service"
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

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.services.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.services.items.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyChooseUs.title}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.whyChooseUs.reasons.map((reason, index) => (
              <Card key={index}>
                <CardHeader>
                  {index === 0 && <Users className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 1 && <Car className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 2 && <Clock className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 3 && <Shield className="w-12 h-12 text-gray-900 mb-4" />}
                  <CardTitle>{reason.title}</CardTitle>
                  <CardDescription>{reason.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks.title}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step) => (
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

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.testimonials.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
                  <p className="text-right font-semibold">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl mb-8">{t.cta.subtitle}</p>
          <Button size="lg" variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
            {t.cta.buttonText}
          </Button>
        </div>
      </section>
    </div>
  )
}

