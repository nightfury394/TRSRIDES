'use client'

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Shield, Clock, Award, MapPin, UserCheck, CreditCard, Car, Headphones, Sparkles } from 'lucide-react'

const translations = {
    en: {
        reasons: [
            {
                title: "Premium Fleet",
                description: "Access our luxurious fleet of high-end vehicles, meticulously maintained to ensure the utmost comfort and safety for every journey.",
                icon: Car
            },
            {
                title: "Professional Chauffeurs",
                description: "Our experienced, professionally trained drivers guarantee a safe, punctual, and comfortable ride. They're committed to providing exceptional service on every trip.",
                icon: UserCheck
            },
            {
                title: "24/7 Availability",
                description: "Enjoy round-the-clock service with flexible booking options. Whether it's an early morning flight or a late-night event, we're always ready to serve you.",
                icon: Clock
            },
            {
                title: "Nationwide Coverage",
                description: "Benefit from our extensive network covering all major cities and airports across Poland. No matter where you are, our premium service is within reach.",
                icon: MapPin
            },
            {
                title: "Safety First",
                description: "Your safety is our top priority. We implement rigorous safety protocols and offer fully insured services, giving you complete peace of mind during your travels.",
                icon: Shield
            },
            {
                title: "Award-Winning Service",
                description: "Experience excellence with our award-winning luxury transportation. We're recognized for our commitment to exceptional customer satisfaction and service quality.",
                icon: Award
            },
            {
                title: "Flexible Payment",
                description: "Choose from multiple secure payment methods including credit cards, corporate accounts, and online transfers. We make transactions convenient and hassle-free.",
                icon: CreditCard
            },
            {
                title: "Premium Support",
                description: "Our dedicated customer service team is available 24/7 to assist with any queries or special requests. We're committed to ensuring your experience is nothing short of perfect.",
                icon: Headphones
            },
            {
                title: "Extra Services",
                description: "Enhance your travel experience with our complementary amenities, including Wi-Fi, refreshments, and personalized services tailored to your preferences.",
                icon: Sparkles
            }
        ]
    },
    pl: {
        reasons: [
            {
                title: "Ekskluzywna Flota",
                description: "Skorzystaj z naszej luksusowej floty pojazdów wysokiej klasy, starannie utrzymanych, aby zapewnić najwyższy komfort i bezpieczeństwo podczas każdej podróży.",
                icon: Car
            },
            {
                title: "Profesjonalni Kierowcy",
                description: "Nasi doświadczeni, profesjonalnie przeszkoleni kierowcy gwarantują bezpieczną, punktualną i komfortową jazdę. Są zobowiązani do zapewnienia wyjątkowej obsługi podczas każdej podróży.",
                icon: UserCheck
            },
            {
                title: "Dostępność 24/7",
                description: "Korzystaj z całodobowej obsługi z elastycznymi opcjami rezerwacji. Niezależnie od tego, czy chodzi o wczesny poranny lot, czy późną imprezę, zawsze jesteśmy gotowi Ci służyć.",
                icon: Clock
            },
            {
                title: "Zasięg Ogólnokrajowy",
                description: "Skorzystaj z naszej rozległej sieci obejmującej wszystkie główne miasta i lotniska w Polsce. Bez względu na to, gdzie jesteś, nasza najwyższej jakości usługa jest w zasięgu ręki.",
                icon: MapPin
            },
            {
                title: "Bezpieczeństwo Przede Wszystkim",
                description: "Twoje bezpieczeństwo jest naszym najwyższym priorytetem. Wdrażamy rygorystyczne protokoły bezpieczeństwa i oferujemy w pełni ubezpieczone usługi, zapewniając Ci całkowity spokój ducha podczas podróży.",
                icon: Shield
            },
            {
                title: "Nagradzana Obsługa",
                description: "Doświadcz doskonałości z naszym nagradzanym luksusowym transportem. Jesteśmy uznani za nasze zaangażowanie w wyjątkowe zadowolenie klienta i jakość usług.",
                icon: Award
            },
            {
                title: "Elastyczne Płatności",
                description: "Wybieraj spośród wielu bezpiecznych metod płatności, w tym kart kredytowych, kont firmowych i przelewów online. Sprawiamy, że transakcje są wygodne i bezproblemowe.",
                icon: CreditCard
            },
            {
                title: "Wsparcie Premium",
                description: "Nasz dedykowany zespół obsługi klienta jest dostępny 24/7, aby pomóc w każdym zapytaniu lub specjalnej prośbie. Jesteśmy zobowiązani do zapewnienia, że Twoje doświadczenie będzie perfekcyjne.",
                icon: Headphones
            },
            {
                title: "Dodatkowe Usługi",
                description: "Wzbogać swoje doświadczenie podróży o nasze komplementarne udogodnienia, w tym Wi-Fi, przekąski i spersonalizowane usługi dostosowane do Twoich preferencji.",
                icon: Sparkles
            }
        ]
    }
}

export default function WhyChooseUs() {
    const language = useSelector((state: RootState) => state.language.current)
    const t = translations[language]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full bg-primary/10 mr-4">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-sm md:text-lg">{reason.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm md:text-lg flex-grow md:pl-12 md:text-left text-justify">
                            {reason.description}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
