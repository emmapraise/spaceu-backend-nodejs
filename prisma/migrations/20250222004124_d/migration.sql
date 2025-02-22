/*
  Warnings:

  - You are about to alter the column `time` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `reservations` MODIFY `time` DATETIME(3) NOT NULL;
