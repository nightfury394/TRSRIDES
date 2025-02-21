import { Providers } from "@/components/providers";
import type React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TRS Rides - Premium Transportation Services",
    description: "Premium transportation services for chauffeur, logistics, and car rental needs.",
    metadataBase: new URL("https://trs-ride.vercel.app"),
    openGraph: {
        title: "TRS Rides - Premium Transportation Services",
        description: "Book your premium ride for chauffeur services, logistics solutions, or car rentals.",
        url: "https://trs-ride.vercel.app",
        siteName: "TRS Rides",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "https://trs-ride.vercel.app/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "TRS Rides - Premium Ride Preview",
                type: "image/jpeg",
            },
        ],
    },
    facebook: {
        url: "https://www.facebook.com/share/15kM8upLCP/?mibextid=wwXIfr",
    },
    instagram: {
        url: "https://www.instagram.com/trs.rides?igsh=OHVibmVzdjljNHFs",
    },
    keywords: ["transportation", "chauffeur", "logistics", "car rental", "premium ride"],
    authors: [{ name: "TRS Rides Team" }],
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    )
}

