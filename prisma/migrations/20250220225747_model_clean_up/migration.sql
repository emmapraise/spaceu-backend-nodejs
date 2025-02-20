/*
  Warnings:

  - You are about to drop the column `service_id` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `hero_image_id` on the `spaces` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `spaces` table. All the data in the column will be lost.
  - You are about to drop the `_ImageToService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ImageToService` DROP FOREIGN KEY `_ImageToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ImageToService` DROP FOREIGN KEY `_ImageToService_B_fkey`;

-- DropForeignKey
ALTER TABLE `_images` DROP FOREIGN KEY `_images_A_fkey`;

-- DropForeignKey
ALTER TABLE `packages` DROP FOREIGN KEY `packages_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `services_space_id_fkey`;

-- DropForeignKey
ALTER TABLE `spaces` DROP FOREIGN KEY `spaces_hero_image_id_fkey`;

-- DropForeignKey
ALTER TABLE `spaces` DROP FOREIGN KEY `spaces_imageId_fkey`;

-- DropIndex
DROP INDEX `packages_service_id_fkey` ON `packages`;

-- DropIndex
DROP INDEX `reservations_user_id_fkey` ON `reservations`;

-- DropIndex
DROP INDEX `spaces_hero_image_id_fkey` ON `spaces`;

-- DropIndex
DROP INDEX `spaces_imageId_fkey` ON `spaces`;

-- AlterTable
ALTER TABLE `packages` DROP COLUMN `service_id`;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `user_id`,
    ADD COLUMN `is_booked` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `spaces` DROP COLUMN `hero_image_id`,
    DROP COLUMN `imageId`,
    ADD COLUMN `hero_video_id` INTEGER NULL,
    ADD COLUMN `parent_space_id` INTEGER NULL,
    ADD COLUMN `spotlight_description` VARCHAR(191) NULL,
    ADD COLUMN `spotlight_headline` VARCHAR(191) NULL,
    ADD COLUMN `spotlight_image_id` INTEGER NULL,
    ADD COLUMN `sub_title` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'space';

-- DropTable
DROP TABLE `_ImageToService`;

-- DropTable
DROP TABLE `images`;

-- DropTable
DROP TABLE `services`;

-- CreateTable
CREATE TABLE `media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_hero_video_id_fkey` FOREIGN KEY (`hero_video_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_spotlight_image_id_fkey` FOREIGN KEY (`spotlight_image_id`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_parent_space_id_fkey` FOREIGN KEY (`parent_space_id`) REFERENCES `spaces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_images` ADD CONSTRAINT `_images_A_fkey` FOREIGN KEY (`A`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
