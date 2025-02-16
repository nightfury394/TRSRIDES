import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { X } from "lucide-react"

interface VehicleFormProps {
    onSubmit: (vehicle: Partial<Vehicle>) => void
    initialData?: Partial<Vehicle>
    isLoading: boolean
}

interface Vehicle {
    id?: string
    name: string
    desc: string
    category: string
    basePrice: number
    pricePerKm: number
    passengerCapacity?: number
    luggageCapacity?: number
    cargoCapacity?: string
    image?: string
}

export function VehicleForm({ onSubmit, initialData, isLoading }: VehicleFormProps) {
    const [vehicle, setVehicle] = useState<Partial<Vehicle>>(
        initialData || {
            name: "",
            category: "",
            basePrice: 0,
            pricePerKm: 0,
            image: ""
        },
    )
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setVehicle((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setVehicle((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (imageFile) {
            try {
                const formData = new FormData()
                formData.append("file", imageFile)
                formData.append("upload_preset", "trs-rides")

                const response = await fetch("https://api.cloudinary.com/v1_1/dnkn6bcad/image/upload", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error("Failed to upload image")
                }

                const data = await response.json()
                vehicle.image = data.secure_url
            } catch (error) {
                console.error("Error uploading image:", error)
                toast.error("Failed to upload image. Please try again.")
                return
            }
        }

        onSubmit(vehicle)
    }
    const removeImage = () => {
        setImageFile(null)
        setImagePreview(null)
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4 mb-2">
                {/* Upload Box */}

                {/* Image Preview */}
                {imagePreview ? (
                    <div className="relative w-64">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded-lg shadow-lg object-cover w-full h-40 border border-gray-200"
                        />
                        {/* Remove Button */}
                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 rounded-full shadow-md"
                            onClick={removeImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="image"
                            className="w-80 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-500 transition-all"
                        >
                            <div className="text-center">
                                <p className="text-gray-600 text-sm">Drag & drop or click to upload</p>
                                <p className="text-xs text-gray-400">JPG, PNG</p>
                            </div>
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                )}

            </div>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Vehicle Name
                </label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Vehicle Name"
                    value={vehicle.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Vehicle Description
                </label>
                <Input
                    id="desc"
                    name="desc"
                    placeholder="Vehicle Description"
                    value={vehicle.desc}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <Select value={vehicle.category} onValueChange={(value) => handleSelectChange("category", value)} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="chauffeur">Chauffeur</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="rental">Rental</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
                    Base Price (PLN)
                </label>
                <Input
                    id="basePrice"
                    name="basePrice"
                    type="number"
                    placeholder="Base Price"
                    value={vehicle.basePrice}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="pricePerKm" className="block text-sm font-medium text-gray-700">
                    Price per Km (PLN)
                </label>
                <Input
                    id="pricePerKm"
                    name="pricePerKm"
                    type="number"
                    placeholder="Price per Km"
                    value={vehicle.pricePerKm}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="passengerCapacity" className="block text-sm font-medium text-gray-700">
                    Passenger Capacity
                </label>
                <Input
                    id="passengerCapacity"
                    name="passengerCapacity"
                    type="number"
                    placeholder="Passenger Capacity"
                    value={vehicle.passengerCapacity}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="luggageCapacity" className="block text-sm font-medium text-gray-700">
                    Luggage Capacity
                </label>
                <Input
                    id="luggageCapacity"
                    name="luggageCapacity"
                    type="number"
                    placeholder="Luggage Capacity"
                    value={vehicle.luggageCapacity}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="cargoCapacity" className="block text-sm font-medium text-gray-700">
                    Cargo Capacity
                </label>
                <Input
                    id="cargoCapacity"
                    name="cargoCapacity"
                    placeholder="Cargo Capacity"
                    value={vehicle.cargoCapacity}
                    onChange={handleInputChange}
                />
            </div>



            <Button type="submit" disabled={isLoading} size={"lg"} className="w-full">
                {isLoading ? "Loading..." : initialData ? "Update Vehicle" : "Add Vehicle"}
            </Button>
        </form>
    )
}

