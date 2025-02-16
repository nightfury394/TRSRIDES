-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `serviceType` VARCHAR(191) NOT NULL,
    `pickupLocation` VARCHAR(191) NOT NULL,
    `dropoffLocation` VARCHAR(191) NOT NULL,
    `pickupDate` DATETIME(3) NOT NULL,
    `pickupTime` VARCHAR(191) NOT NULL,
    `selectedVehicle` VARCHAR(191) NOT NULL,
    `fare` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
