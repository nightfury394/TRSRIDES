"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Users, Settings, ChevronLeft, ChevronRight, Car } from "lucide-react"

const menuItems = [
    { id: 1, label: "Bookings", icon: Home, link: "/admin/bookings" },
    { id: 2, label: "Vehicles", icon: Car, link: "/admin/vehicles" },

]

export default function DashboardSidebar() {
    const [expanded, setExpanded] = useState(true)
    const pathname = usePathname()

    return (
        <aside className={`bg-gray-800 text-white ${expanded ? "w-64" : "w-20"} transition-all duration-300 ease-in-out`}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-4">
                    {expanded && <span className="text-2xl font-semibold">TRS Rides</span>}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="p-2 space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <Link href={item.link} passHref>
                                    <span
                                        className={`flex items-center p-2 rounded-lg ${pathname === item.link ? "bg-gray-700" : "hover:bg-gray-700"} cursor-pointer`}
                                    >
                                        <item.icon size={20} />
                                        {expanded && <span className="ml-3">{item.label}</span>}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

