"use client"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/ui/Footer"
import type React from "react"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="min-h-screen bg-gray-50 flex-1">
                <Header />
                <Navigation />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="container mx-auto px-6 py-8">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    )
}
