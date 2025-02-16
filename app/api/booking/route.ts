import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { adminNotificationEmail, userConfirmationEmail } from "@/emails";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const booking = await request.json();

  try {
    // Store booking in MySQL using Prisma
    await prisma.booking.create({
      data: {
        userEmail: booking.userEmail,
        serviceType: booking.serviceType,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        pickupDate: new Date(booking.pickupDate),
        pickupTime: booking.pickupTime,
        selectedVehicle: booking.selectedVehicle,
        fare: booking.fare,
      },
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "TRS Rides <info@trsrides.com>",
      to: booking.userEmail,
      subject: "Your TRS Rides Booking Confirmation",
      html: userConfirmationEmail(booking),
    });
    // Send notification email to admin
    await resend.emails.send({
      from: "TRS Rides Bookings <info@trsrides.com>",
      to: "info@trsrides.com",
      subject: "New Booking Received - TRS Rides",
      html: adminNotificationEmail(booking),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: [
        {
          status: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
