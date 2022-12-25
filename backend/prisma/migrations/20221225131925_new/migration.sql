/*
  Warnings:

  - A unique constraint covering the columns `[platform]` on the table `platforms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accepted` to the `friend_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `friend_list` ADD COLUMN `accepted` BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `platforms_platform_key` ON `platforms`(`platform`);
