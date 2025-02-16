/*
  Warnings:

  - Added the required column `desc` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vehicle` ADD COLUMN `desc` VARCHAR(191) NOT NULL;
