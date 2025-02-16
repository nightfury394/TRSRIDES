"use client"

import { useEffect } from "react"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

declare global {
    interface Window {
        initGoogleMapsAPI: () => void
    }
}

export function GoogleMapsScript() {
    useEffect(() => {
        if (!GOOGLE_MAPS_API_KEY) {
            console.error("Google Maps API key is missing")
            return
        }

        window.initGoogleMapsAPI = () => {
            // This function will be called when the script loads
        }

        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMapsAPI`
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    return null
}

