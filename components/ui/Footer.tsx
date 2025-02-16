"use client"
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Facebook, Twitter, Instagram, PhoneCall, MapPin, Clock, Phone, Mail } from "lucide-react";


const translations = {
    en: {
        company: "TRS Rides ",
        description: "Reliable 24/7 car rental, logistics, and chauffeur services across Poland.",
        contact: "Contact Us",
        address: "Warsaw, Poland",
        phone: "+48 512 376 189",
        email: "info@trsrides.com",
        social: "Follow Us",
        instagram: "https://www.instagram.com/trs.rides?igsh=OHVibmVzdjljNHFs",
        facebook: "https://www.facebook.com/share/15kM8upLCP/?mibextid=wwXIfr",
        timing: "Open 24/7",
        privacyPolicy: "Privacy Policy",
        cookiesPolicy: "Cookies Policy",
        termsAndConditions: "Terms and Conditions",
        about: "About Us",
        services: "Our Services",
    },
    pl: {
        company: "TRS Rides ",
        description: "Niezawodne usługi wynajmu samochodów, logistyki i szofera 24/7 w całej Polsce.",
        contact: "Skontaktuj się z nami",
        address: "Warszawa, Polska",
        phone: "+48 512 376 189",
        email: "info@trsrides.com",
        social: "Śledź nas",
        instagram: "https://www.instagram.com/trs.rides?igsh=OHVibmVzdjljNHFs",
        facebook: "https://www.facebook.com/share/15kM8upLCP/?mibextid=wwXIfr",
        timing: "Otwarte 24/7",
        privacyPolicy: "Polityka prywatności",
        cookiesPolicy: "Polityka cookies",
        termsAndConditions: "Warunki użytkowania",
        about: "O nas",
        services: "Nasze usługi",
    }
};


const Header = () => {
    const language = useSelector((state: RootState) => state.language.current);
    const t = translations[language] || translations.en;

    return (
        <header className=" bg-gray-900 text-white py-4 border-b border-gray-700">
            <div className="container w-full mx-auto flex flex-col md:flex-row justify-between items-center lg:gap-8">

                {/* Left Section (Hidden on Mobile, Improved for Large Screens) */}
                <div className="hidden md:flex gap-8 lg:gap-12">
                    {/* Address */}
                    <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
                        <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                        <span>{t.address}</span>
                    </div>

                    {/* Timing */}
                    <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
                        <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                        <span>{t.timing}</span>
                    </div>
                </div>

                {/* Phone Number (Visible on All Screens, Larger on Large Screens) */}




                <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-sm md:text-base lg:text-lg text-blue-400 hover:text-blue-300">
                    <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="font-semibold">{t.phone}</span>
                </a>

                {/* Social Icons (Hidden on Mobile, Larger on Large Screens) */}
                <div className="hidden md:flex items-center gap-5 lg:gap-6">
                    <a href={t.facebook} className="text-gray-400 hover:text-white"><Facebook className="w-5 h-5 lg:w-6 lg:h-6" /></a>
                    <a href={t.instagram} className="text-gray-400 hover:text-white"><Instagram className="w-5 h-5 lg:w-6 lg:h-6" /></a>
                </div>
            </div>
        </header>
    );
};

const Footer = () => {
    const language = useSelector((state: RootState) => state.language.current)
    const t = translations[language] || translations.en

    return (
        <footer className="w-full bg-gray-900 text-white">
            {/* Top Info Section */}
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700">
                <div className="flex items-center gap-4 justify-center">
                    <MapPin className="w-12 h-12 text-gray-400 flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-semibold mb-1">ADDRESS</h3>
                        <p className="text-gray-300">{t.address}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-center">
                    <Phone className="w-12 h-12 text-gray-400 flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-semibold mb-1">PHONES</h3>
                        <a href={`tel:${t.phone}`} className="text-gray-300 hover:text-white">
                            {t.phone}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-center">
                    <Clock className="w-12 h-12 text-gray-400 flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-semibold mb-1">WORKING HOURS</h3>
                        <p className="text-gray-300">{t.timing}</p>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white  border-gray-700 pb-2">{t.about}</h3>
                        <img src="/logo.jpg" alt="TRS Rides" className="w-32 h-32 mb-4" />
                        <p className="text-gray-300 leading-relaxed">{t.description}</p>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white  border-gray-700 pb-2">{t.services}</h3>
                        <ul className="text-gray-300 space-y-2">
                            <li>Airport Transfers</li>
                            <li>City Tours</li>
                            <li>Corporate Services</li>
                            <li>Events & Weddings</li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white  border-gray-700 pb-2">{t.contact}</h3>
                        <div className="space-y-3">
                            <p className="text-gray-300 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                {t.address}
                            </p>
                            <p className="text-gray-300 flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                {t.phone}
                            </p>
                            <p className="text-gray-300 flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                {t.email}
                            </p>
                        </div>
                    </div>

                    {/* GDPR Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white  border-gray-700 pb-2">GDPR</h3>
                        <ul className="text-gray-300 space-y-2">
                            <li>
                                <a href="/privacy-policy" className="hover:text-white">
                                    {t.privacyPolicy}
                                </a>
                            </li>
                            <li>
                                <a href="/cookies-policy" className="hover:text-white">
                                    {t.cookiesPolicy}
                                </a>
                            </li>
                            <li>
                                <a href="/terms-and-conditions" className="hover:text-white">
                                    {t.termsAndConditions}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} TRS Rides. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href={t.facebook} className="text-gray-400 hover:text-white">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href={t.instagram} className="text-gray-400 hover:text-white">
                            <Instagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export { Header, Footer };
