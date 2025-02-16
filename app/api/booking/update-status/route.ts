import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { bookingId, status } = await request.json();

    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
