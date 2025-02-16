"use client"

import { useEffect, useState } from "react"

declare global {
    interface Window {
        google: any
    }
}

let googleMapsScriptLoaded = false

export const useGoogleMapsApi = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadError, setLoadError] = useState<Error | null>(null)

    useEffect(() => {
        if (!googleMapsScriptLoaded) {
            const script = document.createElement("script")
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
            script.async = true
            script.onerror = () => {
                setLoadError(new Error("Failed to load Google Maps API"))
            }
            script.onload = () => {
                googleMapsScriptLoaded = true
                setIsLoaded(true)
            }
            document.head.appendChild(script)
        } else {
            setIsLoaded(true)
        }
    }, [])

    return { isLoaded, loadError }
}

export const searchLocations = (input: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        if (!window.google) {
            reject(new Error("Google Maps API not loaded"))
            return
        }

        const autocompleteService = new window.google.maps.places.AutocompleteService()
        autocompleteService.getPlacePredictions(
            { input },
            (
                predictions: google.maps.places.AutocompletePrediction[] | null,
                status: google.maps.places.PlacesServiceStatus,
            ) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    resolve(predictions.map((p) => p.description))
                } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                    resolve([])
                } else {
                    reject(new Error(`Google Maps Places Service error: ${status}`))
                }
            },
        )
    })
}

export const calculateDistance = (origin: string, destination: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        if (!window.google) {
            reject(new Error('Google Maps API not loaded'));
            return;
        }

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.METRIC,
            },
            (response: google.maps.DistanceMatrixResponse, status: google.maps.DistanceMatrixStatus) => {
                if (status === window.google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status === 'OK') {
                    const distanceInMeters = response.rows[0].elements[0].distance.value;
                    const distanceInKm = distanceInMeters / 1000;
                    resolve(distanceInKm);
                } else {
                    reject(new Error('Unable to calculate distance'));
                }
            }
        );
    });
};
