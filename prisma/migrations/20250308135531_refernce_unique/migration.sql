/*
  Warnings:

  - A unique constraint covering the columns `[references]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `is_confirmed` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `bookings_references_key` ON `bookings`(`references`);
