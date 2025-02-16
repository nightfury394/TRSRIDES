import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const vehicleData = await request.json();
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name: vehicleData.name ?? undefined,
        desc: vehicleData.name ?? desc,
        image: vehicleData.image ?? undefined,
        category: vehicleData.category ?? undefined,
        basePrice: vehicleData.basePrice
          ? parseFloat(vehicleData.basePrice)
          : undefined,
        pricePerKm: vehicleData.pricePerKm
          ? parseFloat(vehicleData.pricePerKm)
          : undefined,
        passengerCapacity: vehicleData.passengerCapacity
          ? parseInt(vehicleData.passengerCapacity)
          : undefined,
        luggageCapacity: vehicleData.luggageCapacity
          ? parseInt(vehicleData.luggageCapacity)
          : undefined,
        cargoCapacity: vehicleData.cargoCapacity ?? undefined,
      },
    });
    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.vehicle.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
