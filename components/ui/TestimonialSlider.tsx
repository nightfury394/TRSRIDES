"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useState, useEffect } from "react";

const translations = {
    en: {
        testimonials: [
            {
                name: "John Doe",
                feedback: "Amazing service! The ride was smooth, and the driver was extremely professional. The car was spotless, and I felt completely safe throughout the journey.",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
                name: "Jane Smith",
                feedback: "Professional and reliable! Booking was effortless, and the car was spotless inside. The driver was courteous, and the entire experience was stress-free.",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
            },
            {
                name: "Alex Johnson",
                feedback: "Great customer service! The driver arrived on time and was very friendly throughout. It was one of the most comfortable and hassle-free rides I've had.",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
                name: "Michael Brown",
                feedback: "The experience was outstanding! The car was comfortable, and the journey was stress-free. I would highly recommend TRS Rides for business and personal travel.",
                image: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
                name: "Emily Davis",
                feedback: "Smooth ride and easy booking process. I’ll definitely be using TRS Rides again! The car was clean, and the ride was super comfortable from start to finish.",
                image: "https://randomuser.me/api/portraits/women/5.jpg",
            },
            {
                name: "Robert Wilson",
                feedback: "Highly professional chauffeurs! They know the best routes and drive safely. I felt like I was in good hands the entire time, and the car was top-notch.",
                image: "https://randomuser.me/api/portraits/men/6.jpg",
            },
            {
                name: "Sophia Martinez",
                feedback: "Luxurious and comfortable experience! Perfect choice for business and leisure travel. The driver was polite, and the whole process was incredibly seamless.",
                image: "https://randomuser.me/api/portraits/women/7.jpg",
            },
            {
                name: "Daniel White",
                feedback: "Booking was simple, and the vehicle was in excellent condition. Worth every penny! I have used many transport services, but this was by far the best.",
                image: "https://randomuser.me/api/portraits/men/8.jpg",
            },
        ],
    },
    pl: {
        testimonials: [
            {
                name: "Jan Kowalski",
                feedback: "Niesamowita obsługa! Podróż była płynna, a kierowca niezwykle profesjonalny. Samochód był nieskazitelnie czysty, a ja czułem się całkowicie bezpiecznie przez całą podróż.",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
                name: "Anna Nowak",
                feedback: "Profesjonalne i niezawodne! Rezerwacja była łatwa, a samochód był idealnie czysty w środku. Kierowca był uprzejmy, a cała podróż bezstresowa.",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
            },
            {
                name: "Aleksander Wiśniewski",
                feedback: "Świetna obsługa klienta! Kierowca przyjechał punktualnie i był bardzo przyjazny. To była jedna z najbardziej komfortowych i bezproblemowych podróży, jakie miałem.",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
                name: "Michał Brąz",
                feedback: "Doświadczenie było wyjątkowe! Samochód był komfortowy, a podróż bezstresowa. Zdecydowanie polecam TRS Rides do podróży biznesowych i osobistych.",
                image: "https://randomuser.me/api/portraits/men/4.jpg",
            },
            {
                name: "Emilia Kowalska",
                feedback: "Płynna jazda i łatwy proces rezerwacji. Na pewno skorzystam z TRS Rides ponownie! Samochód był czysty, a podróż super komfortowa od początku do końca.",
                image: "https://randomuser.me/api/portraits/women/5.jpg",
            },
            {
                name: "Robert Wilk",
                feedback: "Kierowcy o wysokim profesjonalizmie! Znają najlepsze trasy i jeżdżą bezpiecznie. Czułem się w dobrych rękach przez całą podróż, a samochód był na najwyższym poziomie.",
                image: "https://randomuser.me/api/portraits/men/6.jpg",
            },
            {
                name: "Zofia Martinez",
                feedback: "Luksusowe i komfortowe doświadczenie! Idealny wybór do podróży służbowych i rekreacyjnych. Kierowca był uprzejmy, a cały proces był niezwykle bezproblemowy.",
                image: "https://randomuser.me/api/portraits/women/7.jpg",
            },
            {
                name: "Daniel Biały",
                feedback: "Rezerwacja była prosta, a pojazd w doskonałym stanie. Warto każdą złotówkę! Korzystałem z wielu usług transportowych, ale ta była zdecydowanie najlepsza.",
                image: "https://randomuser.me/api/portraits/men/8.jpg",
            },
        ],
    },
};

const TestimonialSlider = () => {
    const language = useSelector((state: RootState) => state.language.current);
    const t = translations[language];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % t.testimonials.length);
        }, 3000); // Changes every 3 seconds

        return () => clearInterval(interval);
    }, [t.testimonials.length]);

    return (
        <div className="w-full mx-auto p-6 rounded-lg text-center relative">
            <div className="p-4 md:p-8 w-full mx-auto text-center">
                <img
                    src={t.testimonials[currentIndex].image}
                    className="w-32 h-32 rounded-full border-4 border-black mb-6 mx-auto shadow-lg"
                    alt={t.testimonials[currentIndex].name}
                />
                <p className="text-lg text-white italic mb-6 px-0 md:px-4 leading-relaxed">{t.testimonials[currentIndex].feedback}</p>
                <h3 className="text-2xl font-semibold text-gray-800">{t.testimonials[currentIndex].name}</h3>
            </div>

            {/* Dots for navigation */}
            <div className="flex justify-center mt-4 space-x-2">
                {t.testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default TestimonialSlider;
