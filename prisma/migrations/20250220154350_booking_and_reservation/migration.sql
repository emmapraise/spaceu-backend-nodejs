/*
  Warnings:

  - You are about to drop the column `image_id` on the `spaces` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `packages` DROP FOREIGN KEY `packages_space_id_fkey`;

-- DropForeignKey
ALTER TABLE `spaces` DROP FOREIGN KEY `spaces_image_id_fkey`;

-- DropIndex
DROP INDEX `packages_space_id_fkey` ON `packages`;

-- DropIndex
DROP INDEX `spaces_image_id_fkey` ON `spaces`;

-- AlterTable
ALTER TABLE `packages` ADD COLUMN `duration` INTEGER NULL,
    ADD COLUMN `service_id` INTEGER NULL,
    MODIFY `space_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `spaces` DROP COLUMN `image_id`,
    ADD COLUMN `imageId` INTEGER NULL;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `space_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `space_id` INTEGER NOT NULL,
    `package_id` INTEGER NULL,
    `price` DOUBLE NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `booking_id` INTEGER NULL,
    `duration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservation_id` INTEGER NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `has_paid` BOOLEAN NOT NULL DEFAULT false,
    `references` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_images` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_images_AB_unique`(`A`, `B`),
    INDEX `_images_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImageToService` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ImageToService_AB_unique`(`A`, `B`),
    INDEX `_ImageToService_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_space_id_fkey` FOREIGN KEY (`space_id`) REFERENCES `spaces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_space_id_fkey` FOREIGN KEY (`space_id`) REFERENCES `spaces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_space_id_fkey` FOREIGN KEY (`space_id`) REFERENCES `spaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_images` ADD CONSTRAINT `_images_A_fkey` FOREIGN KEY (`A`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_images` ADD CONSTRAINT `_images_B_fkey` FOREIGN KEY (`B`) REFERENCES `spaces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToService` ADD CONSTRAINT `_ImageToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToService` ADD CONSTRAINT `_ImageToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
