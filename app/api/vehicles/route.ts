import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";

  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const translatedVehicles = vehicles.map((vehicle) => {
      return {
        id: vehicle.id,
        name: vehicle.name,
        desc: lang === "pl" ? vehicle.descPl ?? vehicle.desc : vehicle.desc,
        image: vehicle.image,
        category: vehicle.category,
        basePrice: vehicle.basePrice,
        pricePerKm: vehicle.pricePerKm,
        passengerCapacity: vehicle.passengerCapacity,
        luggageCapacity: vehicle.luggageCapacity,
        cargoCapacity: vehicle.cargoCapacity,
      };
    });

    return NextResponse.json(translatedVehicles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

const APILAYER_URL =
  "https://api.apilayer.com/language_translation/translate?target=pl";

const translateText = async (text: string) => {
  if (!process.env.TRANSLATION_API_KEY) {
    console.error("TRANSLATION_API_KEY is missing!");
    return text;
  }

  try {
    const response = await fetch(APILAYER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.TRANSLATION_API_KEY as string,
      },
      body: JSON.stringify(text),
    });

    if (!response.ok) {
      throw new Error(`Translation API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translation || text;
  } catch (error) {
    console.error("Translation API Request Failed:", error);
    return text;
  }
};

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // Translate fields
    const namePl = await translateText(body.name);
    const descPl = await translateText(body.desc);
    const vehicle = await prisma.vehicle.create({
      data: {
        name: body.name,
        namePl,
        desc: body.desc,
        descPl,
        image: body.image,
        category: body.category,
        basePrice: parseFloat(body.basePrice),
        pricePerKm: parseFloat(body.pricePerKm),
        passengerCapacity: parseInt(body.passengerCapacity),
        luggageCapacity: parseInt(body.luggageCapacity),
        cargoCapacity: body.cargoCapacity,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { error: "Error creating vehicle" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
