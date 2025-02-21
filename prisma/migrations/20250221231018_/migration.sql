/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `media` will be added. If there are existing duplicate values, this will fail.
  - Made the column `filename` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public_id` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `media` MODIFY `filename` VARCHAR(191) NOT NULL,
    MODIFY `public_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `media_public_id_key` ON `media`(`public_id`);
