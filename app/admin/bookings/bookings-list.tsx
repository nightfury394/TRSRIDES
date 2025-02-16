"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

interface Booking {
    id: string
    userEmail: string
    serviceType: string
    pickupLocation: string
    dropoffLocation: string
    pickupDate: string
    pickupTime: string
    selectedVehicle: string
    fare: number
    status: string
    createdAt: string
}

interface BookingsListProps {
    initialBookings: Booking[]
}

export default function BookingsList({ initialBookings }: BookingsListProps) {
    const [statusFilter, setStatusFilter] = useState("all")
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setBookings(initialBookings)
        setFetching(false)
    }, [initialBookings])

    const filteredBookings =
        statusFilter === "all" ? bookings : bookings.filter((booking) => booking.status === statusFilter)

    const updateStatus = async (bookingId: string, newStatus: string) => {
        setLoading(true)
        try {
            const response = await fetch("/api/booking/update-status", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId, status: newStatus }),
            })

            if (response.ok) {
                setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
                router.refresh()
            }
        } catch (error) {
            console.error("Error updating status:", error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "NEW":
                return "bg-blue-500 text-white border border-blue-600";
            case "START":
                return "bg-gray-900 text-white border border-yellow-600";
            case "COMPLETE":
                return "bg-green-500 text-white border border-green-600";
            default:
                return "bg-gray-500 text-white border border-gray-600";
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
        )
    }


    return (
        <Card className="mt-6">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="NEW">New</SelectItem>
                            <SelectItem value="START">Started</SelectItem>
                            <SelectItem value="COMPLETE">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Email</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Pickup</TableHead>
                                <TableHead>Dropoff</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Fare</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking.userEmail}</TableCell>
                                    <TableCell className="capitalize">{booking.serviceType}</TableCell>
                                    <TableCell>{booking.pickupLocation}</TableCell>
                                    <TableCell>{booking.dropoffLocation}</TableCell>
                                    <TableCell>
                                        {format(new Date(booking.pickupDate), "dd MMM yyyy, EEEE")} at {format(new Date(`1970-01-01T${booking.pickupTime}`), "hh:mm a")}
                                    </TableCell>
                                    <TableCell className="capitalize">{booking.selectedVehicle}</TableCell>
                                    <TableCell>${booking.fare.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 text-sm font-normal text-center rounded-md ${getStatusStyles(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {booking.status === "NEW" && (
                                            <Button size="sm" onClick={() => updateStatus(booking.id, "START")} disabled={loading}>
                                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Start"}
                                            </Button>
                                        )}
                                        {booking.status === "START" && (
                                            <Button size="sm" onClick={() => updateStatus(booking.id, "COMPLETE")} disabled={loading}>
                                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Complete"}
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
