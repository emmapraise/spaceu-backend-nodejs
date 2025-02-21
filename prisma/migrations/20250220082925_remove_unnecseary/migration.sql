/*
  Warnings:

  - You are about to drop the column `price_per_day` on the `spaces` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_month` on the `spaces` table. All the data in the column will be lost.
  - You are about to drop the column `price_per_week` on the `spaces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `spaces` DROP COLUMN `price_per_day`,
    DROP COLUMN `price_per_month`,
    DROP COLUMN `price_per_week`;
