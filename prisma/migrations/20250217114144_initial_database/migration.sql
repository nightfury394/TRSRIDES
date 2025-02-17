-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('NEW', 'START', 'COMPLETE');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "selectedVehicle" TEXT NOT NULL,
    "fare" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "namePl" TEXT,
    "desc" TEXT NOT NULL,
    "descPl" TEXT,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "pricePerKm" DOUBLE PRECISION NOT NULL,
    "passengerCapacity" INTEGER,
    "luggageCapacity" INTEGER,
    "cargoCapacity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);
