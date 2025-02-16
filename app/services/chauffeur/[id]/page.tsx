"use client"

import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import Image from "next/image"
import { CheckCircle, Star, Clock, Shield, Users, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { RootState } from "@/store/store"
import { chauffeurServiceTranslations } from "@/app/translations/chauffeur-service"
import { chauffeurServices } from "@/app/data/chauffeur-services"
import Link from "next/link"

export default function ChauffeurServicePage() {
  const params = useParams()
  const language = useSelector((state: RootState) => state.language.current)
  const t = chauffeurServiceTranslations[language]

  const service = chauffeurServices.find((s) => s.id === params.id)
  const serviceContent = service ? t.services[service.titleKey] : null

  if (!service || !serviceContent) {
    return <div>Service not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={service.imageUrl || "/placeholder.svg"}
            alt={serviceContent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{serviceContent.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{serviceContent.description}</p>
          <Button size="lg" className="bg-gray-900 hover:bg-gray-900  text-gra-900 hover:text-white">
            {t.hero.cta}
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{serviceContent.introTitle}</h2>
            <p className="text-lg text-gray-700 mb-8">{serviceContent.introText}</p>
            <div className="flex justify-center space-x-4">
              {serviceContent.keyPoints.map((point, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{serviceContent.featuresTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceContent.features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                    {index % 3 === 0 && <Star className="w-6 h-6 text-white" />}
                    {index % 3 === 1 && <Shield className="w-6 h-6 text-white" />}
                    {index % 3 === 2 && <ThumbsUp className="w-6 h-6 text-white" />}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyChooseUs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyChooseUs.reasons.map((reason, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  {index === 0 && <Users className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 1 && <Clock className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 2 && <Shield className="w-12 h-12 text-gray-900 mb-4" />}
                  {index === 3 && <Star className="w-12 h-12 text-gray-900 mb-4" />}
                  <CardTitle>{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{reason.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.testimonials.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gray-900"
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
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
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
              {t.cta.buttonText}
            </Link>
            <Link href="/contact-us" className="border-white text-white hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg border">
              {t.cta.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.faq.title}</h2>
          <Accordion type="single" collapsible className="max-w-5xl mx-auto">
            {t.faq.questions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
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

