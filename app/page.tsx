"use client"

import { BookingForm } from "@/components/booking-form"
import ContactSupport from "@/components/ContactSupport"
import { Fleet } from "@/components/fleet"
import { Navigation } from "@/components/navigation"
import { Services } from "@/components/services"
import WhyChooseUs from "@/components/ui/FAQAccordion"
import WhyChooseUsAccordion from "@/components/ui/FAQAccordion"
import { Footer, Header } from "@/components/ui/Footer"
import TestimonialSlider from "@/components/ui/TestimonialSlider"
import { store } from "@/store/store"
import { MessageCircle, Phone, X } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { Provider } from "react-redux"
import Typewriter from 'typewriter-effect';


export default function Home() {

  return (
    <Provider store={store}>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <section className="relative min-h-[800px] py-20">
            <div className="absolute inset-0 z-0">
              <Image
                src="/hero.jpg"
                alt="Luxury car fleet"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
            </div>
            <div className="container mx-auto px-4 relative z-10 pt-20">
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-5xl font-bold mb-4 text-white">
                  <Typewriter
                    options={{
                      strings: ['TRS Rides'],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 100,
                    }}
                  />
                </h1>
                <div className="text-xl text-gray-200 animate-slide-up">
                  <Typewriter
                    options={{
                      strings: ['Premium Transportation Services in Poland'],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 100,
                    }}
                  />
                </div>
              </div>
              <BookingForm />
            </div>
          </section>
          <Services />
          <Fleet />
          <section id="testimonials" className="py-20 bg-gray-800 relative">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://via.placeholder.com/1920x1080.png?text=Luxury+Car+Interior"
                alt="Luxury car interior"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="opacity-25"
              />
            </div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Customer Testimonials</h2>
              <p className="text-gray-300">What our clients say about us</p>
              <TestimonialSlider />
            </div>
          </section>
          <section id="faq" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Why choose us?</h2>
              <WhyChooseUs />
            </div>
          </section>
          <Footer />
          <ContactSupport />
        </main>
      </div>
    </Provider>
  )
}

