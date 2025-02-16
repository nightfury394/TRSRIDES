"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { VehicleForm } from "@/components/vehicle-form"
import { Pencil, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import Image from "next/image"


interface Vehicle {
    id: string
    name: string
    desc: string
    image: string
    category: string
    basePrice: number
    pricePerKm: number
    passengerCapacity?: number
    luggageCapacity?: number
    cargoCapacity?: string
}

export default function AdminVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
    const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchVehicles = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/vehicles")
            if (!response.ok) {
                const errorData = await response.json()
                const errorMessage = errorData.message || "Failed to fetch vehicles"
                throw new Error(errorMessage)
            }
            const data = await response.json()
            setVehicles(data)
        } catch (error) {
            console.error("Error:", error)
            toast.error('Failed to fetch vehicles. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    const handleSubmit = async (vehicle: Partial<Vehicle>) => {
        setIsLoading(true)
        try {
            const method = editingVehicle ? "PUT" : "POST"
            const url = editingVehicle ? `/api/vehicles/${editingVehicle.id}` : "/api/vehicles"
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vehicle),
            })
            if (!response.ok) {
                const errorData = await response.json()
                const errorMessage = errorData.message || `Failed to ${editingVehicle ? "update" : "add"} vehicle`
                throw new Error(errorMessage)
            }
            toast.success(`Vehicle ${editingVehicle ? "updated" : "added"} successfully.`)
            setIsDialogOpen(false)
            fetchVehicles()
            setEditingVehicle(null)
        } catch (error) {
            toast.error(`Failed to ${editingVehicle ? "update" : "add"} vehicle. Please try again`)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (deletingVehicle) {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/vehicles/${deletingVehicle.id}`, {
                    method: "DELETE",
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    const errorMessage = errorData.message || "Failed to delete vehicle"
                    throw new Error(errorMessage)
                }
                toast.success("Vehicle deleted successfully.")
                fetchVehicles()
            } catch (error) {
                console.error("Error:", error)
                toast.error(`Failed to delete vehicle. Please try again. `)
            } finally {
                setIsLoading(false)
                setIsDeleteDialogOpen(false)
                setDeletingVehicle(null)
            }
        }
    }

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle)
        setIsDialogOpen(true)
    }

    const openDeleteDialog = (vehicle: Vehicle) => {
        setDeletingVehicle(vehicle)
        setIsDeleteDialogOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto py-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold">Vehicle Management</CardTitle>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setEditingVehicle(null)}>Add New Vehicle</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-center">{editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
                                </DialogHeader>
                                <VehicleForm onSubmit={handleSubmit} initialData={editingVehicle!} isLoading={isLoading} />
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Base Price</TableHead>
                                    <TableHead>Price per Km</TableHead>
                                    <TableHead>Passenger Capacity</TableHead>
                                    <TableHead>Luggage Capacity</TableHead>
                                    <TableHead>Cargo Capacity</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vehicles.map((vehicle) => (
                                    <TableRow key={vehicle.id} className="h-10">
                                        <TableCell><Image
                                            src={vehicle.image || "/placeholder.svg"}
                                            alt={vehicle.name}
                                            width={40}
                                            height={32}
                                            className="rounded-md"
                                        />
                                        </TableCell>
                                        <TableCell>{vehicle.name}</TableCell>
                                        <TableCell>{vehicle.category}</TableCell>
                                        <TableCell>PLN{vehicle.basePrice.toFixed(2)}</TableCell>
                                        <TableCell>PLN{vehicle.pricePerKm.toFixed(2)}</TableCell>
                                        <TableCell>{vehicle.passengerCapacity || "N/A"}</TableCell>
                                        <TableCell>{vehicle.luggageCapacity || "N/A"}</TableCell>
                                        <TableCell>{vehicle.cargoCapacity || "N/A"}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button variant="outline" size="icon" onClick={() => handleEdit(vehicle)} disabled={isLoading}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => openDeleteDialog(vehicle)}
                                                disabled={isLoading}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this vehicle? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

