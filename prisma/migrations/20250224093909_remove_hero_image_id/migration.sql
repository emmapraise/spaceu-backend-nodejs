/*
  Warnings:

  - You are about to drop the column `hero_video_id` on the `spaces` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `spaces` DROP FOREIGN KEY `spaces_hero_video_id_fkey`;

-- AlterTable
ALTER TABLE `spaces` DROP COLUMN `hero_video_id`,
    ADD COLUMN `hero_video_url` VARCHAR(191) NULL;
