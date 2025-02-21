-- AlterTable
ALTER TABLE `media` ADD COLUMN `filename` VARCHAR(191) NULL,
    ADD COLUMN `folder` VARCHAR(191) NULL,
    ADD COLUMN `public_id` VARCHAR(191) NULL,
    ADD COLUMN `secure_url` VARCHAR(191) NULL;
