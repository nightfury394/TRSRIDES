-- CreateTable
CREATE TABLE `Vehicle` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `basePrice` DOUBLE NOT NULL,
    `pricePerKm` DOUBLE NOT NULL,
    `passengerCapacity` INTEGER NULL,
    `luggageCapacity` INTEGER NULL,
    `cargoCapacity` VARCHAR(191) NULL,
    `amenities` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
