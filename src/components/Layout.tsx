import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import LanguageSelector from "./LanguageSelector"
import { Outlet } from "react-router-dom"

const translations = {
  en: {
    services: "Services",
    fleet: "Our Fleet",
    contact: "Contact",
    book: "Book Now",
  },
  pl: {
    services: "Usługi",
    fleet: "Nasza Flota",
    contact: "Kontakt",
    book: "Zarezerwuj",
  },
}

export default function Layout() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = translations[language]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold">
                TRS Rides
              </a>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="/services" className="text-gray-600 hover:text-gray-900">
                {t.services}
              </a>
              <a href="/fleet" className="text-gray-600 hover:text-gray-900">
                {t.fleet}
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">
                {t.contact}
              </a>
              <LanguageSelector />
              <button className="bg-black text-white px-4 py-2 rounded-lg">{t.book}</button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

