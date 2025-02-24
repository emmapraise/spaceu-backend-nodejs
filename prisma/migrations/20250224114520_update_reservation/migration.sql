/*
  Warnings:

  - You are about to drop the column `time` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `time`,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL;
