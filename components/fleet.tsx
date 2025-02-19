"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export function Fleet() {
  const language = useSelector((state: RootState) => state.language.current)
  const [vehicles, setVehicles] = useState([])

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`/api/vehicles?lang=${language}`).then((res) => console.log("res", res))
      // if (!response.ok) {
      //   throw new Error("Failed to fetch vehicles")
      // }
      // const data = await response.json()
      // setVehicles(data)
    } catch (error) {
      console.log
      toast.error("Failed to fetch vehicles. Please try again.")
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [language])

  return (
    <section id="fleet" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fleet</h2>
          <p className="text-gray-600">Choose the best vehicle for your needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <Card key={index}>
              <CardHeader className="p-0">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                <p className="text-gray-600">{vehicle.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
